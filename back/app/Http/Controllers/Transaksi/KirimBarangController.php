<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\KirimBarang;
use App\Transaksi\KirimBarangDetail;
use App\Transaksi\StokProduk;
use App\Transaksi\StokProdukDetail;
use App\Transaksi\KartuStok;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class KirimBarangController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    function saveKirimBarang(Request $request){
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            if($request['norec_kb']==''){

                $nokirim = $this->generateCodeBySeqTable(new KirimBarang, 'nokirimbarang', 15, 'TB' . date('ym') . '');

                if ($nokirim == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                foreach ($request['detail'] as $item){
                    $SP =  StokProduk::where('produkfk',$item['idproduk'])
                                    ->where('ruanganfk',$request['idruanganasal'])
                                    ->first();

                    $saldo_awal = $SP->jumlah;
                    $hargajual = $SP->hargajual;
                    $jumlahKirim = (float)$item['jumlah'];

                    $SP->jumlah =  (float)$SP->jumlah - (float)$item['jumlah'];
                    $SP->save();

                    $norec_SP = $SP->norec;
                    $saldo_akhir = $SP->jumlah;

                    $SPD =  StokProdukDetail::where('stokprodukfk',$norec_SP)
                                    ->where('ruanganfk','=',$request['idruanganasal'])
                                    ->where('jumlah','>',0)
                                    ->orderBy('created_at')
                                    ->get();

                    $KirimBar = new KirimBarang();
                    $KirimBar->norec = $KirimBar->generateNewId();
                    $KirimBar->kdprofile = 0;
                    $KirimBar->statusenabled = true;
                    $KirimBar->tglkirim = date('Y-m-d H:i:s');
                    $KirimBar->jumlahbarang = count($request['detail']);
                    $KirimBar->ruanganasalfk = $request['idruanganasal'];
                    $KirimBar->ruangantujuanfk = $request['idruangantujuan'];
                    $KirimBar->keperluankirimfk = $request['idkeperluankirim'];
                    $KirimBar->nokirim = $nokirim;
                    if (isset($request['nokirim']) && $request['nokirim']!="" && $request['nokirim']!="undefined"){
                        $KirimBar->nokirim = $request['nokirim'];
                    }
                    $KirimBar->pegawaifk = $request['idpegawai'];
                    $KirimBar->keterangan = $request['keterangan'];

                    $KirimBar->produkfk = $item['idproduk'];
                    $KirimBar->stokawal = $saldo_awal;
                    $KirimBar->jumlah = $item['jumlah'];
                    $KirimBar->pegawaiinputfk = $dataLogin['userData']['id'];
                    // $KirimBar->penerimaanbarangfk = $itemSPD->penerimaanbarangfk;

                    $KirimBar->save();

                    $norec_KB = $KirimBar->norec;

                    $DetailKirim = [];
                    $SPNew =  StokProduk::where('produkfk',$item['idproduk'])
                                    ->where('ruanganfk',$request['idruangantujuan'])
                                    ->first();

                    $terima_saldoawal = 0;
                    if(empty($SPNew)){
                        $SPNew = new StokProduk();
                        $SPNew->norec = $SPNew->generateNewId();
                        $SPNew->kdprofile = 0;
                        $SPNew->statusenabled = true;
                        $SPNew->produkfk =  $item['idproduk'];
                        $SPNew->ruanganfk =  $request['idruangantujuan'];
                        $SPNew->jumlah =  $item['jumlah'];
                        $SPNew->hargajual =  $hargajual;
                        $SPNew->pegawaiinputfk =  $dataLogin['userData']['id'];
                        $SPNew->save();
                    }else{
                        $terima_saldoawal = $SPNew->jumlah;
                        $SPNew->jumlah =  (float)$SPNew->jumlah+ (float)$item['jumlah'];
                        $SPNew->pegawaiinputfk =  $dataLogin['userData']['id'];
                        $SPNew->save();
                    }
                    $terima_saldoakhir = $SPNew->jumlah;

                    $norec_SPNew = $SPNew->norec;

                    //kirim
                    $KS = new KartuStok();
                    $KS->norec = $KS->generateNewId();
                    $KS->kdprofile = 0;
                    $KS->statusenabled = true;
                    $KS->tgllayanan = date('Y-m-d H:i:s');
                    $KS->produkfk =  $item['idproduk'];
                    $KS->ruanganfk =  $request['idruanganasal'];
                    $KS->saldoawal =  $saldo_awal;
                    $KS->saldomasuk =  0;
                    $KS->saldokeluar = $item['jumlah'];
                    $KS->saldoakhir =  $saldo_akhir;
                    $KS->keterangan =  'Kirim barang dari Ruangan '.$request['ruanganasal'].' ke ruangan '.$request['ruangantujuan'].' No Kirim '.$nokirim;
                    $KS->tabeltransaksi =  'kirimbarang_t';
                    $KS->norectransaksi =  $KirimBar->norec;
                    $KS->flagfk =  3;
                    $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                    $KS->save();

                    //terima
                    $KSTer = new KartuStok();
                    $KSTer->norec = $KSTer->generateNewId();
                    $KSTer->kdprofile = 0;
                    $KSTer->statusenabled = true;
                    $KSTer->tgllayanan = date('Y-m-d H:i:s');
                    $KSTer->produkfk =  $item['idproduk'];
                    $KSTer->ruanganfk =  $request['idruangantujuan'];
                    $KSTer->saldoawal =  $terima_saldoawal;
                    $KSTer->saldomasuk =  $item['jumlah'];
                    $KSTer->saldokeluar = 0;
                    $KSTer->saldoakhir =  $terima_saldoakhir;
                    $KSTer->keterangan =  'Terima barang dari Ruangan '.$request['ruanganasal'].' ke ruangan '.$request['ruangantujuan'].' No Kirim '.$nokirim;
                    $KSTer->tabeltransaksi =  'kirimbarang_t';
                    $KSTer->norectransaksi =  $KirimBar->norec;
                    $KSTer->flagfk =  4;
                    $KSTer->pegawaiinputfk =  $dataLogin['userData']['id'];
                    $KSTer->save();
                    foreach ($SPD as $itemSPD){
                        if($itemSPD->jumlah <= $jumlahKirim ){
                            $jumlahKirim =  $jumlahKirim - (float)$itemSPD->jumlah;
                            StokProdukDetail::where('norec', $itemSPD->norec) ->update([ 'jumlah' => 0 ]);
                            $KBD = new KirimBarangDetail();
                            $KBD->norec = $KBD->generateNewId();
                            $KBD->kdprofile = 0;
                            $KBD->statusenabled = true;
                            $KBD->penerimaanbarangfk = $itemSPD->penerimaanbarangfk;
                            $KBD->kirimbarangfk = $norec_KB;
                            $KBD->jumlah = $itemSPD->jumlah;
                            $KBD->stokprodukdetailfk = $itemSPD->norec;
                            $KBD->save();

                            $SPDTujuan = new StokProdukDetail();
                            $SPDTujuan->norec = $SPDTujuan->generateNewId();
                            $SPDTujuan->kdprofile = 0;
                            $SPDTujuan->statusenabled = true;
                            $SPDTujuan->penerimaanbarangfk =  $itemSPD->penerimaanbarangfk;
                            $SPDTujuan->stokprodukfk =  $norec_SPNew;
                            $SPDTujuan->produkfk =  $itemSPD->produkfk;
                            $SPDTujuan->ruanganfk =  $request['idruangantujuan'];
                            $SPDTujuan->jumlah =  $itemSPD->jumlah;
                            $SPDTujuan->hargabeli =  $itemSPD->hargabeli;
                            $SPDTujuan->hargajual =  $itemSPD->hargajual;
                            $SPDTujuan->hargatotal =  $itemSPD->hargatotal;
                            $SPDTujuan->tglkadaluarsa = $itemSPD->tglkadaluarsa;
                            $SPDTujuan->kirimbarangfk = $norec_KB;

                            $SPDTujuan->pegawaiinputfk =  $dataLogin['userData']['id'];
                            $SPDTujuan->save();
                        }else{
                            $jumlahbaru =  (float)$itemSPD->jumlah - $jumlahKirim;
                            StokProdukDetail::where('norec', $itemSPD->norec) ->update([ 'jumlah' => $jumlahbaru ]);
                            $KBD = new KirimBarangDetail();
                            $KBD->norec = $KBD->generateNewId();
                            $KBD->kdprofile = 0;
                            $KBD->statusenabled = true;
                            $KBD->penerimaanbarangfk = $itemSPD->penerimaanbarangfk;
                            $KBD->kirimbarangfk = $norec_KB;
                            $KBD->jumlah = $jumlahKirim;
                            $KBD->stokprodukdetailfk = $itemSPD->norec;
                            $KBD->save();

                            $SPDTujuan2 = new StokProdukDetail();
                            $SPDTujuan2->norec = $SPDTujuan2->generateNewId();
                            $SPDTujuan2->kdprofile = 0;
                            $SPDTujuan2->statusenabled = true;
                            $SPDTujuan2->penerimaanbarangfk =  $itemSPD->penerimaanbarangfk;
                            $SPDTujuan2->stokprodukfk =  $norec_SPNew;
                            $SPDTujuan2->produkfk =  $itemSPD->produkfk;
                            $SPDTujuan2->ruanganfk =  $request['idruangantujuan'];
                            $SPDTujuan2->jumlah =  $jumlahKirim;
                            $SPDTujuan2->hargabeli =  $itemSPD->hargabeli;
                            $SPDTujuan2->hargajual =  $itemSPD->hargajual;
                            $SPDTujuan2->hargatotal =  $itemSPD->hargatotal;
                            $SPDTujuan2->tglkadaluarsa = $itemSPD->tglkadaluarsa;
                            $SPDTujuan2->kirimbarangfk = $norec_KB;

                            $SPDTujuan2->pegawaiinputfk =  $dataLogin['userData']['id'];
                            $SPDTujuan2->save();

                            $jumlahKirim = 0 ;
                            break;
                        }
                    }


                }

            }


            $transStatus = 'true';
        } catch (\Exception $e) {
            $transStatus = 'false';
            $error = $e->getMessage();
        }

        if ($transStatus == 'true') {
            $transMessage = 'Simpan Data Berhasil';
            DB::commit();
            $result = array(
                'status' => 201,
                'message'=>$transMessage,
            );
        } else {
            $transMessage = 'Simpan Data Gagal';
            DB::rollBack();
            $result = array(
                'status' => 400,
                'error' => $error,
                'message'=>$transMessage,
            );
        }
       return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

     public function getDaftarKirimBarang(Request $request)
     {
        $head = \DB::table('kirimbarang_t as kb')
            ->join('ruangan_m as ru','ru.id','=','kb.ruanganasalfk')
            ->join('ruangan_m as ru2','ru2.id','=','kb.ruangantujuanfk')
            ->join('keperluankirim_m as kk','kk.id','=','kb.keperluankirimfk')
            ->join('produk_m as pr','pr.id','=','kb.produkfk')
            ->join('pegawai_m as pg','pg.id','=','kb.pegawaifk')
            ->select('kb.tglkirim','ru.id as idruanganasal','ru.ruangan as ruanganasal','ru2.id as idruangantujuan','ru2.ruangan as ruangantujuan',
                'kk.keperluankirim','kb.nokirim', 'pg.namalengkap','kb.keterangan','kb.jumlahbarang'
            )
            ->where('kb.statusenabled', true);

            if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
                $head = $head->where('kb.tglkirim', '>=', $request['tglAwal']);
            };
            if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
                $head = $head->where('kb.tglkirim', '<=', $request['tglAkhir']);
            };
            if(isset($request['idruanganasal']) && $request['idruanganasal']!="" && $request['idruanganasal']!="undefined") {
                $head = $head->where('kb.ruanganasalfk', $request['idruanganasal']);
            };
            if(isset($request['idruangantujuan']) && $request['idruangantujuan']!="" && $request['idruangantujuan']!="undefined") {
                $head = $head->where('kb.ruangantujuanfk', $request['idruangantujuan']);
            };
            if(isset($request['idproduk']) && $request['idproduk']!="" && $request['idproduk']!="undefined") {
                $head = $head->where('kb.produkfk', $request['idproduk']);
            };
            if(isset($request['nokirim']) && $request['nokirim']!="" && $request['nokirim']!="undefined") {
                $head = $head->where('kb.nokirim','like', '%'. $request['nokirim'].'%');
            };
            $head = $head->groupBy('kb.tglkirim','ru.id','ru.ruangan','ru2.id','ru2.ruangan','kk.keperluankirim','kb.nokirim','pg.namalengkap','kb.keterangan','kb.jumlahbarang');
            $head = $head->orderBy('kb.tglkirim','asc');
            $head = $head->get();

        return $this->respond($head);

     }


    public function getProdukKirimBarang(Request $request){
        $data = \DB::table('stokproduk_t as sp')
            ->join('produk_m as pr', 'sp.produkfk','=','pr.id')
            ->leftjoin('satuan_m as sat', 'sat.id','=','pr.satuanfk')
            ->select('pr.id', 'pr.produk', 'sp.jumlah', 'sat.satuan')
            ->whereIn('pr.jenisprodukfk',[2,3])
            ->where('sp.ruanganfk',$request['idruanganasal']);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('pr.produk', 'like', '%'. $request['nama'] .'%');
        };

        $data =$data->take(10);
        $data =$data->orderBy('pr.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    public function getKirimBarangByNoKirim(Request $request){
        $data = \DB::table('kirimbarang_t as kb')
            ->join('produk_m as pr','pr.id','=','kb.produkfk')
            ->select('pr.id as idproduk', 'pr.produk', 'kb.jumlah','kb.norec as norec_kb')
            ->where('kb.statusenabled', true)
            ->where('kb.nokirim', $request['nokirim'])
            ->get();

        return $this->respond($data);
            
    }

    public function getComboKirimBarang(Request $request){

        $keperluan = \DB::table('keperluankirim_m as dat')
            ->select('dat.id', 'dat.keperluankirim')
            ->where('dat.statusenabled', true)
            ->get();

        $pegawai = \DB::table('pegawai_m as dat')
            ->select('dat.id', 'dat.namalengkap')
            ->where('dat.statusenabled', true)
            ->get();

        $ruanganasal = \DB::table('ruangan_m as dat')
            ->select('dat.id', 'dat.ruangan')
            ->where('dat.statusenabled', true)
            ->whereIn('dat.instalasifk',[4,5,6])
            ->get();

        $ruangantujuan = \DB::table('ruangan_m as dat')
            ->select('dat.id', 'dat.ruangan')
            ->where('dat.statusenabled', true)
            ->get();

        $result = array(
            'keperluan' => $keperluan,
            'pegawai' => $pegawai,
            'ruanganasal' => $ruanganasal,
            'ruangantujuan' => $ruangantujuan
        );

        return $this->respond($result);
            
    }

    public function batalKirimBarang(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];
        $GLOBALS['keterangan'] = '';
        $GLOBALS['KB'] = '';
        $GLOBALS['test'] = '';
        if(isset($request['keterangandelete']) && $request['keterangandelete']!="" && $request['keterangandelete']!="undefined") {
            $GLOBALS['keterangan'] = $request['keterangandelete'];
        };

        DB::beginTransaction();
        $error='';

        try {

            foreach($request['norec_item_kb'] as $item){

                KirimBarang::query()
                ->where('norec',$item)
                ->each(function ($oldRecord){
                    $newRecord = $oldRecord->replicate();
                    $newRecord->pegawaideletefk = $GLOBALS['userId'];
                    $newRecord->keterangandelete = $GLOBALS['keterangan'];
                    $newRecord->setTable('kirimbarangdelete_t');
                    $newRecord->save();
                    $GLOBALS['KB'] = $newRecord;
                    $oldRecord->delete();
                });

                //Ruangan Tujuan

                $SP =  StokProduk::where('produkfk',$GLOBALS['KB']->produkfk)
                                    ->where('ruanganfk',$GLOBALS['KB']->ruangantujuanfk)
                                    ->first();

                $saldo_awal = $SP->jumlah;
                $SP->jumlah =  (float)$SP->jumlah - (float)$GLOBALS['KB']->jumlah;
                $SP->save();

                $norec_SP = $SP->norec;
                $saldo_akhir = $SP->jumlah;

                $KS = new KartuStok();
                $KS->norec = $KS->generateNewId();
                $KS->kdprofile = 0;
                $KS->statusenabled = true;
                $KS->tgllayanan = date('Y-m-d H:i:s');
                $KS->produkfk =  $GLOBALS['KB']->produkfk;
                $KS->ruanganfk =  $GLOBALS['KB']->ruangantujuanfk;
                $KS->saldoawal =  $saldo_awal;
                $KS->saldomasuk =  0;
                $KS->saldokeluar = $GLOBALS['KB']->jumlah;
                $KS->saldoakhir =  $saldo_akhir;
                $KS->keterangan =  'Delete Kirim Barang Di Ruangan Tujuan No Kirim '.$GLOBALS['KB']->nokirim;
                $KS->tabeltransaksi =  'kirimbarangdelete_t';
                $KS->norectransaksi =  $GLOBALS['KB']->norec;
                $KS->flagfk =  5;
                $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                $KS->save();

                //Ruangan Asal

                $SPAsal =  StokProduk::where('produkfk',$GLOBALS['KB']->produkfk)
                                    ->where('ruanganfk',$GLOBALS['KB']->ruanganasalfk)
                                    ->first();

                $saldo_awalAsal = $SPAsal->jumlah;
                $SPAsal->jumlah =  (float)$SPAsal->jumlah + (float)$GLOBALS['KB']->jumlah;
                $SPAsal->save();

                $norec_SPAsal = $SPAsal->norec;
                $saldo_akhirAsal = $SPAsal->jumlah;

                $KSAsal = new KartuStok();
                $KSAsal->norec = $KSAsal->generateNewId();
                $KSAsal->kdprofile = 0;
                $KSAsal->statusenabled = true;
                $KSAsal->tgllayanan = date('Y-m-d H:i:s');
                $KSAsal->produkfk =  $GLOBALS['KB']->produkfk;
                $KSAsal->ruanganfk =  $GLOBALS['KB']->ruanganasalfk;
                $KSAsal->saldoawal =  $saldo_awalAsal;
                $KSAsal->saldomasuk =  $GLOBALS['KB']->jumlah;
                $KSAsal->saldokeluar = 0;
                $KSAsal->saldoakhir =  $saldo_akhirAsal;
                $KSAsal->keterangan =  'Delete Kirim Barang Di Ruangan Asal No Kirim '.$GLOBALS['KB']->nokirim;
                $KSAsal->tabeltransaksi =  'kirimbarangdelete_t';
                $KSAsal->norectransaksi =  $GLOBALS['KB']->norec;
                $KSAsal->flagfk =  5;
                $KSAsal->pegawaiinputfk =  $dataLogin['userData']['id'];
                $KSAsal->save();


                //Kirim Barang Detail

                $KBD =  KirimBarangDetail::where('kirimbarangfk',$item)
                                ->get();

                foreach($KBD as $itemKBD){
                    $SPDTujuan =  StokProdukDetail::where('produkfk',$GLOBALS['KB']->produkfk)
                                ->where('ruanganfk',$GLOBALS['KB']->ruangantujuanfk)
                                ->where('kirimbarangfk',$item)
                                ->where('penerimaanbarangfk',$itemKBD->penerimaanbarangfk)
                                ->get();

                    foreach($SPDTujuan as $itemTujuan){
                        $SPDTujuanDetail =  StokProdukDetail::where('norec',$itemTujuan->norec)->first();
                        $SPDTujuanDetail->jumlah = $SPDTujuanDetail->jumlah - $itemKBD->jumlah;
                        $SPDTujuanDetail->save();
                    }

                    $SPDAsal =  StokProdukDetail::where('produkfk',$GLOBALS['KB']->produkfk)
                                ->where('ruanganfk',$GLOBALS['KB']->ruanganasalfk)
                                ->where('penerimaanbarangfk',$itemKBD->penerimaanbarangfk)
                                ->get();

                    foreach($SPDAsal as $itemAsal){
                        $SPDAsalDetail =  StokProdukDetail::where('norec',$itemAsal->norec)->first();

                        $SPDAsalDetail->jumlah = $SPDAsalDetail->jumlah + $itemKBD->jumlah;
                        $SPDAsalDetail->save();
                    }     
                    


                }

                

            }

            $transStatus = 'true';
        } catch (\Exception $e) {
            $transStatus = 'false';
            $error = $e->getMessage();
        }

        if ($transStatus == 'true') {
            $transMessage = 'Delete Data Berhasil';
            DB::commit();
            $result = array(
                'status' => 201,
                'message'=>$transMessage,
            );
        } else {
            $transMessage = 'Delete Data Gagal';
            DB::rollBack();
            $result = array(
                'status' => 400,
                'error' => $error,
                'message'=>$transMessage,
            );
        }
       return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    
}
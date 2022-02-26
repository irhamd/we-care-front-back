<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\PenerimaanBarang;
use App\Transaksi\PenerimaanBarangDetail;
use App\Transaksi\StokProduk;
use App\Transaksi\StokProdukDetail;
use App\Transaksi\KartuStok;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class PenerimaanBarangController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    function savePenerimaanBarang(Request $request){
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            if($request['norec_pb']==''){

                $nopenerimaan = $this->generateCodeBySeqTable(new PenerimaanBarang, 'nopenerimaanbarang', 15, 'PB' . date('ym') . '');

                if ($nopenerimaan == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                $PenBarang = new PenerimaanBarang();
                $PenBarang->norec = $PenBarang->generateNewId();
                $PenBarang->kdprofile = 0;
                $PenBarang->statusenabled = true;
                $PenBarang->tglpenerimaan = date('Y-m-d H:i:s');
                $PenBarang->jumlahproduk = count($request['detail']);
                $PenBarang->ruanganfk = $request['idruangan'];
                $PenBarang->nopenerimaan = $nopenerimaan;
                if (isset($request['nopenerimaan']) && $request['nopenerimaan']!="" && $request['nopenerimaan']!="undefined"){
                    $PenBarang->nopenerimaan = $request['nopenerimaan'];
                }
                $PenBarang->penanggungjawabfk = $request['idpenenggungjawab'];
                $PenBarang->keterangan = $request['keterangan'];
                $PenBarang->sumberdanafk = $request['idsumberdana'];
                $PenBarang->tahunanggaran = $request['tahunanggaran'];
                $PenBarang->pegawaiinputfk = $dataLogin['userData']['id'];
                $PenBarang->suplierfk = $request['idsuplier'];

                $PenBarang->save();
            }else{
                $PenBarang =  PenerimaanBarang::where('norec',$request['norec_pb'])->first();
            }

            $norec_PB = $PenBarang->norec;
            $nomor_terima = $PenBarang->nopenerimaan;


            foreach ($request['detail'] as $item){
                if($item['norec_pbd']==''){
                    $PBD = new PenerimaanBarangDetail();
                    $PBD->norec = $PBD->generateNewId();
                    $PBD->kdprofile = 0;
                    $PBD->statusenabled = true;
                    $PBD->penerimaanbarangfk =  $norec_PB;
                    $PBD->produkfk =  $item['idproduk'];
                    $PBD->ruanganfk =  $request['idruangan'];
                    $PBD->jumlah =  $item['jumlah'];
                    $PBD->hargabeli =  $item['hargabeli'];
                    $PBD->hargajual =  $item['hargajual'];
                    $PBD->hargatotal =  $item['hargatotal'];
                    $PBD->tglkadaluarsa = $item['tglkadaluarsa'];

                    $PBD->pegawaiinputfk =  $dataLogin['userData']['id'];
                    $PBD->save();

                    $norec_PBD = $PBD->norec;

                    $SP =  StokProduk::where('produkfk',$item['idproduk'])
                                    ->where('ruanganfk',$request['idruangan'])
                                    ->first();

                    $saldo_awal = 0;
                    if(empty($SP)){
                        $SP = new StokProduk();
                        $SP->norec = $SP->generateNewId();
                        $SP->kdprofile = 0;
                        $SP->statusenabled = true;
                        $SP->produkfk =  $item['idproduk'];
                        $SP->ruanganfk =  $request['idruangan'];
                        $SP->jumlah =  $item['jumlah'];
                        $SP->hargajual =  $item['hargajual'];
                        $SP->pegawaiinputfk =  $dataLogin['userData']['id'];
                        $SP->save();
                    }else{
                        $saldo_awal = $SP->jumlah;
                        $SP->jumlah =  (float)$SP->jumlah+ (float)$item['jumlah'];
                        $SP->hargajual =  $item['hargajual'];
                        $SP->pegawaiinputfk =  $dataLogin['userData']['id'];
                        $SP->save();
                    }

                    $norec_SP = $SP->norec;
                    $saldo_akhir = $SP->jumlah;

                    $SPD = new StokProdukDetail();
                    $SPD->norec = $SPD->generateNewId();
                    $SPD->kdprofile = 0;
                    $SPD->statusenabled = true;
                    $SPD->penerimaanbarangfk =  $norec_PB;
                    $SPD->stokprodukfk =  $norec_SP;
                    $SPD->produkfk =  $item['idproduk'];
                    $SPD->ruanganfk =  $request['idruangan'];
                    $SPD->jumlah =  $item['jumlah'];
                    $SPD->hargabeli =  $item['hargabeli'];
                    $SPD->hargajual =  $item['hargajual'];
                    $SPD->hargatotal =  $item['hargatotal'];
                    $SPD->tglkadaluarsa = $item['tglkadaluarsa'];

                    $SPD->pegawaiinputfk =  $dataLogin['userData']['id'];
                    $SPD->save();


                    $KS = new KartuStok();
                    $KS->norec = $KS->generateNewId();
                    $KS->kdprofile = 0;
                    $KS->statusenabled = true;
                    $KS->tgllayanan = date('Y-m-d H:i:s');
                    $KS->produkfk =  $item['idproduk'];
                    $KS->ruanganfk =  $request['idruangan'];
                    $KS->saldoawal =  $saldo_awal;
                    $KS->saldomasuk =  $item['jumlah'];
                    $KS->saldokeluar = 0;
                    $KS->saldoakhir =  $saldo_akhir;
                    $KS->keterangan =  'Penerimaan barang No Penerimaan '.$nomor_terima.' '.$request['suplier'];
                    $KS->tabeltransaksi =  'penerimaanbarangdetail_t';
                    $KS->norectransaksi =  $norec_PBD;
                    $KS->flagfk =  1;
                    $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                    $KS->save();

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

     public function getDaftarHeadPenerimaan(Request $request)
     {
        $head = \DB::table('penerimaanbarang_t as pb')
            ->join('ruangan_m as ru','ru.id','=','pb.ruanganfk')
            ->join('sumberdana_m as sd','sd.id','=','pb.sumberdanafk')
            ->join('pegawai_m as pg','pg.id','=','pb.penanggungjawabfk')
            ->join('suplier_m as sup','sup.id','=','pb.suplierfk')
            ->select('pb.norec as norec_pb','pb.tglpenerimaan','ru.id as idruangan','ru.ruangan','pb.nopenerimaan','pg.id as idpenanggungjawab','pg.namalengkap as penanggungjawab','sd.id as idsumberdana','sd.sumberdana','pb.keterangan','pb.tahunanggaran','sup.id as idsuplier','sup.suplier','pb.jumlahproduk'
            )
            ->where('pb.statusenabled', true);

            if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
                $head = $head->where('pb.tglpenerimaan', '>=', $request['tglAwal']);
            };
            if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
                $head = $head->where('pb.tglpenerimaan', '<=', $request['tglAkhir']);
            };
            if(isset($request['idsuplier']) && $request['idsuplier']!="" && $request['idsuplier']!="undefined") {
                $head = $head->where('pb.suplierfk', $request['idsuplier']);
            };
            if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
                $head = $head->where('pb.ruanganfk', $request['idruangan']);
            };
            if(isset($request['nopenerimaan']) && $request['nopenerimaan']!="" && $request['nopenerimaan']!="undefined") {
                $head = $head->where('pb.nopenerimaan','like', '%'. $request['nopenerimaan'].'%');
            };

            $head = $head->orderBy('pb.tglpenerimaan','asc');
            $head = $head->get();

        return $this->respond($head);

     }


    public function getProdukPenerimaanBarang(Request $request){
        $data = \DB::table('produk_m as dat')
            ->select('dat.id', 'dat.produk')
            ->where('dat.statusenabled', true)
            ->whereIn('dat.jenisprodukfk',[2,3]);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['nama'] .'%');
        };

        $data =$data->take(10);
        $data =$data->orderBy('dat.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    public function getDetailPenerimaanByNorec(Request $request){
        $data = \DB::table('penerimaanbarangdetail_t as pbd')
            ->join('produk_m as pr','pr.id','=','pbd.produkfk')
            ->select('pr.id as idproduk', 'pr.produk', 'pbd.jumlah','pbd.hargabeli','pbd.hargajual','pbd.hargatotal','pbd.tglkadaluarsa','pbd.norec as norec_pbd')
            ->where('pbd.statusenabled', true)
            ->where('pbd.penerimaanbarangfk', $request['norec_pb'])
            ->get();

        return $this->respond($data);
            
    }

    public function getComboPenerimaanBarang(Request $request){
        $suplier = \DB::table('suplier_m as dat')
            ->select('dat.id', 'dat.suplier')
            ->where('dat.statusenabled', true)
            ->get();

        $sumberdana = \DB::table('sumberdana_m as dat')
            ->select('dat.id', 'dat.sumberdana')
            ->where('dat.statusenabled', true)
            ->get();

        $pegawai = \DB::table('pegawai_m as dat')
            ->select('dat.id', 'dat.namalengkap')
            ->where('dat.statusenabled', true)
            ->get();

        $ruangan = \DB::table('ruangan_m as dat')
            ->select('dat.id', 'dat.ruangan')
            ->where('dat.statusenabled', true)
            ->whereIn('dat.instalasifk',[4,5,6])
            ->get();

        $result = array(
            'suplier' => $suplier,
            'sumberdana' => $sumberdana,
            'pegawai' => $pegawai,
            'ruangan' => $ruangan
        );

        return $this->respond($result);
            
    }

    public function deletePenerimaanBarangDetail(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];
        $GLOBALS['keterangan'] = '';
        $GLOBALS['PBD'] = '';
        if(isset($request['keterangandelete']) && $request['keterangandelete']!="" && $request['keterangandelete']!="undefined") {
            $GLOBALS['keterangan'] = $request['keterangandelete'];
        };

        DB::beginTransaction();
        $error='';

        try {

            foreach($request['norec_items_pbd'] as $item){

                PenerimaanBarangDetail::query()
                ->where('norec',$item)
                ->each(function ($oldRecord){
                    $newRecord = $oldRecord->replicate();
                    $newRecord->pegawaideletefk = $GLOBALS['userId'];
                    $newRecord->keterangandelete = $GLOBALS['keterangan'];
                    $newRecord->setTable('penerimaanbarangdetaildelete_t');
                    $newRecord->save();
                    $GLOBALS['PBD'] = $newRecord;
                    $oldRecord->delete();
                });

                $SP =  StokProduk::where('produkfk',$GLOBALS['PBD']->produkfk)
                                    ->where('ruanganfk',$GLOBALS['PBD']->ruanganfk)
                                    ->first();

                $saldo_awal = $SP->jumlah;
                $SP->jumlah =  (float)$SP->jumlah - (float)$GLOBALS['PBD']->jumlah;
                $SP->save();

                $norec_SP = $SP->norec;
                $saldo_akhir = $SP->jumlah;

                $SPD =  StokProdukDetail::where('produkfk',$GLOBALS['PBD']->produkfk)
                                ->where('ruanganfk',$GLOBALS['PBD']->ruanganfk)
                                ->where('penerimaanbarangfk',$GLOBALS['PBD']->penerimaanbarangfk)
                                ->delete();

                $PenBarang = \DB::table('penerimaanbarang_t as pb')
                            ->join('suplier_m as sup','sup.id','=','pb.suplierfk')
                            ->select('pb.nopenerimaan', 'sup.suplier')
                            ->where('pb.norec', $GLOBALS['PBD']->penerimaanbarangfk)
                            ->first();


                $KS = new KartuStok();
                $KS->norec = $KS->generateNewId();
                $KS->kdprofile = 0;
                $KS->statusenabled = true;
                $KS->tgllayanan = date('Y-m-d H:i:s');
                $KS->produkfk =  $GLOBALS['PBD']->produkfk;
                $KS->ruanganfk =  $GLOBALS['PBD']->ruanganfk;
                $KS->saldoawal =  $saldo_awal;
                $KS->saldomasuk =  0;
                $KS->saldokeluar = $GLOBALS['PBD']->jumlah;
                $KS->saldoakhir =  $saldo_akhir;
                $KS->keterangan =  'Delete Penerimaan barang No Penerimaan '.$PenBarang->nopenerimaan.' '.$PenBarang->suplier;
                $KS->tabeltransaksi =  'penerimaanbarangdetaildelete_t';
                $KS->norectransaksi =  $GLOBALS['PBD']->norec;
                $KS->flagfk =  2;
                $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                $KS->save();

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

    public function getDaftarKartuStok(Request $request){
        $data = \DB::table('kartustok_t as ks')
            ->join('ruangan_m as ru','ru.id','=','ks.ruanganfk')
            ->join('produk_m as pr','pr.id','=','ks.produkfk')
            ->join('flag_m as fl','fl.id','=','ks.flagfk')
            ->select('ks.tgllayanan','ru.id as idruangan','ru.ruangan','pr.id as idproduk','pr.produk','ks.saldoawal','ks.saldomasuk','ks.saldokeluar','ks.saldoakhir','ks.keterangan','fl.flag','fl.id as idflag')
            ->where('ks.statusenabled', true);

        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('ks.tgllayanan', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('ks.tgllayanan', '<=', $request['tglAkhir']);
        };
        if(isset($request['idproduk']) && $request['idproduk']!="" && $request['idproduk']!="undefined") {
            $data = $data->where('pr.id', $request['idproduk']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', $request['idruangan']);
        };

        $data =$data->orderBy('ks.tgllayanan');
        $data =$data->get();

        return $this->respond($data);
            
    }

    
}
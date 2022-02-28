<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\PelayananPasien;
use App\Transaksi\PelayananPasienDelete;
use App\Transaksi\StrukResep;
use App\Transaksi\ResepPasien;
use App\Transaksi\StokProduk;
use App\Transaksi\StokProdukDetail;
use App\Transaksi\KartuStok;
use App\Transaksi\StrukResepDetail;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class ApotikController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getPegawaiObat(Request $request){
        $data = \DB::table('pegawai_m as dat')
                ->select('dat.id', 'dat.namalengkap')
                ->where('dat.statusenabled', true);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.namalengkap', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getRuanganObat(Request $request){
        $data = \DB::table('ruangan_m as dat')
                ->select('dat.id as iddepo', 'dat.ruangan as depo')
                ->where('dat.instalasifk', 4)
                ->where('dat.statusenabled', true);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.ruangan', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getProdukPelayananObat(Request $request){
        $data = \DB::table('stokproduk_t as sp')
            ->join('produk_m as pr', 'sp.produkfk','=','pr.id')
            ->leftjoin('satuan_m as sat', 'sat.id','=','pr.satuanfk')
            ->select('pr.id', 'pr.produk', 'sp.jumlah', 'sat.satuan','sp.hargajual as hargasatuan')
            ->whereIn('pr.jenisprodukfk',[2,3])
            ->where('sp.ruanganfk',$request['idruangan']);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('pr.produk', 'like', '%'. $request['nama'] .'%');
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('sp.ruanganfk', $request['idruangan']);
        };

        // idruangan=19

        $data =$data->take(10);
        $data =$data->orderBy('pr.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    function saveObatPasien(Request $request){
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {
            $noresep = $request['noresep'];

            if($request['noresep']==''){

                $noresep = $this->generateCodeBySeqTable(new ResepPasien, 'noresep', 15, 'RP' . date('ym') . '');

                if ($noresep == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }
            }

            $ResepPas = new StrukResep();
            $ResepPas->norec = $ResepPas->generateNewId();
            $ResepPas->kdprofile = 0;
            $ResepPas->statusenabled = true;
            $ResepPas->noresep = $noresep;
            $ResepPas->tglstruk = date('Y-m-d H:i:s');
            $ResepPas->ruanganfk = $request['iddepo'];
            $ResepPas->antrianpasiendiperiksafk =  $request['norec_apd'];
            if (isset($request['idpenulisresep']) && $request['idpenulisresep']!="" && $request['idpenulisresep']!="undefined"){
                $ResepPas->penulisresepfk = $request['idpenulisresep'];
            }
            if (isset($request['idapoteker']) && $request['idapoteker']!="" && $request['idapoteker']!="undefined"){
                $ResepPas->apotekerfk = $request['idapoteker'];
            }
            if (isset($request['statusprioritas']) && $request['statusprioritas']!="" && $request['statusprioritas']!="undefined"){
                $ResepPas->statusprioritas = $request['statusprioritas'];
            }
            if (isset($request['norec_rp']) && $request['norec_rp']!="" && $request['norec_rp']!="undefined"){
                $ResepPas->reseppasienfk = $request['norec_rp'];
            }
            $ResepPas->pegawaiinputfk =  $dataLogin['userData']['id'];
            $ResepPas->save();

            $norec_RP = $ResepPas->norec;


            foreach ($request['detail'] as $item){
                $jasa=0;
                $RPD = new PelayananPasien();
                $RPD->norec = $RPD->generateNewId();
                $RPD->kdprofile = 0;
                $RPD->statusenabled = true;
                $RPD->tglpelayanan =  date('Y-m-d H:i:s');
                $RPD->strukresepfk =  $norec_RP;
                $RPD->antrianpasiendiperiksafk =  $request['norec_apd'];
                // $RPD->jeniskemasanfk =  $item['idjeniskemasan'];
                if (isset($item['racikanke']) && $item['racikanke']!="" && $item['racikanke']!="undefined"){
                    $RPD->racikanke = $item['racikanke'];
                }
                if (isset($item['dosisracikan']) && $item['dosisracikan']!="" && $item['dosisracikan']!="undefined"){
                    $RPD->dosisracikan = $item['dosisracikan'];
                }
                if (isset($request['idapoteker']) && $request['idapoteker']!="" && $request['idapoteker']!="undefined"){
                    $RPD->pegawaipelaksanafk = $request['idapoteker'];
                }
                $RPD->produkfk =  $item['idproduk'];
                $RPD->jumlah =  $item['jumlah'];
                $RPD->signa =  $item['signa'];
                $RPD->aturanpakaifk =  $item['idaturanpakai'];
                $RPD->hargasatuan =  $item['hargasatuan'];
                $RPD->hargatotal =  $item['hargatotal'];
                $RPD->jasa =  $jasa;
                $RPD->hargatotaljasa =  $jasa+$item['hargatotal'];

                $RPD->pegawaiinputfk =  $dataLogin['userData']['id'];
                $RPD->save();

                $SP =  StokProduk::where('produkfk',$item['idproduk'])
                            ->where('ruanganfk',$request['iddepo'])
                            ->first();

                $saldo_awal = $SP->jumlah;
                $jumlahObat = (float)$item['jumlah'];

                $SP->jumlah =  (float)$SP->jumlah - (float)$jumlahObat;
                $SP->save();

                $norec_SP = $SP->norec;
                $saldo_akhir = $SP->jumlah;

                $KS = new KartuStok();
                $KS->norec = $KS->generateNewId();
                $KS->kdprofile = 0;
                $KS->statusenabled = true;
                $KS->tgllayanan = date('Y-m-d H:i:s');
                $KS->produkfk =  $item['idproduk'];
                $KS->ruanganfk =  $request['iddepo'];
                $KS->saldoawal =  $saldo_awal;
                $KS->saldomasuk =  0;
                $KS->saldokeluar = $item['jumlah'];
                $KS->saldoakhir =  $saldo_akhir;
                $KS->keterangan =  'Pelayanan Obat Pasien di Ruangan '.$request['depo'].' No Resep '.$noresep;
                $KS->tabeltransaksi =  'pelayananpasien_t';
                $KS->norectransaksi =  $RPD->norec;
                $KS->flagfk =  6;
                $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                $KS->save();

                $SPD =  StokProdukDetail::where('stokprodukfk',$norec_SP)
                            ->where('ruanganfk','=',$request['iddepo'])
                            ->where('jumlah','>',0)
                            ->orderBy('created_at')
                            ->get();

                foreach($SPD as $itemSPD){
                    if($itemSPD->jumlah <= $jumlahObat ){
                        $jumlahObat = $itemSPD->jumlah - $jumlahObat;
                        StokProdukDetail::where('norec', $itemSPD->norec) ->update([ 'jumlah' => 0 ]);
                        $SRD = new StrukResepDetail();
                        $SRD->norec = $SRD->generateNewId();
                        $SRD->statusenabled = true;
                        $SRD->strukresepfk = $norec_RP;
                        $SRD->stokprodukdetailfk = $itemSPD->norec;
                        $SRD->jumlah = $jumlahObat;
                        $SRD->save();

                    }else{
                        if($jumlahObat == 0){
                            break;
                        }
                        $jumlahbaru = $itemSPD->jumlah - $jumlahObat;
                        StokProdukDetail::where('norec', $itemSPD->norec) ->update([ 'jumlah' => $jumlahbaru ]);
                        $SRD = new StrukResepDetail();
                        $SRD->norec = $SRD->generateNewId();
                        $SRD->statusenabled = true;
                        $SRD->strukresepfk = $norec_RP;
                        $SRD->stokprodukdetailfk = $itemSPD->norec;
                        $SRD->jumlah = $jumlahObat;
                        $SRD->save();

                        $jumlahObat = 0;
                        break;
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

	
    public function getDaftarPasienPelayananObat(Request $request)
    {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('strukresep_t as sp', 'sp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','sp.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','sp.penulisresepfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.noregistrasi','sp.noresep','pg.namalengkap as penulisresep','pd.norec as norec_pd','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','pd.noregistrasi','ru2.id as iddepo','ru2.ruangan as depo')
            ->where('pd.statusenabled',1);


        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };

        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };

        if(isset($request['iddepo']) && $request['iddepo']!="" && $request['iddepo']!="undefined") {
            $data = $data->where('ru2.id', '=', $request['iddepo']);
        };

        if(isset($request['nocm']) && $request['nocm']!="" && $request['nocm']!="undefined") {
            $data = $data->where('ps.nocm', 'like', '%'.$request['nocm'].'%');
        };

        if(isset($request['namapasien']) && $request['namapasien']!="" && $request['namapasien']!="undefined") {
            $data = $data->where('ps.namapasien', 'like', '%'.$request['namapasien'].'%');
        };

        if(isset($request['noregistrasi']) && $request['noregistrasi']!="" && $request['noregistrasi']!="undefined") {
            $data = $data->where('pd.noregistrasi', 'like', '%'.$request['noregistrasi'].'%');
        };

        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();

        return $this->respond($data);
    }

    public function getDetailObatByNoregistrasi(Request $request)
     {
        
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.tglregistrasi','pd.tglpulang','pd.noregistrasi','pd.norec as norec_pd','ru.ruangan as ruanganakhir','pd.noregistrasi')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->first();

        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('strukresep_t as sp', 'sp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('pelayananpasien_t as pp', 'pp.strukresepfk','=','sp.norec')
            ->join('produk_m as pr', 'pr.id','=','pp.produkfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','sp.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','sp.penulisresepfk')
            ->select('pp.norec as norec_pp','sp.noresep','pg.namalengkap as penulisresep','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','ru2.id as iddepo','ru2.ruangan as depo','pr.id as idproduk','pr.produk','pp.tglpelayanan','pp.jumlah','pp.hargasatuan','pp.jasa','pp.hargatotaljasa')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->get();

        $head->detail= $data;

        return $this->respond($head);


     }

     public function getDaftarPasienResep(Request $request)
    {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('reseppasien_t as rp', 'rp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','rp.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','rp.pegawaifk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.noregistrasi','rp.noresep','pg.namalengkap as penulisresep','pd.norec as norec_pd','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','pd.noregistrasi','ru2.id as iddepo','ru2.ruangan as depo','rp.norec as norec_rp')
            ->where('pd.statusenabled',1);


        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };

        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };

        if(isset($request['iddepo']) && $request['iddepo']!="" && $request['iddepo']!="undefined") {
            $data = $data->where('ru2.id', '=', $request['iddepo']);
        };

        if(isset($request['nocm']) && $request['nocm']!="" && $request['nocm']!="undefined") {
            $data = $data->where('ps.nocm', 'like', '%'.$request['nocm'].'%');
        };

        if(isset($request['namapasien']) && $request['namapasien']!="" && $request['namapasien']!="undefined") {
            $data = $data->where('ps.namapasien', 'like', '%'.$request['namapasien'].'%');
        };

        if(isset($request['noregistrasi']) && $request['noregistrasi']!="" && $request['noregistrasi']!="undefined") {
            $data = $data->where('pd.noregistrasi', 'like', '%'.$request['noregistrasi'].'%');
        };

        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();

        return $this->respond($data);
    }


    public function getResepPasienByNorecRes(Request $request)
     {
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','rp.pegawaifk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','rp.ruanganfk')
            ->select('pg.namalengkap as penulisresep','pg.id as idpenulisresep', 'apd.norec as norec_apd', 'rp.norec as norec_rp', 'rp.alergiobat','rp.statusprioritas', 'rp.noresep','rp.tglresep','ru.id as iddepo','ru.ruangan as depo'
            )
            ->where('rp.norec', '=',$request['norec_rp'])
            ->first();

        $detail = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('reseppasiendetail_t as rpd','rpd.reseppasienfk','=','rp.norec')
            ->join('produk_m as pr','pr.id','=','rpd.produkfk')
            ->leftjoin('aturanpakai_m as ap','ap.id','=','rpd.aturanpakaifk')
            ->leftjoin('jeniskemasan_m as jk','jk.id','=','rpd.jeniskemasanfk')
            ->select('rpd.norec as norec_rpd', 'rpd.jeniskemasanfk as idjeniskemasan','rpd.racikanke','rpd.dosisracikan', 'pr.id as idproduk','pr.produk','rpd.jumlah','rpd.signa','jk.jeniskemasan','ap.id as idaturanpakai','ap.aturanpakai' , 'rpd.keterangan','rpd.hargasatuan','rpd.hargatotal','rpd.jasa','rpd.hargatotaljasa'
            )
            ->where('rp.norec', '=',$request['norec_rp'])
            ->where('rp.statusenabled', true)
            ->get();

        $head->details = $detail;

        return $this->respond($head);


     }

     public function deletePelayananObatPasien(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];
        $GLOBALS['PP'] = '';

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['norec_item_pp'] as $item){
                PelayananPasien::query()
                ->where('norec',$item)
                ->each(function ($oldRecord){
                    $newRecord = $oldRecord->replicate();
                    $newRecord->pegawaideletefk = $GLOBALS['userId'];
                    $newRecord->setTable('pelayananpasiendelete_t');
                    $newRecord->save();
                    $GLOBALS['PP'] = $newRecord;
                    $oldRecord->delete();
                });

                $SR =  \DB::table('strukresep_t as sr')
                            ->join('ruangan_m as ru','ru.id','=','sr.ruanganfk')
                            ->select('sr.ruanganfk','ru.ruangan','sr.norec')
                            ->where('sr.norec',$GLOBALS['PP']->strukresepfk)
                            ->first();

                $SP =  StokProduk::where('produkfk',$GLOBALS['PP']->produkfk)
                                    ->where('ruanganfk',$SR->ruanganfk)
                                    ->first();

                $saldo_awal = $SP->jumlah;
                $SP->jumlah =  (float)$SP->jumlah - (float)$GLOBALS['PP']->jumlah;
                $SP->save();

                $norec_SP = $SP->norec;
                $saldo_akhir = $SP->jumlah;

                $KS = new KartuStok();
                $KS->norec = $KS->generateNewId();
                $KS->kdprofile = 0;
                $KS->statusenabled = true;
                $KS->tgllayanan = date('Y-m-d H:i:s');
                $KS->produkfk =  $GLOBALS['PP']->produkfk;
                $KS->ruanganfk =  $SR->ruanganfk;
                $KS->saldoawal =  $saldo_awal;
                $KS->saldomasuk =  $GLOBALS['PP']->jumlah;
                $KS->saldokeluar = 0;
                $KS->saldoakhir =  $saldo_akhir;
                $KS->keterangan =  'Delete Pelayanan Obat Pasien di Ruangan '.$SR->ruangan;
                $KS->tabeltransaksi =  'pelayananpasiendelete_t';
                $KS->norectransaksi =  $GLOBALS['PP']->norec;
                $KS->flagfk =  7;
                $KS->pegawaiinputfk =  $dataLogin['userData']['id'];
                $KS->save();

                $SRD = StrukResepDetail::where('strukresepfk',$SR->norec)->get();

                foreach($SRD as $itemSRD){
                    $SPD = StokProdukDetail::where('norec', $itemSRD->stokprodukdetailfk)->first();
                    $SPD->jumlah = $SPD->jumlah + $itemSRD->jumlah;
                    $SPD->save();
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
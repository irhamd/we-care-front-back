<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\BlankoLabPasien;
use App\Transaksi\BlankoLabPasienDetail;
use App\Transaksi\StrukLab;
use App\Transaksi\PelayananPasien;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class LaboratoriumController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function savePemeriksaanLab(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            $nolab = $request['nolab'];

            if($request['nolab']==''){

                $nolab = $this->generateCodeBySeqTable(new StrukLab, 'nolab', 15, 'L' . date('ym') . '');

                if ($nolab == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }
            }

            $todayDate = Carbon::parse(date('Y-m-d H:i:s'))->isoFormat('YYYY-MM-DD');

            $countNoAntrian = AntrianPasienDiperiksa::where('ruanganfk',$request['idruanganlab'])
                ->where('tglregistrasi', '>=', $todayDate.' 00:00')
                ->where('tglregistrasi', '<=', $todayDate.' 23:59')
                ->count('norec');
            $noAntrian = $countNoAntrian + 1;

            if ($request['norec_apdlab']=='' ){
                $dataAPD =new AntrianPasienDiperiksa;
                $dataAPD->norec = $dataAPD->generateNewId();
                $dataAPD->kdprofile = 1;
                $dataAPD->statusenabled = true;
                $dataAPD->noantrian = $noAntrian;
                $dataAPD->ruanganfk = $request['idruanganlab'];
                $dataAPD->ruanganasalfk = $request['idruanganasal'];
                $dataAPD->kelasfk = 0;
                $dataAPD->tglkeluar = date('Y-m-d H:i:s');
                $dataAPD->pasiendaftarfk = $request['norec_pd'];
                // $dataAPD->pegawaifk = $request['idpegawai'];
                $dataAPD->statusantrian = 0;
                $dataAPD->tglregistrasi =  date('Y-m-d H:i:s');
                $dataAPD->tglmasuk = date('Y-m-d H:i:s');
                $dataAPD->save();
            }else{
                $dataAPD =  AntrianPasienDiperiksa::where('norec',$request['norec_apdlab'])->first();
            }

            $SLab = new StrukLab();
            $SLab->norec = $SLab->generateNewId();
            $SLab->kdprofile = 0;
            $SLab->statusenabled = true;
            $SLab->nolab = $nolab;
            $SLab->tglstruk = date('Y-m-d H:i:s');
            $SLab->antrianpasiendiperiksafk =  $dataAPD->norec;
            $SLab->ruanganfk = $request['idruanganlab'];

            if (isset($request['norec_blankolab']) && $request['norec_blankolab']!="" && $request['norec_blankolab']!="undefined"){
                $SLab->blankolabpasienfk = $request['norec_blankolab'];
            }
            if (isset($request['noblankolab']) && $request['noblankolab']!="" && $request['noblankolab']!="undefined"){
                $SLab->noblankolab = $request['noblankolab'];
            }
            if (isset($request['statusprioritas']) && $request['statusprioritas']!="" && $request['statusprioritas']!="undefined"){
                $SLab->statusprioritas = $request['statusprioritas'];
            }
            $SLab->pegawaiinputfk =  $dataLogin['userData']['id'];
            $SLab->save();

            foreach ($request['detail'] as $item){
                $jasa = 0;
                $PelPasien = new PelayananPasien();
                $PelPasien->norec = $PelPasien->generateNewId();
                $PelPasien->kdprofile = 0;
                $PelPasien->statusenabled = true;
                $PelPasien->tglpelayanan =  date('Y-m-d H:i:s');
                $PelPasien->antrianpasiendiperiksafk =  $dataAPD->norec;
                $PelPasien->produkfk =  $item['idproduk'];
                $PelPasien->jumlah =  $item['jumlah'];
                $PelPasien->hargasatuan =  $item['hargasatuan'];
                $PelPasien->hargatotal =  $item['hargatotal'];
                $PelPasien->jasa =  $jasa;
                $PelPasien->hargatotaljasa =  $jasa+$item['hargatotal'];
                // $PelPasien->jenispelayananfk =  $item['jenispelayananfk'];
                $PelPasien->pegawaipelaksanafk =  $item['idpelaksana'];
                $PelPasien->struklabfk =  $SLab->norec;
                $PelPasien->pegawaiinputfk =  $dataLogin['userData']['id'];
                // $PelPasien->isparamedis =  $item['isparamedis'];
                $PelPasien->save();
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

     public function getDaftarPasienBlankoLab(Request $request)
     {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('blankolabpasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->join('ruangan_m as ru2', 'ru2.id','=','rp.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','rp.pegawaifk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.noregistrasi','pd.tglregistrasi','pg.namalengkap as pegawaiblanko',
                    'pd.norec as norec_pd','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','pd.noregistrasi','rp.noblankolab','rp.norec as norec_blankolab'
            )
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

        if(isset($request['idruanganlab']) && $request['idruanganlab']!="" && $request['idruanganlab']!="undefined") {
            $data = $data->where('ru2.id', '=', $request['idruanganlab']);
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

     public function getDetailBlankoLabByNorec(Request $request)
     {
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('blankolabpasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('pegawai_m as pg','pg.id','=','rp.pegawaifk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','rp.ruanganfk')
            ->select('ps.namapasien','ps.nocm','pg.namalengkap as penulisresep','pd.tglregistrasi','pg.id as idpenulisresep', 'apd.norec as norec_apd', 'rp.norec as norec_blankolab','rp.statusprioritas','rp.tglblanko','rp.noblankolab','ru.id as idruanganasal','ru.ruangan as ruanganasal','ru2.id as idruanganlab','ru2.ruangan as ruanganlab','pd.norec as norec_pd','pd.tglregistrasi','pd.noregistrasi'
            )
            ->where('rp.norec', '=',$request['norec_blankolab'])
            ->first();

         $detail = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('blankolabpasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('blankolabpasiendetail_t as rpd','rpd.blankolabpasienfk','=','rp.norec')
            ->join('produk_m as pr','pr.id','=','rpd.produkfk')
            ->select('pr.id as idproduk','pr.produk','rpd.jumlah','rpd.keterangan','rpd.hargasatuan','rpd.hargatotal','rpd.jasa','rpd.hargatotaljasa'
            )
            ->where('rpd.blankolabpasienfk', '=',$request['norec_blankolab'])
            ->where('rp.statusenabled', true)
            ->where('rpd.statusenabled', true)
            ->get();

        $head->details = $detail;

        return $this->respond($head);

     }


    public function getProdukLab(Request $request){
        $data = \DB::table('produk_m as dat')
            ->join('harganettoproduk_m as hn', 'hn.produkfk','=','dat.id')
            ->select('dat.id', 'dat.id as value','dat.produk as label' , 'dat.produk','hn.hargasatuan')
            ->where('dat.statusenabled', true)
            ->where('dat.jenisprodukfk',3);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['nama'] .'%');
        };

        // $data =$data->take(10);
        $data =$data->orderBy('dat.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    public function getPegawaiLab(Request $request){
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

    public function getRuanganLab(Request $request){
        $data = \DB::table('ruangan_m as dat')
                ->select('dat.id as idruanganlab', 'dat.ruangan as ruanganlab')
                ->where('dat.instalasifk', 5)
                ->where('dat.statusenabled', true);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.ruangan', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getDaftarPasienPelayananLab(Request $request)
     {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('struklab_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->join('ruangan_m as ru2', 'ru2.id','=','rp.ruanganfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.noregistrasi','pd.norec as norec_pd','apd.norec as norec_apd',
                    'ru.id as idruangan','ru.ruangan','ru2.id as idruanganlab','ru2.ruangan as ruanganlab','pd.noregistrasi','rp.nolab',
                    'rp.norec as norec_sl')
          
            ->where('pd.statusenabled',1);
            // ->groupBy('ps.id','ps.namapasien','ps.nocm','pd.noregistrasi','pd.norec','apd.norec');



        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };

        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };

        if(isset($request['idruanganlab']) && $request['idruanganlab']!="" && $request['idruanganlab']!="undefined") {
            $data = $data->where('ru2.id', '=', $request['idruanganlab']);
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

     public function getDetailLabByNoregistrasi(Request $request)
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
            ->join('struklab_t as sp', 'sp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('pelayananpasien_t as pp', 'pp.struklabfk','=','sp.norec')
            ->join('produk_m as pr', 'pr.id','=','pp.produkfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','sp.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','pp.pegawaipelaksanafk')
            ->select('pp.norec as norec_pp','sp.nolab','pg.namalengkap as pegawaipelaksana','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','ru2.id as iddepo','ru2.ruangan as depo','pr.id as idproduk','pr.produk','pp.tglpelayanan','pp.jumlah','pp.hargasatuan','pp.jasa','pp.hargatotaljasa')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->get();

        $head->detail= $data;

        return $this->respond($head);


     }

     public function deletePelayananLab(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

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
                    $oldRecord->delete();
                });

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
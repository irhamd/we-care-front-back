<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;
use App\Master\AlamatPasien;
use App\Master\DomisiliPasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\StrukPelayanan;
use App\Transaksi\PelayananPasien;
use App\Transaksi\StrukPembayaran;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class KasirController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getDataComboPasienPulang(Request $request){
        
        $dataPenjamin = \DB::table('penjamin_m as dat')
            ->select('dat.id', 'dat.penjamin')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $dataRujukan = \DB::table('asalrujukan_m as dat')
            ->select('dat.id', 'dat.asalrujukan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $dataInstalasi = \DB::table('instalasi_m as dat')
            ->select('dat.id', 'dat.instalasi')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $dataRuangan = \DB::table('ruangan_m as dat')
            ->select('dat.id', 'dat.ruangan','dat.instalasifk')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $result = array(
            'penjamin' => $dataPenjamin,
            'asalrujukan' => $dataRujukan,
            'instalasi' => $dataInstalasi,
            'ruangan' => $dataRuangan,
        );

        return $this->respond($result);
    }

    public function getDaftarPasienPulang( Request $request) {
        $data = \DB::table('antrianpasiendiperiksa_t as apd')
            ->join('pasiendaftar_t as pd','pd.norec','=','apd.pasiendaftarfk')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('asalrujukan_m as ar','ar.id','=','pd.asalrujukanfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('pd.norec as norec_pd','apd.norec as norec_apd','ps.nocm','ps.namapasien', 'ps.tgllahir','ps.tempatlahir',
                'ps.jeniskelamin','ps.noktp', 'ps.id as nocmfk','ps.namaayah','ps.nohp', 'pj.penjamin','pj.id as idpenjamin','ps.nopenjamin','ar.asalrujukan','pd.tglregistrasi',
                'pd.noregistrasi','pd.pjnama','pd.pjhubungan','pd.namaperujuk','ru.id as idruangan','ru.ruangan','ins.instalasi','ins.id as idinstalasi', 'pd.tglpulang' 
            )
            ->where('pd.statusenabled',true);

        if(isset($request['nocm']) && $request['nocm']!="" && $request['nocm']!="undefined") {
            $data = $data->where('ps.nocm', 'like', '%'. $request['nocm'] .'%');
        };

        if(isset($request['namapasien']) && $request['namapasien']!="" && $request['namapasien']!="undefined") {
            $data = $data->where('ps.namapasien', 'like', '%'. $request['namapasien'] .'%');
        };
        if(isset($request['noregistrasi']) && $request['noregistrasi']!="" && $request['noregistrasi']!="undefined") {
            $data = $data->where('pd.noregistrasi', 'like', '%'. $request['noregistrasi'] .'%');
        };
        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglpulang', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglpulang', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };

        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function getDetailPelayananVerifByNoregistrasi(Request $request)
     {
        
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.tglregistrasi','pd.tglpulang','pd.noregistrasi','pd.norec as norec_pd','ru.ruangan as ruanganakhir','pd.noregistrasi','pj.penjamin','pj.id as idpenjamin')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->first();

        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pelayananpasien_t as pp', 'pp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('produk_m as pr', 'pr.id','=','pp.produkfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','pp.pegawaipelaksanafk')
            ->select('pp.norec as norec_pp','pg.namalengkap as pelaksana','apd.norec as norec_apd','ru.id as idruangan','ru.ruangan','pr.id as idproduk','pr.produk','pp.tglpelayanan','pp.jumlah','pp.hargasatuan','pp.jasa','pp.hargatotaljasa')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->whereNull('pp.strukpelayananfk')
            ->get();

        $head->detail= $data;

        return $this->respond($head);
     }

     public function saveVerifikasiPelayanan(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            $noStruk = $this->generateCode(new StrukPelayanan, 'nostrukpelayanan', 10, 'SV');
            $SP = new StrukPelayanan();
            $SP->norec = $SP->generateNewId();
            $SP->statusenabled = true;
            $SP->tglstruk = date('Y-m-d H:i:s');
            $SP->totalharusdibayar = (float)$request['totalharusdibayar'];
            $SP->totalklaim = (float)$request['totalklaim'];
            $SP->totalverif = (float)$request['totalverif'];
            $SP->pasiendaftarfk = $request['norec_pd'];
            $SP->penjaminfk = $request['idpenjamin'];
            $SP->pegawaiinputfk = $dataLogin['userData']['id'];
            $SP->nostrukpelayanan = $noStruk;
            $SP->save();

            foreach ($request['norec_item_pp'] as $item){
                PelayananPasien::where('norec', $item)
                    ->update([
                            'strukpelayananfk' => $SP->norec]
                    );
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

    public function getRincianPelayananPasien(Request $request)
     {
        
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.tglregistrasi','pd.tglpulang','pd.noregistrasi','pd.norec as norec_pd','ru.ruangan as ruanganakhir','pd.noregistrasi','pj.penjamin','pj.id as idpenjamin')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->first();

        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pelayananpasien_t as pp', 'pp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('produk_m as pr', 'pr.id','=','pp.produkfk')
            ->leftjoin('strukpelayanan_t as sp', 'sp.norec','=','pp.strukpelayananfk')
            ->leftjoin('strukresep_t as sr', 'sr.norec','=','pp.strukresepfk')
            ->leftjoin('struklab_t as sl', 'sl.norec','=','pp.struklabfk')
            ->leftjoin('ruangan_m as ru2', 'ru2.id','=','sl.ruanganfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','pp.pegawaipelaksanafk')
            ->select('pp.norec as norec_pp','pg.namalengkap as pelaksana','ru2.ruangan as ruanganpenunjang','sl.norec as norec_stlab',
                DB::raw(' case when sl.norec is null then ru.ruangan else ru2.ruangan end as ruangan'),
                'apd.norec as norec_apd','ru.id as idruangan','ru.ruangan as ruangan1','pr.id as idproduk','pr.produk','pp.tglpelayanan','pp.jumlah',
                'pp.hargasatuan','pp.jasa','pp.hargatotaljasa','sp.nostrukpelayanan','sr.norec as norec_sr')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->get();

        $head->detail= $data;

        return $this->respond($head);
     }

     public function savePembayaranPasien(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            $noStruk = $this->generateCode(new StrukPembayaran, 'nostrukpembayaran', 15, 'SB');
            $SP = new StrukPembayaran();
            $SP->norec = $SP->generateNewId();
            $SP->statusenabled = true;
            $SP->tglstruk = date('Y-m-d H:i:s');
            $SP->totalharusdibayar = (float)$request['totalharusdibayar'];
            $SP->totalbayar = (float)$request['totalbayar'];
            $SP->pasiendaftarfk = $request['norec_pd'];
            $SP->carabayarfk = $request['idcarabayar'];
            $SP->nostrukpembayaran = $noStruk;
            $SP->pegawaiinputfk = $dataLogin['userData']['id'];
            $SP->save();

            foreach ($request['norec_item_sp'] as $item){
                StrukPelayanan::where('norec', $item)
                    ->update([
                            'strukpembayaranfk' => $SP->norec]
                    );
            }

            PasienDaftar::where('norec', $request['norec_pd'])
            ->update([
                'isclosing' =>'1',
                'tglclosing' =>date('Y-m-d H:i:s'),
            ]);


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

    public function getDaftarVerifikasiLayanan(Request $request)
     {
        
        $data = \DB::table('strukpelayanan_t as sp')
            ->join('pasiendaftar_t as pd', 'pd.norec','=','sp.pasiendaftarfk')
            ->leftjoin('pasien_m as ps', 'ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj', 'pj.id','=','sp.penjaminfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','sp.pegawaiinputfk')
            ->select('sp.norec as norec_sp', 'sp.tglstruk', 'sp.nostrukpelayanan','sp.totalverif','sp.totalklaim','sp.totalharusdibayar', 'pj.penjamin', 'pg.namalengkap as pegawaiverif')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->whereNull('sp.strukpembayaranfk')
            ->get();

        return $this->respond($data);
     }

     public function batalPembayaranPasien(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

        DB::beginTransaction();
        $error='';

        try {

            StrukPembayaran::query()
            ->where('norec',$request['norec_spem'])
            ->each(function ($oldRecord){
                $newRecord = $oldRecord->replicate();
                $newRecord->pegawaideletefk = $GLOBALS['userId'];
                $newRecord->setTable('strukpembayarandelete_t');
                $newRecord->save();
                $oldRecord->delete();
            });


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

    public function getDaftarPasienBayar( Request $request) {

        $data = \DB::table('strukpembayaran_t as sp')
            ->join('pasiendaftar_t as pd', 'pd.norec','=','sp.pasiendaftarfk')
            ->join('pasien_m as ps', 'ps.id','=','pd.pasienfk')
            ->leftjoin('carabayar_m as cb', 'cb.id','=','sp.carabayarfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('pegawai_m as pg', 'pg.id','=','sp.pegawaiinputfk')
            ->select('sp.norec as norec_spem', 'sp.tglstruk', 'sp.nostrukpembayaran','sp.totalbayar', 'pg.namalengkap as kasir',
                'ps.namapasien', 'ps.nocm', 'pd.noregistrasi', 'ru.ruangan','cb.carabayar'
            );


        if(isset($request['nocm']) && $request['nocm']!="" && $request['nocm']!="undefined") {
            $data = $data->where('ps.nocm', 'like', '%'. $request['nocm'] .'%');
        };

        if(isset($request['namapasien']) && $request['namapasien']!="" && $request['namapasien']!="undefined") {
            $data = $data->where('ps.namapasien', 'like', '%'. $request['namapasien'] .'%');
        };
        if(isset($request['noregistrasi']) && $request['noregistrasi']!="" && $request['noregistrasi']!="undefined") {
            $data = $data->where('pd.noregistrasi', 'like', '%'. $request['noregistrasi'] .'%');
        };
        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglpulang', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglpulang', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ru.instalasifk', '=', $request['idinstalasi']);
        };

        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();

        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

	
}
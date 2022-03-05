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

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class RegistrasiPasienController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getDataComboRegistrasi(Request $request){
        
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

        $dataKelas = \DB::table('kelas_m as dat')
            ->select('dat.id', 'dat.kelas')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $dataHubKeluarga = \DB::table('statuskeluarga_m as dat')
            ->select('dat.id', 'dat.statuskeluarga')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $result = array(
            'penjamin' => $dataPenjamin,
            'asalrujukan' => $dataRujukan,
            'instalasi' => $dataInstalasi,
            'ruangan' => $dataRuangan,
            'kelas' => $dataKelas,
            'statuskeluarga' =>$dataHubKeluarga
        );

        return $this->respond($result);
    }

	public function saveRegistrasiPasien(Request $request) {
        $noRegistrasiSeq = $this->generateCodeBySeqTable(new PasienDaftar, 'noregistrasi', 10, date('ym'));
        $noAntrian=0;
        if ($noRegistrasiSeq == ''){
            $transMessage = "Gagal mengumpukan data, Coba lagi.!";
            DB::rollBack();
            $result = array(
                "status" => 400,
                "message"  => $transMessage,
                "as" => 'as@epic',
            );
            return $this->setStatusCode($result['status'])->respond($result, $transMessage);
        }

        $r_NewPD=$request;
        $r_NewAPD=$request;
        $todayDate = Carbon::parse($r_NewPD['tglregistrasi'])->isoFormat('YYYY-MM-DD');

        $countNoAntrian = AntrianPasienDiperiksa::where('ruanganfk',$r_NewPD['idruangan'])
            ->where('tglregistrasi', '>=', $todayDate.' 00:00')
            ->where('tglregistrasi', '<=', $todayDate.' 23:59')
            ->count('norec');
        $noAntrian = $countNoAntrian + 1;

        if($r_NewPD['israwatinap']=='true'){
            $isRawatInap='true';
        }else{
            $isRawatInap='false';
        }
        DB::beginTransaction();
        $cekUdahDaftar=PasienDaftar::where('pasienfk', $r_NewPD['idpasien'])
            ->wherenull('tglpulang')
            ->count();
            
        if($cekUdahDaftar > 0 && $r_NewPD['norec_pd']=='')
        {
            $transStatus='belumdipulangkan';
        }else{
            try{
                if ($r_NewPD['norec_pd']==''){
                    $dataPD = new PasienDaftar();
                    $dataPD->norec = $dataPD->generateNewId();
                    $dataPD->kdprofile = 1;
                    $dataPD->statusenabled = true;
                    $noRegistrasi = $noRegistrasiSeq;//$this->generateNoReg(new PasienDaftar, 'noregistrasi', 10, date('ym'));//$this->getMaxNoregistrasi();

                }else{
                    $dataPD =  PasienDaftar::where('norec',$r_NewPD['norec_pd'])->first();
                    $noRegistrasi = $dataPD->noregistrasi ;
                }

                    $dataPD->pegawaifk = $r_NewPD['idpegawai'];
                    $dataPD->penjamin = $r_NewPD['penjamin'];
                    $dataPD->penjaminfk = $r_NewPD['idpenjamin'];
                    $dataPD->pasienfk = $r_NewPD['idpasien'];
                    $dataPD->ruanganawalfk = $r_NewPD['idruangan'];
                    $dataPD->ruanganakhirfk = $r_NewPD['idruangan'];
                    $dataPD->statuskasuspenyakit = $r_NewPD['statuskasuspenyakit'];
                    $dataPD->tglregistrasi = $r_NewPD['tglregistrasi'];
                    $dataPD->tglreservasi = $r_NewPD['tglregistrasi'];
                    $dataPD->asalrujukan = $r_NewPD['asalrujukan'];
                    $dataPD->asalrujukanfk = $r_NewPD['idasalrujukan'];
                    if (isset($r_NewPD['namaperujuk']) && $r_NewPD['namaperujuk']!="" && $r_NewPD['namaperujuk']!="undefined"){
                        $dataPD->namaperujuk = $r_NewPD['namaperujuk'];
                    }
                    if (isset($r_NewPD['catatanrujukan']) && $r_NewPD['catatanrujukan']!="" && $r_NewPD['catatanrujukan']!="undefined"){
                        $dataPD->catatanperujuk = $r_NewPD['catatanrujukan'];
                    }

                    if (isset($r_NewPD['pjnama']) && $r_NewPD['pjnama']!="" && $r_NewPD['pjnama']!="undefined"){
                        $dataPD->pjnama = $r_NewPD['pjnama'];
                    }
                    if (isset($r_NewPD['pjhubungan']) && $r_NewPD['pjhubungan']!="" && $r_NewPD['pjhubungan']!="undefined"){
                        $dataPD->pjhubungan = $r_NewPD['pjhubungan'];
                    }
                    if (isset($r_NewPD['pjnohp']) && $r_NewPD['pjnohp']!="" && $r_NewPD['pjnohp']!="undefined"){
                        $dataPD->pjnohp = $r_NewPD['pjnohp'];
                    }

                    if ($isRawatInap=='true'){
                        $dataPD->kelasawalfk = $r_NewPD['idkelas'];
                        $dataPD->kelasakhirfk = $r_NewPD['idkelas'];
                        $dataPD->tglpulang = null;
                    }else{
                        $dataPD->kelasawalfk = 0;
                        $dataPD->kelasakhirfk = 0;
                        $dataPD->tglpulang =  $r_NewPD['tglregistrasi'];
                    }

                    $cekStatusPasien=PasienDaftar::where('pasienfk', $r_NewPD['idpasien'])
                        ->count('pasienfk');
                    if ($cekStatusPasien  > 0){
                        $statusKunjungan='LAMA';
                    }else{
                        $statusKunjungan='BARU';
                    }
                    $dataPD->statuskunjungan = $statusKunjungan;
                    if(isset($r_NewPD['statusschedule'])){
                        $dataPD->statusschedule = $r_NewPD['statusschedule'];
                    }
                    $dataPD->noregistrasi = $noRegistrasi;
                    $dataPD->save();

                    $dataPDnorec = $dataPD->norec;

                if ($r_NewAPD['norec_apd']=='' ){

                    $dataAPD =new AntrianPasienDiperiksa;
                    $dataAPD->norec = $dataAPD->generateNewId();
                    $dataAPD->kdprofile = 1;
                    $dataAPD->statusenabled = true;
                }else{
                    $dataAPD =  AntrianPasienDiperiksa::where('norec',$r_NewAPD['norec_apd'])->first();
                }
                if (isset($r_NewAPD['noantrian']) && $r_NewAPD['noantrian']!="" && $r_NewAPD['noantrian']!="undefined"){
                    $dataAPD->noantrian = $r_NewAPD['noantrian'];
                }else{
                    $dataAPD->noantrian = $noAntrian;
                }

                $dataAPD->ruanganfk = $r_NewPD['idruangan'];
                $dataAPD->ruanganasalfk = $r_NewPD['idruangan'];

                if ($isRawatInap=='true'){
                    $dataAPD->kelasfk = $r_NewPD['idkelas'];;
                    $dataAPD->tglkeluar= null;
                }else{
                    $dataAPD->kelasfk = 0;
                    $dataAPD->tglkeluar = $r_NewPD['tglregistrasi'];
                }
                $dataAPD->pasiendaftarfk = $dataPDnorec;
                $dataAPD->pegawaifk = $r_NewAPD['objectpegawaifk'];
                $dataAPD->statusantrian = 0;
                $dataAPD->tglregistrasi =  $r_NewAPD['tglregistrasi'];
                $dataAPD->tglmasuk =$r_NewAPD['tglregistrasi'];
                $dataAPD->save();

                  $transStatus = 'true';
                } catch (\Exception $e) {
                    $error = $e->getMessage();
                    $transStatus = 'false';
                }
        }

        if ($transStatus == 'belumdipulangkan') {
            $transMessage = 'Pasien Belum Dipulangkan';
            $result = array(
                'status' => 400,
                'message'  => $transMessage,
            );
        }
        else if ($transStatus == 'true') {
            $transMessage = 'SUKSES';
            DB::commit();
            $result = array(
                'status' => 201,
                'message'=>$transMessage,
            );
        } else {
            $transMessage = 'Simpan Registrasi Gagal';
            DB::rollBack();
            $result = array(
                'status' => 400,
                'error' => $error,
                'message'=>$transMessage,
            );
        }
       return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    public function getPasienById(Request $request) {
        $data = \DB::table('pasien_m as ps')
            ->select('ps.nocm','ps.namapasien','ps.tgllahir', 'ps.jeniskelamin','ps.noktp', 'ps.id as nocmfk','ps.nohp',
                'ps.penjaminfk','ps.penjamin','ps.nopenjamin')
            ->where('ps.statusenabled',true)
            ->where('ps.id', '=', $request['nocmfk'])
            ->get();

        return $this->respond($data);
    }

    public function getDaftarRegistrasi( Request $request) {
        $data = \DB::table('antrianpasiendiperiksa_t as apd')
            ->join('pasiendaftar_t as pd','pd.norec','=','apd.pasiendaftarfk')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('asalrujukan_m as ar','ar.id','=','pd.asalrujukanfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('pd.norec as norec_pd','apd.norec as norec_apd','ps.nocm','ps.namapasien', 'ps.tgllahir','ps.tempatlahir','ps.foto','ps.nrp',
            'ps.jeniskelamin','ps.noktp', 'ps.id as nocmfk','ps.namaayah','ps.nohp', 'pj.penjamin','ps.nopenjamin','ar.asalrujukan','pd.tglregistrasi',
                'pd.noregistrasi','pd.pjnama','pd.pjhubungan','pd.namaperujuk','ru.id as idruangan','ru.ruangan','ins.instalasi','ins.id as idinstalasi' 
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
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };

        $data = $data->where('pd.statusenabled',true);
        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();

        foreach ($data as $key => $value) {
            $jumlahkunjungan = Db::table("pasiendaftar_t")->where("pasienfk", $value->nocmfk)->where('statusenabled', true)->count();
            $data[$key]->jumlah = $jumlahkunjungan;
            // DB::raw("SELECT count(norec)  as jumlah  from pasiendaftar_t pt WHERE  pasienfk = ps.id");

        }

        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function getDaftarRegistrasiRajal( Request $request) {
        $data = \DB::table('antrianpasiendiperiksa_t as apd')
            ->join('pasiendaftar_t as pd','pd.norec','=','apd.pasiendaftarfk')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('asalrujukan_m as ar','ar.id','=','pd.asalrujukanfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('pd.norec as norec_pd','apd.norec as norec_apd','ps.nocm','ps.namapasien', 'ps.tgllahir','ps.tempatlahir',
                'ps.jeniskelamin','ps.noktp', 'ps.id as nocmfk','ps.namaayah','ps.nohp', 'pj.penjamin','ps.nopenjamin','ar.asalrujukan','pd.tglregistrasi',
                'pd.noregistrasi','pd.pjnama','pd.pjhubungan','pd.namaperujuk','ru.id as idruangan','ru.ruangan','ins.instalasi','ins.id as idinstalasi' 
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
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };

        $data = $data->where('pd.statusenabled',true);
        $data = $data->whereIn('ru.instalasifk',[1,2]);
        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function getDaftarRegistrasiRanap( Request $request) {
        $data = \DB::table('antrianpasiendiperiksa_t as apd')
            ->join('pasiendaftar_t as pd','pd.norec','=','apd.pasiendaftarfk')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('asalrujukan_m as ar','ar.id','=','pd.asalrujukanfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('pd.norec as norec_pd','apd.norec as norec_apd','ps.nocm','ps.namapasien', 'ps.tgllahir','ps.tempatlahir',
                'ps.jeniskelamin','ps.noktp', 'ps.id as nocmfk','ps.namaayah','ps.nohp', 'pd.penjamin','ps.nopenjamin','ar.asalrujukan','pd.tglregistrasi',
                'pd.noregistrasi','pd.pjnama','pd.pjhubungan','pd.namaperujuk','ru.id as idruangan','ru.ruangan','ins.instalasi','ins.id as idinstalasi' 
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
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };

        $data = $data->where('pd.statusenabled',true);
        $data = $data->whereNull('pd.tglpulang');
        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }
	
}
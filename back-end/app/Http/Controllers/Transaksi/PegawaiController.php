<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pegawai;
use App\Master\LoginUser;
use App\Master\DataKepegawaian;
use App\Traits\Valet;


use DB;

class PegawaiController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

	public function getDataComboPegawai(Request $request){

        $jeniskelamin = \DB::table('jeniskelamin_m as dat')
            ->select('dat.id', 'dat.jeniskelamin')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();
		
        $dataAgama = \DB::table('agama_m as ag')
            ->select('ag.id', 'ag.agama')
            ->where('ag.statusenabled', true)
            ->orderBy('ag.id')
            ->get();

        $dataStatusPerkawinan = \DB::table('statusperkawinan_m as sp')
            ->select('sp.id', 'sp.statusperkawinan')
            ->where('sp.statusenabled', true)
            ->orderBy('sp.id')
            ->get();

        $dataPendidikan = \DB::table('pendidikan_m as pdd')
            ->select('pdd.id', 'pdd.pendidikan')
            ->where('pdd.statusenabled', true)
            ->orderBy('pdd.id')
            ->get();

        $jabatan = \DB::table('jabatan_m as dat')
            ->select('dat.id', 'dat.jabatan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $statuskepegawaian = \DB::table('statuskepegawaian_m as dat')
            ->select('dat.id', 'dat.statuskepegawaian')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $jeniskepegawaian = \DB::table('jeniskepegawaian_m as dat')
            ->select('dat.id', 'dat.jeniskepegawaian')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $golongan = \DB::table('golongan_m as dat')
            ->select('dat.id', 'dat.golongan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

	    $result = array(
            'jeniskelamin' => $jeniskelamin,
	    	'agama' => $dataAgama,
	    	'statusperkawinan' => $dataStatusPerkawinan,
            'pendidikan' => $dataPendidikan,
            'jabatan' => $jabatan,
            'statuskepegawaian' => $statuskepegawaian,
            'jeniskepegawaian' => $jeniskepegawaian,
	    	'golongan' => $golongan,
	    );

	    return $this->respond($result);
	}

    public function savePegawai(Request $request) {
        $datLogin =$request->all();
        $error="";

        DB::beginTransaction();
        try{
            if($request['idpegawai'] == '') {
                $newId = Pegawai::max('id') + 1;

                $dataPg = new Pegawai();
                $dataPg->id = $newId;
                $dataPg->kdprofile = 0;
                $dataPg->statusenabled = true;
                $dataPg->norec =  $dataPg->generateNewId();

            }else{
                $dataPg = Pegawai::where('id',$request['idpegawai'])->first();
                $newId = $dataPg->id;
            }

            $dataPg->namalengkap =  $request['namalengkap'];
            if (isset( $request['nik']) &&  $request['nik']!="" &&  $request['nik']!="undefined"){
                $dataPg->nik =  $request['nik'];
            }
            if (isset( $request['nip']) &&  $request['nip']!="" &&  $request['nip']!="undefined"){
                $dataPg->nip =  $request['nip'];
            }
            if (isset( $request['noserikartupegawai']) &&  $request['noserikartupegawai']!="" &&  $request['noserikartupegawai']!="undefined"){
                $dataPg->noserikartupegawai =  $request['noserikartupegawai'];
            }
            if (isset( $request['gelardepan']) &&  $request['gelardepan']!="" &&  $request['gelardepan']!="undefined"){
                $dataPg->gelardepan =  $request['gelardepan'];
            }
            if (isset( $request['gelarbelakang']) &&  $request['gelarbelakang']!="" &&  $request['gelarbelakang']!="undefined"){
                $dataPg->gelarbelakang =  $request['gelarbelakang'];
            }
            if (isset( $request['idjeniskelamin']) &&  $request['idjeniskelamin']!="" &&  $request['idjeniskelamin']!="undefined"){
                $dataPg->jeniskelaminfk =  $request['idjeniskelamin'];
                $dataPg->jeniskelamin =  $request['jeniskelamin'];
            }
            if (isset( $request['tempatlahir']) &&  $request['tempatlahir']!="" &&  $request['tempatlahir']!="undefined"){
                $dataPg->tempatlahir =  $request['tempatlahir'];
            }
            if (isset( $request['tgllahir']) &&  $request['tgllahir']!="" &&  $request['tgllahir']!="undefined"){
                $dataPg->tgllahir =  $request['tgllahir'];
            }
            if (isset( $request['idagama']) &&  $request['idagama']!="" &&  $request['idagama']!="undefined"){
                $dataPg->agamafk =  $request['idagama'];
                $dataPg->agama =  $request['agama'];
            }
            if (isset( $request['idstatusperkawinan']) &&  $request['idstatusperkawinan']!="" &&  $request['idstatusperkawinan']!="undefined"){
                $dataPg->statusperkawinanfk =  $request['idstatusperkawinan'];
                $dataPg->statusperkawinan =  $request['statusperkawinan'];
            }
            if (isset( $request['email']) &&  $request['email']!="" &&  $request['email']!="undefined"){
                $dataPg->email =  $request['email'];
            }
            if (isset( $request['alamat']) &&  $request['alamat']!="" &&  $request['alamat']!="undefined"){
                $dataPg->alamat =  $request['alamat'];
            }
            if (isset( $request['nohp']) &&  $request['nohp']!="" &&  $request['nohp']!="undefined"){
                $dataPg->nohp =  $request['nohp'];
            }
            if (isset( $request['idpendidikanawal']) &&  $request['idpendidikanawal']!="" &&  $request['idpendidikanawal']!="undefined"){
                $dataPg->pendidikanawalfk =  $request['idpendidikanawal'];
                $dataPg->pendidikanawal =  $request['pendidikanawal'];
            }
            if (isset( $request['kodesdmkawal']) &&  $request['kodesdmkawal']!="" &&  $request['kodesdmkawal']!="undefined"){
                $dataPg->kodesdmkawal =  $request['kodesdmkawal'];
            }
            if (isset( $request['idpendidikanakhir']) &&  $request['idpendidikanakhir']!="" &&  $request['idpendidikanakhir']!="undefined"){
                $dataPg->pendidikanakhirfk =  $request['idpendidikanakhir'];
                $dataPg->pendidikanakhir =  $request['pendidikanakhir'];
            }
            if (isset( $request['kodesdmkakhir']) &&  $request['kodesdmkakhir']!="" &&  $request['kodesdmkakhir']!="undefined"){
                $dataPg->kodesdmkakhir =  $request['kodesdmkakhir'];
            }
            $dataPg->pegawaiinputfk =  $datLogin['userData']['id'];
            $dataPg->save();

            $pegawai_id =$dataPg->id;


            if($request['idpegawai'] == '') {

                $idDK = DataKepegawaian::max('id') + 1;
                $dataDK = new DataKepegawaian();
                $dataDK->id = $idDK;
                $dataDK->kdprofile = 0;
                $dataDK->statusenabled = true;
                $dataDK->norec = $dataDK->generateNewId();
                $dataDK->pegawaifk = $pegawai_id;
            }else{
                $dataDK = DataKepegawaian::where('pegawaifk', $request['idpegawai'])->first();
                if(empty($dataDK)){
                    $idDK = DataKepegawaian::max('id') + 1;
                    $dataDK = new DataKepegawaian();
                    $dataDK->id = $idDK;
                    $dataDK->kdprofile = 0;
                    $dataDK->statusenabled = true;
                    $dataDK->norec = $dataDK->generateNewId(); 
                    $idDK = $dataDK->id;
                    $dataDK->pegawaifk = $pegawai_id;
                }           
            }

            if (isset( $request['idjabatan']) &&  $request['idjabatan']!="" &&  $request['idjabatan']!="undefined"){
                $dataDK->jabatan =  $request['jabatan'];
                $dataDK->jabatanfk =  $request['idjabatan'];
            }
            if (isset( $request['idstatuskepegawaian']) &&  $request['idstatuskepegawaian']!="" &&  $request['idstatuskepegawaian']!="undefined"){
                $dataDK->statuskepegawaian =  $request['statuskepegawaian'];
                $dataDK->statuskepegawaianfk =  $request['idstatuskepegawaian'];
            }
            if (isset( $request['tmtmenjadipns']) &&  $request['tmtmenjadipns']!="" &&  $request['tmtmenjadipns']!="undefined"){
                $dataDK->tmtmenjadipns =  $request['tmtmenjadipns'];
            }
            if (isset( $request['tmtmenjadicpns']) &&  $request['tmtmenjadicpns']!="" &&  $request['tmtmenjadicpns']!="undefined"){
                $dataDK->tmtmenjadicpns =  $request['tmtmenjadicpns'];
            }
            if (isset( $request['tanggalberakhirhonorer']) &&  $request['tanggalberakhirhonorer']!="" &&  $request['tanggalberakhirhonorer']!="undefined"){
                $dataDK->tanggalberakhirhonorer =  $request['tanggalberakhirhonorer'];
            }
            if (isset( $request['idjeniskepegawaian']) &&  $request['idjeniskepegawaian']!="" &&  $request['idjeniskepegawaian']!="undefined"){
                $dataDK->jeniskepegawaian =  $request['jeniskepegawaian'];
                $dataDK->jeniskepegawaianfk =  $request['idjeniskepegawaian'];
            }
            if (isset( $request['idgolonganterakhir']) &&  $request['idgolonganterakhir']!="" &&  $request['idgolonganterakhir']!="undefined"){
                $dataDK->golonganterakhir =  $request['golonganterakhir'];
                $dataDK->golonganterakhirfk =  $request['idgolonganterakhir'];
            }
            if (isset( $request['tmtgolongan']) &&  $request['tmtgolongan']!="" &&  $request['tmtgolongan']!="undefined"){
                $dataDK->tmtgolongan =  $request['tmtgolongan'];
            }
            if (isset( $request['masakerjagolonganthn']) &&  $request['masakerjagolonganthn']!="" &&  $request['masakerjagolonganthn']!="undefined"){
                $dataDK->masakerjagolonganthn =  $request['masakerjagolonganthn'];
            }
            if (isset( $request['masakerjagolonganbulan']) &&  $request['masakerjagolonganbulan']!="" &&  $request['masakerjagolonganbulan']!="undefined"){
                $dataDK->masakerjagolonganbulan =  $request['masakerjagolonganbulan'];
            }
            if (isset( $request['tglberakhirsip']) &&  $request['tglberakhirsip']!="" &&  $request['tglberakhirsip']!="undefined"){
                $dataDK->tglberakhirsip =  $request['tglberakhirsip'];
            }
            if (isset( $request['tglberakhirstr']) &&  $request['tglberakhirstr']!="" &&  $request['tglberakhirstr']!="undefined"){
                $dataDK->tglberakhirstr =  $request['tglberakhirstr'];
            }
            if (isset( $request['tglberakhirsik']) &&  $request['tglberakhirsik']!="" &&  $request['tglberakhirsik']!="undefined"){
                $dataDK->tglberakhirsik =  $request['tglberakhirsik'];
            }
            $dataDK->pegawaiinputfk =  $datLogin['userData']['id'];

            $dataDK->save();

            $transStatus = 'true';
        } catch (\Exception $e) {
            $error = $e->getMessage();
            $transStatus = 'false';
        }

        if ($transStatus == 'true') {
            $transMessage = "Sukses";
            DB::commit();
            $result = array(
                'status' => 201,
                'message' => $transMessage,
            );
        } else {
            $transMessage = "Simpan Gagal";
            DB::rollBack();
            $result = array(
                'status' => 400,
                'message'  => $transStatus,
                'error' => $error
            );
        }
        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    public function getDaftarPegawai( Request $request) {
        $data = \DB::table('pegawai_m as pg')
            ->leftjoin('datakepegawaian_m as dk','dk.pegawaifk','=','pg.id')
            ->leftjoin('loginuser_s as lu','lu.pegawaifk','=','pg.id')
            ->leftjoin('kelompokpegawai_m as kp','kp.id','=','dk.jabatanfk')
            ->select('pg.namalengkap as namapegawai','pg.id as idpegawai','lu.namauser','pg.nip', 'dk.jabatan','kp.kelompokpegawai'
            );

        if(isset($request['namapegawai']) && $request['namapegawai']!="" && $request['namapegawai']!="undefined") {
            $data = $data->where('pg.namalengkap', 'like', '%'. $request['namapegawai'] .'%');
        };

        $data = $data->where('pg.statusenabled',true);
        $data=$data->orderBy('pg.id','desc');
        $data=$data->take(20);
        $data=$data->get();
        
        return $this->respond($data);
    }

    public function saveNewUser (Request $request)
    {
        DB::beginTransaction();
        $error = "";
        try{
            if($request['id'] == ''){
                $user = LoginUser::where('namauser',$request['namauser'])->get();
                if( count($user)>0 ){
                    $transMessage = 'User sudah ada' ;
                    $result = array(
                        "status" => 400,
                        "message" => 'inhuman@epic'
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }
                $new = new LoginUser();
                $new->id = LoginUser::max('id') + 1;
                $new->kdprofile = 0;
                $new->statusenabled = true;
                $new->norec = $new->generateNewId();
            }else{
                $new = LoginUser::where('id', $request['id'])->first();
                $cekUser = LoginUser::where('namauser',$request['namauser'])
                    ->first();
                $sama = false ;        
                if(!empty($cekUser)){
                    if($cekUser->id != $request['id'] && $request['namauser'] == $cekUser->namauser ){
                        $sama = true;
                    }
                } 
                if($sama ==  true){
                    $result = array(
                        "status" => 400,
                        "as" => '#Inhuman'
                    );
                    return $this->setStatusCode($result['status'])->respond($result, 'Nama User sudah ada');
                }      

            }
            $new->namaexternal = $request['namauser'];
            $new->reportdisplay = $request['namauser'];
            $new->katasandi = $this->encryptSHA1($request['katasandi']);
            $new->kelompokuserfk = $request['idkelompokuser'];
            $new->namauser = $request['namauser'];
            $new->pegawaifk = $request['idpegawai'];
            $new->statuslogin = 0;
            $new->passcode = $this->encryptSHA1($request['katasandi']);
            $new->save();

            $transStatus = true;
        } catch (\Exception $e) {
            $error = $e->getMessage();
            $transStatus = false;
        }

        if ($transStatus == true) {
            $transMessage = "Sukses";
            DB::commit();
            $result = array(
                "status" => 201
            );
        } else {
            $transMessage = "Failed";
            DB::rollBack();
            $result = array(
                "status" => 400
            );
        }
        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    protected function encryptSHA1($pass)
    {
        return sha1($pass);
    }

    public function getDaftarUser( Request $request) {
        $data = \DB::table('loginuser_s as lu')
            ->leftjoin('pegawai_m as pg','lu.pegawaifk','=','pg.id')
            ->leftjoin('kelompokuser_m as ku','ku.id','=','lu.kelompokuserfk')
            ->select('pg.namalengkap as namapegawai','pg.id as idpegawai','lu.namauser','ku.kelompokuser'
            );

        if(isset($request['namapegawai']) && $request['namapegawai']!="" && $request['namapegawai']!="undefined") {
            $data = $data->where('pg.namalengkap', 'like', '%'. $request['namapegawai'] .'%');
        };
        if(isset($request['namauser']) && $request['namauser']!="" && $request['namauser']!="undefined") {
            $data = $data->where('lu.namauser', 'like', '%'. $request['namauser'] .'%');
        };
        if(isset($request['idpegawai']) && $request['idpegawai']!="" && $request['idpegawai']!="undefined") {
            $data = $data->where('pg.id', '=', $request['idpegawai']);
        };

        $data=$data->orderBy('pg.id','desc');
        $data=$data->take(20);
        $data=$data->get();
        
        return $this->respond($data);
    }

    public function getComboUser(Request $request){

        $kelompukuser = \DB::table('kelompokuser_m as dat')
            ->select('dat.id', 'dat.kelompokuser')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();


        $result = array(
            'kelompukuser' => $kelompukuser,
        );

        return $this->respond($result);
    }


}
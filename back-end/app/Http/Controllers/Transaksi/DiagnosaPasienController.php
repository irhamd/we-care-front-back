<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\DiagnosaPasien;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class DiagnosaPasienController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getPegawai(Request $request){
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

    
    public function getMasterDiagnosa(Request $request){
        $data = \DB::table('m_diagnosa as dat')
                ->select('dat.id', 'dat.kode','dat.diagnosa as namadiagnosa', DB::raw( " concat( dat.kode,' - ',dat.diagnosa ) as  diagnosa " ))
                ->where('dat.statusenabled', true);

        if(isset($request['diagnosa']) && $request['diagnosa']!="" && $request['diagnosa']!="undefined") {
            $data = $data->where('dat.diagnosa', 'like', '%'. $request['diagnosa'] .'%')
            ->orWhere('dat.kode', 'like', '%'. $request['diagnosa'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        // $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function saveDiagnosa(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['diagnosapasien'] as $item){
                $jasa = 0;
                $PelPasien = new DiagnosaPasien();
                $PelPasien->norec = $PelPasien->generateNewId();
                $PelPasien->kdprofile = 0;
                $PelPasien->statusenabled = true;
                $PelPasien->tgldiagnosa =  date('Y-m-d H:i:s');
                $PelPasien->antrianpasiendiperiksafk =  $item['norec_apd'];
                $PelPasien->diagnosa =  $item['diagnosa'];
                $PelPasien->kodediagnosa =  $item['kodediagnosa'];
                $PelPasien->keterangan =  $item['keterangan'];
                $PelPasien->pegawaidiagnosafk =  $item['idpegawaidiagnosa'];
                $PelPasien->jenisdiagnosafk =  $jasa+$item['idjenisdiagnosa'];
                $PelPasien->statuskasuspenyakit =  $item['statuskasuspenyakit'];
                if (isset($item['idparamedis']) && $item['idparamedis']!="" && $item['idparamedis']!="undefined"){
                    $PelPasien->paramedisfk = $item['idparamedis'];
                }
                $PelPasien->pegawaiinputfk =  $dataLogin['userData']['id'];
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

    public function getDaftarDiagnosaPasien(Request $request)
    {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('diagnosapasien_t as dp','dp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('jenisdiagnosa_m as jd','jd.id','=','dp.jenisdiagnosafk')
            ->join('pegawai_m as pg','pg.id','=','dp.pegawaidiagnosafk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->select('ps.id as nocmfk','pd.norec as norec_pd','apd.norec as norec_apd','dp.tgldiagnosa','pg.namalengkap as pegawaidiagnosa','ru.ruangan', 'pd.noregistrasi','dp.norec as dorec_diag', 'dp.diagnosa','dp.kodediagnosa','dp.keterangan','jd.jenisdiagnosa','dp.statuskasuspenyakit'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi']);

        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };

        $data=$data->orderBy('dp.tgldiagnosa','asc');
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function deleteDiagnosaPasien(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['diagnosapasien'] as $item){
                DiagnosaPasien::where('norec',$item)->delete();
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
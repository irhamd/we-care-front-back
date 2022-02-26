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

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class TindakanPasienController extends ApiController
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
        // $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getProduk(Request $request){
        $data = \DB::table('produk_m as dat')
                ->leftjoin('harganettoproduk_m as hn','hn.produkfk','=','dat.id')
                ->select('dat.id', 'dat.produk', 'hn.jenispelayananfk', 'hn.hargasatuan')
                ->where('dat.statusenabled', true);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function saveTindakan(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['pelayananpasien'] as $item){
                $jasa = 0;
                $PelPasien = new PelayananPasien();
                $PelPasien->norec = $PelPasien->generateNewId();
                $PelPasien->kdprofile = 0;
                $PelPasien->statusenabled = true;
                $PelPasien->tglpelayanan =  $item['tglpelayanan'];
                $PelPasien->antrianpasiendiperiksafk =  $item['norec_apd'];
                $PelPasien->produkfk =  $item['produkfk'];
                $PelPasien->jumlah =  $item['jumlah'];
                $PelPasien->hargasatuan =  $item['hargasatuan'];
                $PelPasien->hargatotal =  $item['hargatotal'];
                $PelPasien->jasa =  $jasa;
                $PelPasien->hargatotaljasa =  $jasa+$item['hargatotal'];
                // $PelPasien->jenispelayananfk =  $item['jenispelayananfk'];
                $PelPasien->pegawaipelaksanafk =  $item['idpelaksana'];
                if (isset($item['idparamedis']) && $item['idparamedis']!="" && $item['idparamedis']!="undefined"){
                    $PelPasien->paramedisfk = $item['idparamedis'];
                }
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
	
    public function getTindakanPasien(Request $request)
    {
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('pelayananpasien_t as pp', 'pp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('produk_m as pr','pr.id','=','pp.produkfk')
            ->leftjoin('pegawai_m as pg','pg.id','=','pp.pegawaipelaksanafk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->select('ps.id as nocmfk','pd.norec as norec_pd','apd.norec as norec_apd','pp.tglpelayanan','pr.produk','pg.namalengkap as pelaksana','ru.ruangan','pp.jumlah','pp.hargasatuan', 'pp.jasa','pp.hargatotaljasa', 'pd.noregistrasi','pp.norec as norec_pp'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi']);

        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };

        $data=$data->orderBy('pp.tglpelayanan','asc');
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function deleteTindakanPasien(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['pelayananpasien'] as $item){
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
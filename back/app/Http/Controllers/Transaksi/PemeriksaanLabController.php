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

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class PemeriksaanLabController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    function saveBlankoLab(Request $request){
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            if($request['norec_bl']==''){

                $noblankolab = $this->generateCodeBySeqTable(new BlankoLabPasien, 'noblankolab', 15, 'BL' . date('ym') . '');

                if ($noblankolab == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                $BlankoLab = new BlankoLabPasien();
                $BlankoLab->norec = $BlankoLab->generateNewId();
                $BlankoLab->kdprofile = 0;
                $BlankoLab->statusenabled = true;
                $BlankoLab->antrianpasiendiperiksafk = $request['norec_apd'];
                $BlankoLab->noblankolab = $noblankolab;
                $BlankoLab->tglblanko = date('Y-m-d H:i:s');
                $BlankoLab->ruanganfk = 20;
                $BlankoLab->pegawaifk = $request['idpegawai'];
              
                // $BlankoLab->save();
            }else{
                $BlankoLab =  BlankoLabPasien::where('norec',$request['norec_bl'])->first();
            }
            
            $BlankoLab->pegawaiinputfk =  $dataLogin['userData']['id'];
            if (isset($request['statusprioritas']) && $request['statusprioritas']!="" && $request['statusprioritas']!="undefined"){
                $BlankoLab->statusprioritas = $request['statusprioritas'];
            }
            if (isset($request['saran']) && $request['saran']!="" && $request['saran']!="undefined"){
                $BlankoLab->saran = $request['saran'];
            }
            $BlankoLab->save();

            $norec_RP = $BlankoLab->norec;

            BlankoLabPasienDetail::where('blankolabpasienfk','=',$norec_RP)->update(['statusenabled'=> false]);

            foreach ($request['detail'] as $item){
                $jasa=0;
                $RPD = new BlankoLabPasienDetail();
                $RPD->norec = $RPD->generateNewId();
                $RPD->kdprofile = 0;
                $RPD->statusenabled = true;
                $RPD->blankolabpasienfk =  $norec_RP;
                $RPD->produkfk =  $item['idproduk'];
                $RPD->jumlah =  $item['jumlah'];
                $RPD->hargasatuan =  $item['hargasatuan'];
                $RPD->hargatotal =  $item['hargatotal'];
                $RPD->jasa =  $jasa;
                $RPD->hargatotaljasa =  $jasa+$item['hargatotal'];

                $RPD->pegawaiinputfk =  $dataLogin['userData']['id'];
                $RPD->save();

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

     public function getBlankoLab(Request $request)
     {
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('blankolabpasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','rp.pegawaifk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','rp.ruanganfk')
            ->select('pg.namalengkap as pegawai','pg.id as idpegawai','rp.saran','apd.norec as norec_apd', 'rp.norec as norec_bl','rp.statusprioritas', 'rp.noblankolab','rp.tglblanko','ru.id as idruanganblanko','ru.ruangan'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('rp.statusenabled', true)
            ->first();

        $detail = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('blankolabpasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('blankolabpasiendetail_t as rpd','rpd.blankolabpasienfk','=','rp.norec')
            ->join('produk_m as pr','pr.id','=','rpd.produkfk')
            ->select('rpd.norec as norec_bld', 'pr.id as idproduk','pr.produk','rpd.jumlah','rpd.keterangan','rpd.hargasatuan','rpd.hargatotal','rpd.jasa','rpd.hargatotaljasa'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('rp.statusenabled', true)
            ->where('rpd.statusenabled', true)
            ->get();

        $head->details = $detail;

        return $this->respond($head);


     }


    public function getProdukBlankoLab(Request $request){
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

    public function deleteItemBlankoLab(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['nerec_items_bld'] as $item){
                BlankoLabPasienDetail::query()
                ->where('norec',$item)
                ->each(function ($oldRecord){
                    $newRecord = $oldRecord->replicate();
                    $newRecord->pegawaideletefk = $GLOBALS['userId'];
                    $newRecord->setTable('blankolabpasiendetaildelete_t');
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
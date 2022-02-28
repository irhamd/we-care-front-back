<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\ResepPasien;
use App\Transaksi\ResepPasienDetail;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class ResepPasienController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    function saveResepPasien(Request $request){
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            if($request['norec_rp']==''){

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

                $ResepPas = new ResepPasien();
                $ResepPas->norec = $ResepPas->generateNewId();
                $ResepPas->kdprofile = 0;
                $ResepPas->statusenabled = true;
                $ResepPas->antrianpasiendiperiksafk = $request['norec_apd'];
                $ResepPas->noresep = $noresep;
                $ResepPas->tglresep = date('Y-m-d H:i:s');
                $ResepPas->ruanganfk = $request['idruanganresep'];
                $ResepPas->pegawaifk = $request['idpegawai'];
                if (isset($request['idasisten']) && $request['idasisten']!="" && $request['idasisten']!="undefined"){
                    $ResepPas->asistenfk = $request['idasisten'];
                }
                if (isset($request['alergiobat']) && $request['alergiobat']!="" && $request['alergiobat']!="undefined"){
                    $ResepPas->alergiobat = $request['alergiobat'];
                }
                if (isset($request['statusprioritas']) && $request['statusprioritas']!="" && $request['statusprioritas']!="undefined"){
                    $ResepPas->statusprioritas = $request['statusprioritas'];
                }
                $ResepPas->pegawaiinputfk =  $dataLogin['userData']['id'];
                $ResepPas->save();
            }else{
                $ResepPas =  ResepPasien::where('norec',$request['norec_rp'])->first();
            }

            $norec_RP = $ResepPas->norec;


            foreach ($request['detail'] as $item){
                $jasa=0;
                $RPD = new ResepPasienDetail();
                $RPD->norec = $RPD->generateNewId();
                $RPD->kdprofile = 0;
                $RPD->statusenabled = true;
                $RPD->reseppasienfk =  $norec_RP;
                // $RPD->jeniskemasanfk =  $item['idjeniskemasan'];
                // if (isset($item['racikanke']) && $item['racikanke']!="" && $item['racikanke']!="undefined"){
                //     $RPD->racikanke = $item['racikanke'];
                // }
                // if (isset($item['dosisracikan']) && $item['dosisracikan']!="" && $item['dosisracikan']!="undefined"){
                //     $RPD->dosisracikan = $item['dosisracikan'];
                // }
                $RPD->produkfk =  $item['idproduk'];
                $RPD->jumlah =  $item['jumlah'];
                $RPD->caraminum =  $item['caraminum'];
                $RPD->signa =  $item['signa'];
                $RPD->aturanpakaifk =  $item['idaturanpakai'];
                // $RPD->keterangan =  $item['keterangan'] ? $item['keterangan'] :"0";
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

     public function getResepPasien(Request $request)
     {
        $head = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','rp.pegawaifk')
            ->leftjoin('pegawai_m as pg2','pg2.id','=','rp.asistenfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','rp.ruanganfk')
            ->select('pg.namalengkap as pegawai','pg.id as idpegawai', 'apd.norec as norec_apd', 'rp.norec as norec_rp', 'rp.alergiobat','rp.statusprioritas', 'rp.noresep','rp.tglresep','ru.id as idruanganresep','ru.ruangan','pg2.id as idasisten','pg2.namalengkap as asisten'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('rp.statusenabled', true)
            ->first();

        $detail = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('reseppasiendetail_t as rpd','rpd.reseppasienfk','=','rp.norec')
            ->join('produk_m as pr','pr.id','=','rpd.produkfk')
            ->leftjoin('aturanpakai_m as ap','ap.id','=','rpd.aturanpakaifk')
            ->leftjoin('jeniskemasan_m as jk','jk.id','=','rpd.jeniskemasanfk')
            ->select('rpd.norec as norec_rpd','rpd.caraminum', 'rpd.jeniskemasanfk as idjeniskemasan','rpd.racikanke','rpd.dosisracikan', 'pr.id as idproduk','pr.produk','rpd.jumlah','rpd.signa','jk.jeniskemasan','ap.id as idaturanpakai','ap.aturanpakai' , 'rpd.keterangan','rpd.hargasatuan','rpd.hargatotal','rpd.jasa','rpd.hargatotaljasa'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('rp.statusenabled', true)
            ->get();

        $head->details = $detail;

        return $this->respond($head);


     }

     public function getComboResep(Request $request){
        
        $listRuangan = \DB::table('ruangan_m as dat')
            ->select('dat.id', 'dat.ruangan')
            ->where('dat.statusenabled', true)
            ->where('dat.instalasifk',4)
            ->orderBy('dat.id')
            ->get();

        $aturanpakai = \DB::table('aturanpakai_m as dat')
            ->select('dat.id', 'dat.aturanpakai')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $jeniskemasan = \DB::table('jeniskemasan_m as dat')
            ->select('dat.id', 'dat.jeniskemasan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();


        $result = array(
            'ruangan' => $listRuangan,
            'aturanpakai' => $aturanpakai,
            'jeniskemasan' => $jeniskemasan,
        );

        return $this->respond($result);
    }


    public function getProdukResepPart(Request $request){
        $data = \DB::table('produk_m as dat')
            ->join('harganettoproduk_m as hn', 'hn.produkfk','=','dat.id')
            ->join('stokproduk_t as st', 'st.produkfk','=','dat.id')
            ->select('dat.id', 'dat.produk','hn.hargasatuan')
            ->where('dat.statusenabled', true)
            ->where('dat.jenisprodukfk',2);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['nama'] .'%');
        };

        $data =$data->take(10);
        $data =$data->orderBy('dat.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    public function getAllObat(Request $request){
        $data = \DB::table('produk_m as dat')
            ->join('harganettoproduk_m as hn', 'hn.produkfk','=','dat.id')
            ->select('dat.id', 'dat.produk','hn.hargasatuan')
            ->where('dat.statusenabled', true)
            ->where('dat.jenisprodukfk',2);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['nama'] .'%');
        };

        // $data =$data->take(10);
        $data =$data->orderBy('dat.id');
        $data =$data->get();

        return $this->respond($data);
            
    }

    public function deleteItemResep(Request $request)
    {
        $dataLogin =$request->all();
        $GLOBALS['userId'] = $dataLogin['userData']['id'];

        DB::beginTransaction();
        $error='';

        try {

            foreach ($request['nerec_items_rpd'] as $item){
                ResepPasienDetail::query()
                ->where('norec',$item)
                ->each(function ($oldRecord){
                    $newRecord = $oldRecord->replicate();
                    $newRecord->pegawaideletefk = $GLOBALS['userId'];
                    $newRecord->setTable('reseppasiendetaildelete_t');
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
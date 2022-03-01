<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;
use App\Master\AlamatPasien;
use App\Master\DomisiliPasien;
use App\Traits\Valet;


use DB;

class KartuPasienController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }


    public function getKartuPasien(Request $req)
    {
        $query = "SELECT aat.*, apt.*, pd.statusenabled, pd.tglregistrasi,  apd.norec as noreg_apd , pd.noregistrasi  ,ps.namapasien , ps.nocm  
        from pasiendaftar_t as pd 
        join antrianpasiendiperiksa_t as apd on apd.pasiendaftarfk  = pd.norec 
          left join an_anamnesahead_t as anh on anh.antrianpasiendiperiksafk  = apd.norec 
          left join an_anamnesa_t as aat on aat.an_anamnesaheadfk = anh.norec
          left join an_pemeriksaanfisik_t as apt on apt.an_anamnesaheadfk = anh.norec
          join pasien_m as ps on ps.id = pd.pasienfk 
        WHERE  pd.pasienfk  = $req->nocmfk";

       $data = DB::select($query);

       foreach ($data as $key => $value) {
        //    $resep = DB::select("SELECT pm.produk , rt.* , am.aturanpakai , sm.satuan From reseppasien_t as resp
        //                 join reseppasiendetail_t as rt on rt.reseppasienfk  = resp.norec 
        //                 join produk_m as pm on pm.id = rt.produkfk 
        //                 join satuan_m as sm on sm.id  = pm.satuanfk
        //                 left join aturanpakai_m am on am.id = rt.aturanpakaifk
        //                 WHERE resp.antrianpasiendiperiksafk  = '$value->noreg_apd'");

            $dataresep = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('strukresep_t as sp', 'sp.antrianpasiendiperiksafk','=','apd.norec')
            ->join('pelayananpasien_t as pp', 'pp.strukresepfk','=','sp.norec')
            ->join('produk_m as pr', 'pr.id','=','pp.produkfk')
            ->join('satuan_m as st', 'st.id','=','pr.satuanfk')
            // ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            // ->leftjoin('ruangan_m as ru2', 'ru2.id','=','sp.ruanganfk')
            // ->leftjoin('pegawai_m as pg', 'pg.id','=','sp.penulisresepfk')
            ->select('pr.produk', 'pp.jumlah', 'st.satuan')
            ->where('apd.norec',$value->noreg_apd)
            ->wherenotNull('pp.strukresepfk')
            ->get();

           $diagnosa = DB::select("SELECT  dt.diagnosa, dt.keterangan From diagnosapasien_t as dt
                WHERE dt.antrianpasiendiperiksafk = '$value->noreg_apd'");

        //    $data[$key]->resep = $resep; 
           $data[$key]->diagnosa = $diagnosa; 
           $data[$key]->dataresep = $dataresep; 
       }

       return $this->respond($data);


    }

	 
    
	
}
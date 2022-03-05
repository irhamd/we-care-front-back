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

class PasienBaruController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

	public function getDataCombo(Request $request){
		
		$dataKelompok = \DB::table('kelompokpasien_m as kp')
            ->select('kp.id', 'kp.kelompokpasien')
            ->where('kp.statusenabled', true)
            ->orderBy('kp.id')
            ->get();

        $dataAgama = \DB::table('agama_m as ag')
            ->select('ag.id', 'ag.agama')
            ->where('ag.statusenabled', true)
            ->orderBy('ag.id')
            ->get();

        $dataPendidikan = \DB::table('pendidikan_m as pdd')
            ->select('pdd.id', 'pdd.pendidikan')
            ->where('pdd.statusenabled', true)
            ->orderBy('pdd.id')
            ->get();

        $dataStatusPerkawinan = \DB::table('statusperkawinan_m as sp')
            ->select('sp.id', 'sp.statusperkawinan')
            ->where('sp.statusenabled', true)
            ->orderBy('sp.id')
            ->get();

        $dataKebangsaan = \DB::table('kebangsaan_m as kb')
            ->select('kb.id', 'kb.name')
            ->where('kb.statusenabled', true)
            ->orderBy('kb.id')
            ->get();

        $dataGolonganDarah = \DB::table('golongandarah_m as gd')
            ->select('gd.id', 'gd.golongandarah')
            ->where('gd.statusenabled', true)
            ->orderBy('gd.id')
            ->get();

        $dataPenjamin = \DB::table('penjamin_m as pj')
            ->select('pj.id', 'pj.penjamin')
            ->where('pj.statusenabled', true)
            ->orderBy('pj.id')
            ->get();

        $dataPekerjaan = \DB::table('pekerjaan_m as dat')
            ->select('dat.id', 'dat.pekerjaan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $dataStatusKeluarga = \DB::table('statuskeluarga_m as dat')
            ->select('dat.id', 'dat.statuskeluarga')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $jenispasien = \DB::table('m_jenispasien as dat')
            ->select('dat.id', 'dat.jenispasien')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();
        $pangkat = \DB::table('pangkat_m as dat')
            ->select('dat.id', 'dat.pangkat')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

	    $result = array(
	    	'kelompokpasien' => $dataKelompok,
	    	'agama' => $dataAgama,
	    	'pendidikan' => $dataPendidikan,
	    	'statusperkawinan' => $dataStatusPerkawinan,
	    	'warganegara' => $dataKebangsaan,
            'golongandarah' => $dataGolonganDarah,
            'penjamin' => $dataPenjamin,
            'pekerjaan' => $dataPekerjaan,
            'jenispasien' => $jenispasien,
            'pangkat' => $pangkat,
            'statuskeluarga' => $dataStatusKeluarga,
	    );

	    return $this->respond($result);
	}

    public function getPropinsi(Request $request){
        $data = \DB::table('propinsi_m as dat')
                ->select('dat.id', 'dat.propinsi')
                ->where('dat.statusenabled', true);

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.propinsi', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getKotaKab(Request $request){
        $data = \DB::table('kotakabupaten_m as dat')
            ->select('dat.id', 'dat.kotakabupaten')
            ->where('dat.statusenabled', true);

        if(isset($request['idpropinsi']) && $request['idpropinsi']!="" && $request['idpropinsi']!="undefined") {
            $data = $data->where('dat.propinsifk','=', $request['idpropinsi']);
        };
        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.kotakabupaten', 'like', '%'. $request['nama'] .'%');
        };

        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

    public function getKecamatan(Request $request){
        $data = \DB::table('kecamatan_m as dat')
            ->select('dat.id', 'dat.kecamatan')
            ->where('dat.statusenabled', true);

        if(isset($request['idpropinsi']) && $request['idpropinsi']!="" && $request['idpropinsi']!="undefined") {
            $data = $data->where('dat.propinsifk','=', $request['idpropinsi']);
        };
        if(isset($request['idkotakabupaten']) && $request['idkotakabupaten']!="" && $request['idkotakabupaten']!="undefined") {
            $data = $data->where('dat.kotakabupatenfk','=', $request['idkotakabupaten']);
        };
        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.kecamatan', 'like', '%'. $request['nama'] .'%');
        };
        
        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }
    public function getDesa(Request $request){
        $data = \DB::table('desakelurahan_m as dat')
            ->select('dat.id', 'dat.desakelurahan')
            ->where('dat.statusenabled', true);

        if(isset($request['idpropinsi']) && $request['idpropinsi']!="" && $request['idpropinsi']!="undefined") {
            $data = $data->where('dat.propinsifk','=', $request['idpropinsi']);
        };
        if(isset($request['idkotakabupaten']) && $request['idkotakabupaten']!="" && $request['idkotakabupaten']!="undefined") {
            $data = $data->where('dat.kotakabupatenfk','=', $request['idkotakabupaten']);
        };
        if(isset($request['idkecamatan']) && $request['idkecamatan']!="" && $request['idkecamatan']!="undefined") {
            $data = $data->where('dat.kecamatanfk','=', $request['idkecamatan']);
        };

        if(isset($request['nama']) && $request['nama']!="" && $request['nama']!="undefined") {
            $data = $data->where('dat.desakelurahan', 'like', '%'. $request['nama'] .'%');
        };

        $data = $data ->orderBy('dat.id');
        $data = $data ->take(10);
        $data = $data ->get();

        return $this->respond($data);
    }

	public function getDaftarPasien( Request $request) {
        $data = \DB::table('pasien_m as ps')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('pangkat_m as pt','pt.id','=','ps.pangkatfk')
            ->select('ps.nocm','ps.namapasien','ps.tgldaftar', 'ps.tgllahir','ps.foto','ps.nrp','ps.nip','pt.pangkat',
                'ps.jeniskelamin','ps.noidentitas', 'ps.id as nocmfk','ps.namaayah','ps.notelepon','ps.nohp',
                'ps.tglmeninggal','ps.alergi','ps.isriwayatmenular','al.alamat','al.desakelurahan', 'ps.tempatlahir'
            );

        if(isset($request['nocm']) && $request['nocm']!="" && $request['nocm']!="undefined") {
            $data = $data->where('ps.nocm', 'like', '%'. $request['nocm'] .'%');
        };

        if(isset($request['namapasien']) && $request['namapasien']!="" && $request['namapasien']!="undefined") {
            $data = $data->where('ps.namapasien', 'like', '%'. $request['namapasien'] .'%');
        };

        if(isset($request['nip']) && $request['nip']!="" && $request['nip']!="undefined") {
            $data = $data->where('ps.nip', 'like', '%'. $request['nip'] .'%');
        };

        if(isset($request['nrp']) && $request['nrp']!="" && $request['nrp']!="undefined") {
            $data = $data->where('ps.nrp', 'like', '%'. $request['nrp'] .'%');
        };

        $data = $data->where('ps.statusenabled',true);
        $data=$data->orderBy('ps.id','desc');
        $data=$data->take(20);
        $data=$data->get();
        $result = array(
            'daftar' => $data,
        );
        return $this->respond($result);
    }

    public function savePasien(Request $request) {
        $detLogin =$request->all();
        DB::beginTransaction();
        try{
            if($request['pasien']['idpasien'] == '') {
                $newId = Pasien::max('id') + 1;

                // $runningNumber = RunningNumber::where('id',1745)->first();
                // $extension = $runningNumber->extention;
                // $noCmTerakhir = $runningNumber->nomer_terbaru +1;
                // $noCm = $extension.$noCmTerakhir;

                // $updateRN= RunningNumber::where('id', 1745)
                // ->update([
                //         'nomer_terbaru' => $noCmTerakhir
                //     ]
                // );

                $noCm = $this->generateCode(new Pasien, 'nocm', 9,'');
                // return $noCm;

                $dataPS = new Pasien();
                $dataPS->id = $newId;
                $dataPS->kdprofile = 0;
                $dataPS->statusenabled = true;
                $dataPS->kodeexternal = $newId;
                $dataPS->norec =  $dataPS->generateNewId();

            }else{
                $dataPS = Pasien::where('id',$request['pasien']['idpasien'])->first();
                $noCm = $dataPS->nocm;
                $newId = $dataPS->id;
            }

            $dt = date('Y-m-d',strtotime($request['pasien']['tgllahir']));

            $dataPS->namaexternal =  $request['pasien']['namapasien'];
            $dataPS->namapasien =  $request['pasien']['namapasien'];
            $dataPS->reportdisplay =  $request['pasien']['namapasien'];
            // $dataPS->penjamin =  $request['pasien']['penjamin']['penjamin'];
            // $dataPS->penjaminfk =  $request['pasien']['penjamin']['id'];
            // $dataPS->penjaminfk =  $request['pasien']['penjamin']['id'];
            $dataPS->noidentitas =  $request['pasien']['noidentitas'];
            // $dataPS->nokk =  $request['pasien']['nokk'];
            // $dataPS->noktp =  $request['pasien']['noktp'];
            $dataPS->nobpjs =  $request['pasien']['nobpjs'];
            $dataPS->foto =  $request['fotoPasien'];
            // $dataPS->jeniskelamin =  $request['pasien']['jeniskelamin']['jeniskelamin'];
            $dataPS->jeniskelamin =  $request['pasien']['jeniskelamin'];
            $dataPS->tgllahir =  $dt;
            $dataPS->tempatlahir =  $request['pasien']['tempatlahir'];
            if (isset( $request['pasien']['nocmlama']) &&  $request['pasien']['nocmlama']!="" &&  $request['pasien']['nocmlama']!="undefined"){
                $dataPS->nocmlama =  $request['pasien']['nocmlama'];
            }
            if (isset( $request['pasien']['golongandarah']['golongandarah']) &&  $request['pasien']['golongandarah']['golongandarah']!="" &&  $request['pasien']['golongandarah']['golongandarah']!="undefined"){
                $dataPS->golongandarah =  $request['pasien']['golongandarah']['golongandarah'];
                $dataPS->golongandarahfk =  $request['pasien']['golongandarah']['id'];
            }

            if (isset( $request['pasien']['nip']) &&  $request['pasien']['nip']!="" &&  $request['pasien']['nip']!="undefined"){
                $dataPS->nip =  $request['pasien']['nip'];
            }
            $dataPS->nohp =  $request['pasien']['nohp'];
            $dataPS->pekerjaan =  $request['pasien']['pekerjaan']['pekerjaan'];
            $dataPS->pekerjaanfk =  $request['pasien']['pekerjaan']['id'];

            if (isset( $request['pasien']['instansipekerjaan']) &&  $request['pasien']['instansipekerjaan']!="" &&  $request['pasien']['instansipekerjaan']!="undefined"){
                $dataPS->instansipekerjaan =  $request['pasien']['instansipekerjaan'];
            }
            $dataPS->agama =  $request['pasien']['agama']['agama'];
            $dataPS->agamafk =  $request['pasien']['agama']['id'];
            $dataPS->pendidikan =  $request['pasien']['pendidikan']['pendidikan'];
            $dataPS->pendidikanfk =  $request['pasien']['pendidikan']['id'];
            $dataPS->statusperkawinan =  $request['pasien']['statusperkawinan']['statusperkawinan'];
            $dataPS->statusperkawinanfk =  $request['pasien']['statusperkawinan']['id'];
            $dataPS->statuskeluarga =  $request['pasien']['statuskeluarga']['statuskeluarga'];
            $dataPS->statuskeluargafk =  $request['pasien']['statuskeluarga']['id'];
            $dataPS->pangkatfk =  $request['pasien']['pangkat']['id'];
            $dataPS->kebangsaan =  $request['pasien']['kebangsaan']['kebangsaan'];
            $dataPS->kebangsaanfk =  $request['pasien']['kebangsaan']['id'];
            if (isset( $request['pasien']['nrp']) &&  $request['pasien']['nrp']!="" &&  $request['pasien']['nrp']!="undefined"){
                $dataPS->nrp =  $request['pasien']['nrp'];
            }
            if (isset( $request['pasien']['namaayah']) &&  $request['pasien']['namaayah']!="" &&  $request['pasien']['namaayah']!="undefined"){
                $dataPS->namaayah =  $request['pasien']['namaayah'];
            }
            if (isset( $request['pasien']['namaibu']) &&  $request['pasien']['namaibu']!="" &&  $request['pasien']['namaibu']!="undefined"){
                $dataPS->namaibu =  $request['pasien']['namaibu'];
            }
            if (isset( $request['pasien']['id_jenispasien']) &&  $request['pasien']['id_jenispasien']!="" &&  $request['pasien']['id_jenispasien']!="undefined"){
                $dataPS->id_jenispasien =  $request['pasien']['id_jenispasien']['id'];
            }
            $dataPS->tgldaftar =  date('Y-m-d H:i:s');
            $dataPS->nocm = $noCm;
            $dataPS->save();

            $dataNoCMFk =$dataPS->id;

            

//            $transStatus = 'true';
//        } catch (\Exception $e) {
            // $transStatus = 'false';
//            $transMessage = "simpan Pasien Baru";
//        }


            if($request['pasien']['idpasien'] == '') {

                $idAlamat = AlamatPasien::max('id') + 1;
                $dataAL = new AlamatPasien();
                $dataAL->id = $idAlamat;
                $dataAL->kdprofile = 0;
                $dataAL->statusenabled = true;
                $dataAL->kodeexternal = $idAlamat;
                $dataAL->norec = $dataAL->generateNewId();
                $dataAL->pasienfk = $dataNoCMFk;
            }else{
                $dataAL = AlamatPasien::where('pasienfk', $request['pasien']['idpasien'])->first();
                if(empty($dataAL)){
                    $idAlamat = AlamatPasien::max('id') + 1;
                    $dataAL = new AlamatPasien();
                    $dataAL->id = $idAlamat;
                    $dataAL->kdprofile = 0;
                    $dataAL->statusenabled = true;
                    $dataAL->kodeexternal = $idAlamat;
                    $dataAL->norec = $dataAL->generateNewId(); 
                    $idAlamat = $dataAL->id;
                    $dataAL->pasienfk = $dataNoCMFk;
                }           
            }

            $dataAL->propinsi =  $request['alamat']['propinsi']['propinsi'];
            $dataAL->propinsifk =  $request['alamat']['propinsi']['id'];
            $dataAL->kotakabupaten =  $request['alamat']['kotakabupaten']['kotakabupaten'];
            $dataAL->kotakabupatenfk =  $request['alamat']['kotakabupaten']['id'];
            $dataAL->kecamatan =  $request['alamat']['kecamatan']['kecamatan'];
            $dataAL->kecamatanfk =  $request['alamat']['kecamatan']['id'];
            $dataAL->desakelurahan =  $request['alamat']['desakelurahan']['desakelurahan'];
            $dataAL->desakelurahanfk =  $request['alamat']['desakelurahan']['id'];
            if (isset( $request['alamat']['dusun']) &&  $request['alamat']['dusun']!="" &&  $request['alamat']['dusun']!="undefined"){
                $dataPS->dusun =  $request['alamat']['dusun'];
            }
            $dataAL->alamat =  $request['alamat']['alamat'];
            $dataAL->rt =  $request['alamat']['rt'] ? $request['alamat']['rt'] :"0";
            $dataAL->rw =  $request['alamat']['rw'] ? $request['alamat']['rw'] :"0";
            $dataAL->save();

            if($request['pasien']['idpasien'] == '') {

                $newIDDomain = DomisiliPasien::max('id') + 1;
                $dataDOM = new DomisiliPasien();
                $dataDOM->id = $newIDDomain;
                $dataDOM->kdprofile = 0;
                $dataDOM->statusenabled = true;
                $dataDOM->kodeexternal = $newIDDomain;
                $dataDOM->norec = $dataDOM->generateNewId();
                $dataDOM->pasienfk = $dataNoCMFk;
            }else{
                $dataDOM = DomisiliPasien::where('pasienfk', $request['pasien']['idpasien'])->first();
                if(empty($dataDOM)){
                    $newIDDomain = DomisiliPasien::max('id') + 1;
                    $dataDOM->id = $newIDDomain;
                    $dataDOM->kdprofile = 0;
                    $dataDOM->statusenabled = true;
                    $dataDOM->kodeexternal = $newIDDomain;
                    $dataDOM->norec = $dataDOM->generateNewId();
                    $dataDOM->pasienfk = $dataNoCMFk;
                }          
            }

            $dataDOM->propinsi =  $request['domisili']['propinsi']['propinsi'];
            $dataDOM->propinsifk =  $request['domisili']['propinsi']['id'];
            $dataDOM->kotakabupaten =  $request['domisili']['kotakabupaten']['kotakabupaten'];
            $dataDOM->kotakabupatenfk =  $request['domisili']['kotakabupaten']['id'];
            $dataAL->kecamatan =  $request['alamat']['kecamatan']['kecamatan'];
            $dataAL->kecamatanfk =  $request['alamat']['kecamatan']['id'];
            $dataDOM->desakelurahan =  $request['domisili']['desakelurahan']['desakelurahan'];
            $dataDOM->desakelurahanfk =  $request['domisili']['desakelurahan']['id'];
            $dataDOM->dusun =  $request['domisili']['dusun'];
            $dataDOM->domisili =  $request['domisili']['alamat'];
            $dataDOM->rt =  $request['domisili']['rt'];
            $dataDOM->rw =  $request['domisili']['rw'];
            $dataDOM->save();

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
                'data' => $dataPS,
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

    public function getDetailPasien( Request $request) {
        $data = \DB::table('pasien_m as ps')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->select('ps.id as nocmfk','ps.nocm','ps.namapasien', 'ps.penjamin','ps.nopenjamin','ps.nokk','ps.noktp','ps.jeniskelamin','ps.tempatlahir','ps.tgllahir',DB::raw('CONCAT(ps.tempatlahir,"/",ps.tgllahir) as ttl'),'ps.golongandarah','ps.email','ps.nohp','al.propinsi','al.kotakabupaten','al.kecamatan','al.desakelurahan','al.dusun','al.alamat','al.rt','al.rw','ps.pekerjaan','ps.instansipekerjaan','ps.agama','ps.pendidikan','ps.statusperkawinan','ps.statuskeluarga','ps.kebangsaan','ps.namaayah','ps.namaibu','ps.created_at','ps.updated_at','ps.foto'
            )
            ->where('ps.id',$request['nocmfk'])
            ->first();

        return $this->respond($data);
    }

    public function getRiwayatPendaftaranPasien( Request $request) {

        $data = \DB::table('pasiendaftar_t as pd')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->join('ruangan_m as ru','ru.id','=','pd.ruanganakhirfk')
            ->select('ps.id as nocmfk','ps.nocm','ps.namapasien', 'pd.noregistrasi','pd.tglregistrasi','pd.norec as norec_pd', 'ru.ruangan'
            )
            ->where('ps.id',$request['nocmfk'])
            ->where('pd.statusenabled', true)
            ->orderBy('pd.tglregistrasi','desc')
            ->take(10)
            ->get();

        return $this->respond($data);
    }

    public function getDetailRiwayatPendaftaran( Request $request) {

        $diagnosa = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->leftjoin('diagnosapasien_t as dp','dp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('jenisdiagnosa_m as jd','jd.id','=','dp.jenisdiagnosafk')
            ->leftjoin('pegawai_m as pg','pg.id','=','dp.pegawaidiagnosafk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','apd.ruanganfk')
            ->select('dp.tgldiagnosa','pg.namalengkap as pegawaidiagnosa','ru.ruangan', 'pd.noregistrasi','dp.norec as dorec_diag', 'dp.diagnosa','dp.kodediagnosa','jd.jenisdiagnosa','dp.statuskasuspenyakit'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->orderBy('dp.tgldiagnosa','asc')
            ->get();

        $headresep = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','rp.pegawaifk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','rp.ruanganfk')
            ->select('pg.namalengkap as penulisresep','pg.id as idpenulisresep', 'apd.norec as norec_apd', 'rp.norec as norec_rp', 'rp.alergiobat','rp.statusprioritas', 'rp.noresep','rp.tglresep','ru.id as iddepo','ru.ruangan as depo'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->get();

        foreach ($headresep as $key => $item) {
            $resep = \DB::table('pasiendaftar_t as pd')
                ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
                ->join('reseppasien_t as rp','rp.antrianpasiendiperiksafk','=','apd.norec')
                ->join('reseppasiendetail_t as rpd','rpd.reseppasienfk','=','rp.norec')
                ->join('produk_m as pr','pr.id','=','rpd.produkfk')
                ->leftjoin('aturanpakai_m as ap','ap.id','=','rpd.aturanpakaifk')
                ->leftjoin('jeniskemasan_m as jk','jk.id','=','rpd.jeniskemasanfk')
                ->select('rpd.norec as norec_rpd', 'rpd.jeniskemasanfk as idjeniskemasan','rpd.racikanke','rpd.dosisracikan', 'pr.id as idproduk','pr.produk','rpd.jumlah','rpd.signa','jk.jeniskemasan','ap.id as idaturanpakai','ap.aturanpakai' , 'rpd.keterangan','rpd.hargasatuan','rpd.hargatotal','rpd.jasa','rpd.hargatotaljasa'
                )
                ->where('rp.norec', '=', $item->norec_rp)
                ->get();

            $headresep[$key]->detail = $resep;
        }

        $headanamnesa = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','head.pegawaifk')
            ->select('pg.namalengkap as pegawai','pg.id as idpegawai', 'head.tglanamnesahead', 'head.norec as norec_anhead', 'head.antrianpasiendiperiksafk as norec_apd'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $anamnesa = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->join('an_anamnesa_t as an','an.an_anamnesaheadfk','=','head.norec')
            ->leftjoin('pegawai_m as pg','pg.id','=','an.pegawaifk')
            ->leftjoin('pegawai_m as pg2','pg2.id','=','an.asistenfk')
            ->select('pg.namalengkap as pegawai','pg.id as idpegawai','pg2.namalengkap as asisten','pg2.id as idasisten','an.keluhanutama','an.lamasakithr','an.lamasakitbln','an.lamasakitthn','an.lamasakit','an.keluhantambahan'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $pemFisik = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->join('an_pemeriksaanfisik_t as an','an.an_anamnesaheadfk','=','head.norec')
            ->select('an.kesadaran','an.an_combokesadaranfk as idkesadaran','an.sistole','an.diastole','an.tinggibadan','an.caraukurtb','an.an_combocaraukurtbfk as idcaraukur','an.beratbadan','an.lingkarperut','an.imt','an.hasilimt','an.detaknadi','an.nafas','an.saturasi','an.suhu','an.aktifitasfisik','an.statushamil','an.detakjantung','an.triage','an.skalanyeri','an.skalanyeriangka'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $riwayatPen = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->join('an_riwayatpenyakit_t as an','an.an_anamnesaheadfk','=','head.norec')
            ->select('an.istidakada','an.rps','an.rpd','an.rpk'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $alergiPas = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->join('an_alergipasien_t as an','an.an_anamnesaheadfk','=','head.norec')
            ->select('an.istidakada','an.obat','an.makanan','an.lainnya'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $lainnya = \DB::table('pasiendaftar_t as pd')
            ->join('antrianpasiendiperiksa_t as apd','apd.pasiendaftarfk','=','pd.norec')
            ->join('an_anamnesahead_t as head','head.antrianpasiendiperiksafk','=','apd.norec')
            ->join('an_lainnya_t as an','an.an_anamnesaheadfk','=','head.norec')
            ->select('an.edukasi','an.terapi','an.rencana','an.tipeaskep','an.deskripsiaskep','an.observasi','an.biopsikososial','an.keterangan','an.merokok','an.konsumsialkohol','an.kurangsayurbuah'
            )
            ->where('pd.noregistrasi', '=',$request['noregistrasi'])
            ->where('head.statusenabled', true)
            ->first();

        $anamnesapasien = array(
            'anamnesahead' => $headanamnesa,
            'anamnesa' => $anamnesa,
            'pemeriksaanfisik' => $pemFisik,
            'riwayatpenyakit' => $riwayatPen,
            'alergipasien' => $alergiPas,
            'lainnya' => $lainnya,
        );


        $pasiendaftar = \DB::table('pasiendaftar_t as pd')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->join('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->select('ps.id as nocmfk','ps.namapasien','ps.nocm','pd.tglregistrasi','pd.tglpulang','pd.noregistrasi','pd.norec as norec_pd','ru.ruangan as ruanganakhir','pd.noregistrasi', 'pd.asalrujukan','pd.namaperujuk','pd.catatanperujuk','pd.statuskunjungan','pd.statuskasuspenyakit','pj.penjamin','ps.nopenjamin','ps.noktp')
            ->where('pd.noregistrasi',$request['noregistrasi'])
            ->first();

        

        $result = array(
            'pasien' => $pasiendaftar,
            'diagnosa' => $diagnosa,
            'resep' => $headresep,
            'anamnesa' => $anamnesapasien,
        );

        return $this->respond($result);
    }

    public function getDataPasienSingle($pasienfk)
    {
        $pasien = Pasien::where("id",$pasienfk)->first();
        if( $pasien ){
            return $this->respond($pasien);
        }
        else return [];

    }
	
}
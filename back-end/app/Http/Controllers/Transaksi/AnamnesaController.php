<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;
use App\Transaksi\AnAlergiPasien;
use App\Transaksi\AnAnamnesa;
use App\Transaksi\AnAnamnesaHead;
use App\Transaksi\AnLainnya;
use App\Transaksi\AnPemeriksaanFisik;
use App\Transaksi\AnRiwayatPenyakit;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class AnamnesaController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function saveAnamnesaPasien(Request $request)
    {
        $dataLogin =$request->all();

        $anamnesaHead = $request['anamnesahead'];
        $anamnesa = $request['anamnesa'];
        $pf = $request['pemeriksaanfisik'];
        $rp = $request['riwayatpenyakit'];
        $ap = $request['alergipasien'];
        $anlain = $request['lainnya'];

        DB::beginTransaction();
        $error='';

        try {

            AnAnamnesaHead::where("antrianpasiendiperiksafk", $anamnesaHead['norec_apd'])->update(["statusenabled" => false]);

            if($anamnesaHead['norec_anhead']==''){

                $noanamnesa = $this->generateCodeBySeqTable(new AnAnamnesaHead, 'noanamnesa', 15, 'AN' . date('ym') . '');

                if ($noanamnesa == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                $AnamHead = new AnAnamnesaHead();
                $AnamHead->norec = $AnamHead->generateNewId();
                $AnamHead->kdprofile = 0;
                $AnamHead->statusenabled = true;
                $AnamHead->antrianpasiendiperiksafk = $anamnesaHead['norec_apd'];
                $AnamHead->noanamnesahead = $noanamnesa;
                $AnamHead->tglanamnesahead = date('Y-m-d H:i:s');
                $AnamHead->pegawaifk =  $dataLogin['userData']['id'];
                $AnamHead->save();
            }else{

                $AnamDelete = AnAnamnesaHead::where('norec', $anamnesaHead['norec_anhead'])
                ->update([
                    'statusenabled' => false
                ]);

                $noanamnesa = $this->generateCodeBySeqTable(new AnAnamnesaHead, 'noanamnesa', 15, 'AN' . date('ym') . '');

                if ($noanamnesa == '') {
                    $transMessage = "Gagal mengumpukan data, Coba lagi.!";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                $AnamHead = new AnAnamnesaHead();
                $AnamHead->norec = $AnamHead->generateNewId();
                $AnamHead->kdprofile = 0;
                $AnamHead->statusenabled = true;
                $AnamHead->antrianpasiendiperiksafk = $anamnesaHead['norec_apd'];
                $AnamHead->noanamnesahead = $noanamnesa;
                $AnamHead->tglanamnesahead = date('Y-m-d H:i:s');
                $AnamHead->pegawaifk =  $dataLogin['userData']['id'];
                $AnamHead->save();
            }

            $Norec_AnamnesaHead = $AnamHead->norec;


            //ANAMNESA
            if($anamnesa != ""){
                $Anam = new AnAnamnesa();
                $Anam->norec = $Anam->generateNewId();
                $Anam->kdprofile = 0;
                $Anam->statusenabled = true;
                $Anam->pegawaifk =  $anamnesa['idpegawai'];
                if (isset($anamnesa['idasisten']) && $anamnesa['idasisten']!="" && $anamnesa['idasisten']!="undefined"){
                    $Anam->asistenfk = $anamnesa['idasisten'];
                }
                $Anam->keluhanutama =  $anamnesa['keluhanutama'];
                $Anam->keluhantambahan =  $anamnesa['keluhantambahan'];
                $Anam->lamasakitthn =  $anamnesa['lamasakitthn'];
                $Anam->lamasakitbln =  $anamnesa['lamasakitbln'];
                $Anam->lamasakithr =  $anamnesa['lamasakithr'];
                $Anam->lamasakit =  $anamnesa['lamasakitthn'].' Thn '.$anamnesa['lamasakitbln'].' Bln '.$anamnesa['lamasakithr'].' Hr';
                $Anam->an_anamnesaheadfk =  $Norec_AnamnesaHead;
                $Anam->save();
            }
            

            //PEMERIKSAAN FISIK
            if($pf != ""){
                $PemFis = new AnPemeriksaanFisik();
                $PemFis->norec = $PemFis->generateNewId();
                $PemFis->kdprofile = 0;
                $PemFis->statusenabled = true;
                $PemFis->kesadaran =  $pf['kesadaran'];
                // $PemFis->an_combokesadaranfk =  $pf['idkesadaran'];
                $PemFis->sistole =  $pf['sistole'];
                $PemFis->diastole =  $pf['diastole'];
                $PemFis->tinggibadan =  $pf['tinggibadan'];
                $PemFis->caraukurtb =  $pf['caraukurtb'];
                $PemFis->an_combocaraukurtbfk =  $pf['idcaraukur'];
                $PemFis->beratbadan =  $pf['beratbadan'];
                if (isset($pf['lingkarperut']) && $pf['lingkarperut']!="" && $pf['lingkarperut']!="undefined"){
                    $PemFis->lingkarperut = $pf['lingkarperut'];
                }
                $PemFis->imt =  $pf['imt'];
                $PemFis->hasilimt =  $pf['hasilimt'];
                $PemFis->detaknadi =  $pf['detaknadi'];
                $PemFis->nafas =  $pf['nafas'];
                if (isset($pf['saturasi']) && $pf['saturasi']!="" && $pf['saturasi']!="undefined"){
                    $PemFis->saturasi = $pf['saturasi'];
                }
                if (isset($pf['suhu']) && $pf['suhu']!="" && $pf['suhu']!="undefined"){
                    $PemFis->suhu = $pf['suhu'];
                }
                if (isset($pf['aktifitasfisik']) && $pf['aktifitasfisik']!="" && $pf['aktifitasfisik']!="undefined"){
                    $PemFis->aktifitasfisik = $pf['aktifitasfisik'];
                }
                if (isset($pf['statushamil']) && $pf['statushamil']!="" && $pf['statushamil']!="undefined"){
                    $PemFis->statushamil = $pf['statushamil'];
                }
                $PemFis->detakjantung =  $pf['detakjantung'];
                // $PemFis->triage =  $pf['triage'];
                $PemFis->skalanyeri =  $pf['skalanyeri'];
                $PemFis->skalanyeriangka =  $pf['skalanyeriangka'];
                $PemFis->an_anamnesaheadfk =  $Norec_AnamnesaHead;
                $PemFis->save();
            }


            //RIWAYAT PENYAKIT
            if($rp != ""){
                $RiwayatPen = new AnRiwayatPenyakit();
                $RiwayatPen->norec = $RiwayatPen->generateNewId();
                $RiwayatPen->kdprofile = 0;
                $RiwayatPen->statusenabled = true;
                if (isset($rp['istidakada']) && $rp['istidakada']!="" && $rp['istidakada']!="undefined"){
                    $RiwayatPen->istidakada = $rp['istidakada'];
                }
                if (isset($rp['rps']) && $rp['rps']!="" && $rp['rps']!="undefined"){
                    $RiwayatPen->rps = $rp['rps'];
                }
                if (isset($rp['rpd']) && $rp['rpd']!="" && $rp['rpd']!="undefined"){
                    $RiwayatPen->rpd = $rp['rpd'];
                }
                if (isset($rp['rpk']) && $rp['rpk']!="" && $rp['rpk']!="undefined"){
                    $RiwayatPen->rpk = $rp['rpk'];
                }
                $RiwayatPen->an_anamnesaheadfk =  $Norec_AnamnesaHead;
                $RiwayatPen->save();
            }


            //ALERGI PASIEN
            if($ap != ""){
                $AlergiPas = new AnAlergiPasien();
                $AlergiPas->norec = $AlergiPas->generateNewId();
                $AlergiPas->kdprofile = 0;
                $AlergiPas->statusenabled = true;
                if (isset($ap['istidakada']) && $ap['istidakada']!="" && $ap['istidakada']!="undefined"){
                    $AlergiPas->istidakada = $ap['istidakada'];
                }
                if (isset($ap['obat']) && $ap['obat']!="" && $ap['obat']!="undefined"){
                    $AlergiPas->obat = $ap['obat'];
                }
                if (isset($ap['makanan']) && $ap['makanan']!="" && $ap['makanan']!="undefined"){
                    $AlergiPas->makanan = $ap['makanan'];
                }
                if (isset($ap['lainnya']) && $ap['lainnya']!="" && $ap['lainnya']!="undefined"){
                    $AlergiPas->lainnya = $ap['lainnya'];
                }
                $AlergiPas->an_anamnesaheadfk =  $Norec_AnamnesaHead;
                $AlergiPas->save();
            }

                //LAINNYA
            if($anlain != ""){
                $Lainnya = new AnLainnya();
                $Lainnya->norec = $Lainnya->generateNewId();
                $Lainnya->kdprofile = 0;
                $Lainnya->statusenabled = true;
                $Lainnya->edukasi = $anlain['edukasi'];
                if (isset($anlain['terapi']) && $anlain['terapi']!="" && $anlain['terapi']!="undefined"){
                    $Lainnya->terapi = $anlain['terapi'];
                }
                if (isset($anlain['rencana']) && $anlain['rencana']!="" && $anlain['rencana']!="undefined"){
                    $Lainnya->rencana = $anlain['rencana'];
                }
                $Lainnya->tipeaskep = $anlain['tipeaskep'];
                if (isset($anlain['deskripsiaskep']) && $anlain['deskripsiaskep']!="" && $anlain['deskripsiaskep']!="undefined"){
                    $Lainnya->deskripsiaskep = $anlain['deskripsiaskep'];
                }
                if (isset($anlain['observasi']) && $anlain['observasi']!="" && $anlain['observasi']!="undefined"){
                    $Lainnya->observasi = $anlain['observasi'];
                }
                if (isset($anlain['biopsikososial']) && $anlain['biopsikososial']!="" && $anlain['biopsikososial']!="undefined"){
                    $Lainnya->biopsikososial = $anlain['biopsikososial'];
                }
                if (isset($anlain['keterangan']) && $anlain['keterangan']!="" && $anlain['keterangan']!="undefined"){
                    $Lainnya->keterangan = $anlain['keterangan'];
                }
                $Lainnya->merokok = $anlain['merokok'];
                $Lainnya->konsumsialkohol = $anlain['konsumsialkohol'];
                $Lainnya->kurangsayurbuah = $anlain['kurangsayurbuah'];

                $Lainnya->an_anamnesaheadfk =  $Norec_AnamnesaHead;
                $Lainnya->save();
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

    public function getAnamnesaPasien(Request $request)
    {

        $head = \DB::table('pasiendaftar_t as pd')
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

        $result = array(
            'anamnesahead' => $head,
            'anamnesa' => $anamnesa,
            'pemeriksaanfisik' => $pemFisik,
            'riwayatpenyakit' => $riwayatPen,
            'alergipasien' => $alergiPas,
            'lainnya' => $lainnya,
        );
        return $this->respond($result);
    }

     public function getDataComboAnamnesa(Request $request){
        
        $listKesadaran = \DB::table('an_combo_m as dat')
            ->select('dat.id', 'dat.value')
            ->where('dat.statusenabled', true)
            ->where('dat.fieldnamefk',1)
            ->orderBy('dat.id')
            ->get();

        $listCaraUkur = \DB::table('an_combo_m as dat')
            ->select('dat.id', 'dat.value')
            ->where('dat.statusenabled', true)
            ->where('dat.fieldnamefk',2)
            ->orderBy('dat.id')
            ->get();

        $result = array(
            'kesadaran' => $listKesadaran,
            'caraukurtb' => $listCaraUkur,
        );

        return $this->respond($result);
    }


}
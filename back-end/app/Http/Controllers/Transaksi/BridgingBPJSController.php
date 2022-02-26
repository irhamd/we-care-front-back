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

use App\Traits\PelayananPasienTrait;
use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class BridgingBPJSController extends ApiController
{
    use Valet, PelayananPasienTrait;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getDiagnosaPart(Request $request) {
        $req = $request->all();
        $dataReq = $request['nama'];
        $data = $this->getIdConsumerBPJS();
        $secretKey = $this->getPasswordConsumerBPJS();
        // Computes the timestamp
        date_default_timezone_set('UTC');
        $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
        // Computes the signature by hashing the salt with the secret key as the key
        $signature = hash_hmac('sha256', $data."&".$tStamp, $secretKey, true);

        // base64 encode…
        $encodedSignature = base64_encode($signature);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_PORT => $this->getPortBrigdingBPJS(),

//         CURLOPT_URL=> "https://vclaim.bpjs-kesehatan.go.id/tot/Referensi/getDiagnosa".$request['nama'],
            CURLOPT_URL=> $this->getUrlBrigdingBPJS()."referensi/diagnosa/".$dataReq,
//            CURLOPT_URL => "http://dvlp.bpjs-kesehatan.go.id:8080/VClaim-Rest/Peserta/nik/".$request['nik']."/tglSEP/".$request['tglsep'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1   ,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json; charset=utf-8",
                "X-cons-id: ".  (string)$data,
                "X-signature: ". (string)$encodedSignature,
                "X-timestamp: ". (string)$tStamp
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            $result= "cURL Error #:" . $err;
        } else {
            $result = (array) json_decode($response);
        }
        $res=$result['response']->diagnosa;
        return $this->respond($res);

    }

    
}
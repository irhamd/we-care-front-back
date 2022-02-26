<?php

namespace App\Http\Controllers\Auth;
use App\Traits\Valet;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;

use Lcobucci\JWT\Signer\Hmac\Sha512;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Hmac\Sha384;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Parser;
use App\Master\Pegawai;

class LoginUserController extends WebAdminMasters {

    protected function encryptSHA1($pass)
    {
        return sha1($pass);
    }

    public function createToken($namaUser){
        $class = new Builder();
        $signer = new Sha512();
        $token = $class->setHeader('alg','HS512')
            ->set('sub', $namaUser)
            ->sign($signer, "JASAMEDIKA")
            ->getToken();
        return $token;
    }

    public function loginUser(Request $request)
    {
        $username= $request->input('username');
        $password= $request->input('password');

        $login = DB::table('loginuser_s')
            ->where('passcode', '=', $this->encryptSHA1($password))
            ->where('namauser', '=', $username);
        $LoginUser = $login->get();
        if (count($LoginUser) > 0){
            $metaData = array(
                'message' => 'Ok',
                'code' => 200,
            );
            $token['X_TOKEN'] = $this->createToken($LoginUser[0]->namauser).'';
            $pegawai = Pegawai::where('id',$LoginUser[0]->pegawaifk)
                ->select('id','namalengkap')
                ->first();
            $token['userData'] = $pegawai;

            $result = array(
                'response' => $token,
                'metadata' =>$metaData,
            );
        }else{
            $metaData = array(
                'message' => 'Gagal',
                'code' => 400,
            );
            $result = array(
                'response' => [],
                'metadata' =>$metaData,
            );
        }
        return $this->respond($result);
    }

}


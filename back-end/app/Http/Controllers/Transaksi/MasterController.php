<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;
use App\Traits\Valet;


use DB;

class MasterController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=true);
    }

  
    public  function getMasterData(Request $req)
    {
        $data =DB::table($req->masterData)->where("statusenabled", true);

        if(isset($req->limit)){
            $data = $data->limit($req->limit);
        }


        $data= $data->orderBy("id")->get();

        return response()->json($data);
    }

    
}
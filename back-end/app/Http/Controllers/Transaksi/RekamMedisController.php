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

class RekamMedisController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

 
}
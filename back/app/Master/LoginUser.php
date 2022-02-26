<?php

namespace App\Master;
use App\BaseModel;

class LoginUser extends BaseModel
{
    protected $table ="loginuser_s";
    protected $fillable = [];

    // public function pegawai(){
    //     return $this->belongsTo('App\Master\Pegawai', 'objectpegawaifk');
    // }
}

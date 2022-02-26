<?php
namespace App\Transaksi;

class PelayananPasien extends Transaksi
{
    protected $table ="pelayananpasien_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

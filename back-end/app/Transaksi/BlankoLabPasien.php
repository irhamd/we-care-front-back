<?php
namespace App\Transaksi;

class BlankoLabPasien extends Transaksi
{
    protected $table ="blankolabpasien_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

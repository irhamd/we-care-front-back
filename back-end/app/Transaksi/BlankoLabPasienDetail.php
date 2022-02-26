<?php
namespace App\Transaksi;

class BlankoLabPasienDetail extends Transaksi
{
    protected $table ="blankolabpasiendetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

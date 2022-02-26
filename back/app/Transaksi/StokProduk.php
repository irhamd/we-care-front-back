<?php
namespace App\Transaksi;

class StokProduk extends Transaksi
{
    protected $table ="stokproduk_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

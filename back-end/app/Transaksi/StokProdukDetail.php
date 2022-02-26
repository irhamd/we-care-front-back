<?php
namespace App\Transaksi;

class StokProdukDetail extends Transaksi
{
    protected $table ="stokprodukdetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

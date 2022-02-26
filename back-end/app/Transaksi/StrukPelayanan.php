<?php
namespace App\Transaksi;

class StrukPelayanan extends Transaksi
{
    protected $table ="strukpelayanan_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

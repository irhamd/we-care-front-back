<?php
namespace App\Transaksi;

class StrukPembayaran extends Transaksi
{
    protected $table ="strukpembayaran_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

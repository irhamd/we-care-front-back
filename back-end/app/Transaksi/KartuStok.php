<?php
namespace App\Transaksi;

class KartuStok extends Transaksi
{
    protected $table ="kartustok_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

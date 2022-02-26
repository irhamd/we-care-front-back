<?php
namespace App\Transaksi;

class PenerimaanBarang extends Transaksi
{
    protected $table ="penerimaanbarang_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

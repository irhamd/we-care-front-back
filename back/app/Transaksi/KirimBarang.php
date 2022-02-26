<?php
namespace App\Transaksi;

class KirimBarang extends Transaksi
{
    protected $table ="kirimbarang_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

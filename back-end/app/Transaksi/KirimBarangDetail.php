<?php
namespace App\Transaksi;

class KirimBarangDetail extends Transaksi
{
    protected $table ="kirimbarangdetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class PenerimaanBarangDetail extends Transaksi
{
    protected $table ="penerimaanbarangdetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

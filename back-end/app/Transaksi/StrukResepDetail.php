<?php
namespace App\Transaksi;

class StrukResepDetail extends Transaksi
{
    protected $table ="strukresepdetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

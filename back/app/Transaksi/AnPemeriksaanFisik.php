<?php
namespace App\Transaksi;

class AnPemeriksaanFisik extends Transaksi
{
    protected $table ="an_pemeriksaanfisik_t";
    protected $fillable = [];
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class AnRiwayatPenyakit extends Transaksi
{
    protected $table ="an_riwayatpenyakit_t";
    protected $fillable = [];
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class AntrianPasienDiperiksa extends Transaksi
{
    protected $table ="antrianpasiendiperiksa_t";
    protected $fillable = [];
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = "norec";
}

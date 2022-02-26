<?php
namespace App\Transaksi;

class PasienDaftar extends Transaksi
{
    protected $table ="pasiendaftar_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class PelayananPasienDelete extends Transaksi
{
    protected $table ="pelayananpasiendelete_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class StrukResep extends Transaksi
{
    protected $table ="strukresep_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

<?php
namespace App\Transaksi;

class AnLainnya extends Transaksi
{
    protected $table ="an_lainnya_t";
    protected $fillable = [];
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = "norec";

}

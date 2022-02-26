<?php
namespace App\Transaksi;

class AnAnamnesa extends Transaksi
{
    protected $table ="an_anamnesa_t";
    protected $fillable = [];
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = "norec";

}

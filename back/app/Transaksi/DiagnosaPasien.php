<?php
namespace App\Transaksi;

class DiagnosaPasien extends Transaksi
{
    protected $table ="diagnosapasien_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

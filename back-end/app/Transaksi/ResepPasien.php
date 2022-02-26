<?php
namespace App\Transaksi;

class ResepPasien extends Transaksi
{
    protected $table ="reseppasien_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

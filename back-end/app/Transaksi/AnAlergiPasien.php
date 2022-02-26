<?php
namespace App\Transaksi;

class AnAlergiPasien extends Transaksi
{
    protected $table ="an_alergipasien_t";
    protected $fillable = [];
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = "norec";

}

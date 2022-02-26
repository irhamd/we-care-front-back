<?php
namespace App\Transaksi;

class StrukLab extends Transaksi
{
    protected $table ="struklab_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

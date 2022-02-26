<?php
namespace App\Transaksi;

class ResepPasienDetail extends Transaksi
{
    protected $table ="reseppasiendetail_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

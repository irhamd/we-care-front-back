<?php
namespace App\Transaksi;

class AnAnamnesaHead extends Transaksi
{
    protected $table ="an_anamnesahead_t";
    protected $fillable = [];
    public $incrementing = false;
    protected $primaryKey = "norec";

}

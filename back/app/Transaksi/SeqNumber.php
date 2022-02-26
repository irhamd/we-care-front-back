<?php

namespace App\Transaksi;

class SeqNumber extends Transaksi
{
    protected $table ="seqnumber_t";
    protected $primaryKey = 'norec';
    protected $fillable = [];
    public $timestamps = false;
    public $incrementing = false;

}

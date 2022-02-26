<?php
namespace App\Traits;

use App\Master\Pasien;
use App\Transaksi\PasienDaftar;
use App\Master\SettingDataFixed;
// use App\Master\Rekanan;
// use App\Master\Produk;

Trait PelayananPasienTrait
{
    protected function getProdukIdDeposit(){
        $set = SettingDataFixed::where('namafield', 'idProdukDeposit')->first();
        $this->id= ($set) ? (int)$set->nilaifield: null;
        return $this->id;
    }

    protected function getPelayananPasienByNoRegistrasi($noRegistrasi){
        $pelayanan  = array();
        $pasienDaftar = PasienDaftar::where('noregistrasi', $noRegistrasi)->first();
        if(!$pasienDaftar){
            return $pelayanan;
        }else {
            $pelayanan = $pasienDaftar->pelayanan_pasien()->whereNull('strukfk')->get();
        }
        return $pelayanan;
    }

    protected function getPelayananPasienDetailByNoRegistrasi($noRegistrasi){
        $pelayanan  = array();
        $pasienDaftar = PasienDaftar::where('noregistrasi', $noRegistrasi)->first();
        if(!$pasienDaftar){
            return $pelayanan;
        }
        $pelayanan = $pasienDaftar->pelayanan_pasien_detail;
        return $pelayanan;
    }

    protected function getDaftarPasien($request){
        $pasienDaftar = PasienDaftar::has('pelayanan_pasien')->get();
        return $pasienDaftar;
    }

    protected function getDepositPasien($noregistrasi){
        $produkIdDeposit = $this->getProdukIdDeposit();
        $deposit = 0;
        $pasienDaftar  = PasienDaftar::has('pelayanan_pasien')->where('noregistrasi', $noregistrasi)->first();
        if($pasienDaftar){
            $depositList =$pasienDaftar->pelayanan_pasien()->where('nilainormal', '-1')->whereNull('strukfk')->get();
            foreach ($depositList as $item){
                if($item->produkfk==$produkIdDeposit){
                    $deposit = $deposit + $item->hargasatuan;
                }
            }
        }
        return $deposit;
    }

    protected function getBillingFromPelayananPasien($pelayanan){
        $totalBilling = 0;
        $totalKlaim = 0;
        $totalDeposit = 0;
        foreach ($pelayanan as $value){
            if($value->produkfk==$this->getProdukIdDeposit()){
                $totalDeposit = $totalDeposit + $value->hargajual;
            }else{
                $totalBilling = $totalBilling + (($value->hargajual-$value->hargadiscount) * $value->jumlah);
            }

        }

        $billing = new \stdClass();
        $billing->totalBilling = $totalBilling;
        $billing->totalKlaim= $totalKlaim;
        $billing->totalDeposit = $totalDeposit;

        return $billing;
    }

    protected function getBillingFromPelayananPasienDetail($pelayananDetail){
        $totalBilling = 0;
        $totalKlaim = 0;
        $totalDeposit = 0;
        foreach ($pelayananDetail as $value){
            if($value->produkfk==$this->getProdukIdDeposit()){
                $totalDeposit = $totalDeposit + $value->hargajual;
            }else{
                $totalBilling = $totalBilling + ($value->hargajual * $value->jumlah);
            }

        }
        $billing = new \stdClass();
        $billing->totalBilling = $totalBilling;
        $billing->totalKlaim= $totalKlaim;
        $billing->totalDeposit = $totalDeposit;

        return $billing;
    }

    //get siapa penjaminnya ini masih perlu disesuaikan nanti karna belum ngambil dari tabel pemakaianasuransi asuransi yang masih kecover itu umum
    //masih belum dimasi
    protected function getPenjamin($pasienDaftar){
        $rekananid=0;
        if($pasienDaftar->objectkelompokpasienlastfk==1 || $pasienDaftar->objectkelompokpasienlastfk==6){
            $rekananid=0;
        }elseif($pasienDaftar->objectkelompokpasienlastfk==2 || $pasienDaftar->objectkelompokpasienlastfk==4){
            $rekananid=2552;
        }
        
        return Rekanan::find($rekananid);
    }

    protected function getProdukBiayaMaterai(){
        $set = SettingDataFixed::where('namafield', 'idProdukBiayaMaterai')->first();
        return Produk::find($set->nilaifield);
    }

    protected function getProdukBiayaAdministrasi(){
        $set = SettingDataFixed::where('namafield', 'idProdukAdministrasi')->first();
        return Produk::find($set->nilaifield);
    }

    protected function  getPercentageBiayaAdmin(){
        return 0.05;
    }

    protected function getUrlBrigdingBPJS(){
//        $set = SettingDataFixed::where('namafield', 'urlBrigdingBPJS')->first();
        $set = SettingDataFixed::where('namafield', 'linkBPJSV1.1')->first(); // linkBPJSV1.1
        return $set->nilaifield;
    }
    protected function dateRange( $first, $last, $step = '+1 day', $format = 'Y-m-d' ) {
        $dates = [];
        $current = strtotime( $first );
        $last = strtotime( $last );

        while( $current <= $last ) {

            $dates[] = date( $format, $current );
            $current = strtotime( $step, $current );
        }

        return $dates;
    }
    protected function getPortBrigdingBPJS(){
        $set = SettingDataFixed::where('namafield', 'portBrigdingBPJS')->first();
        return '';//$set->nilaifield;
    }
    protected function getUrlBrigdingBPJSnew(){
        $set = SettingDataFixed::where('namafield', 'linkBPJS')->first();//linkBPJSV1.1
        return $set->nilaifield;
    }
    protected function getUrlSisrute(){
        $set = SettingDataFixed::where('namafield', 'urlBridgingSisrute')->first();
        return $set->nilaifield;
    }
    protected function getUrlYankes(){
        $set = SettingDataFixed::where('namafield', 'urlBridgingYankes')->first();
        return $set->nilaifield;
    }
    protected function getIdConsumerBPJS(){
        $set = SettingDataFixed::where('namafield', 'IdConsumerBPJS')->first(); // IdConsumerBPJSHarkit
        return $set->nilaifield;
    }
    protected function getPasswordConsumerBPJS(){
        $set = SettingDataFixed::where('namafield', 'PasswordConsumerBPJS')->first(); //PasswordConsumerBPJSHarkit
        return $set->nilaifield;
    }


}
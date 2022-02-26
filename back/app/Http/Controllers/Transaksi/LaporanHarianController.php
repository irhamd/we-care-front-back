<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Master\Pasien;
use App\Master\AlamatPasien;
use App\Master\DomisiliPasien;

use App\Transaksi\PasienDaftar;
use App\Transaksi\AntrianPasienDiperiksa;

use App\Traits\Valet;
use Carbon\Carbon;


use DB;

class LaporanHarianController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function getKunjunganHarian( Request $request) {
        $jumlah = 10;
        if(isset($request['jumlahbaris']) && $request['jumlahbaris']!="" && $request['jumlahbaris']!="undefined") {
            $jumlah = $request['jumlahbaris'];
        };
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('asalrujukan_m as ar','ar.id','=','pd.asalrujukanfk')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('ps.nocm','ps.namapasien', DB::raw('CONCAT(ps.tempatlahir,", ",DATE_FORMAT(ps.tgllahir, "%d-%m-%Y")) as ttl'),
                DB::raw('CONCAT(FLOOR((TIMESTAMPDIFF(MONTH, ps.tgllahir, CURDATE()) / 12)), " Tahun ",MOD(TIMESTAMPDIFF(MONTH, ps.tgllahir, CURDATE()), 12) , " Bulan ") AS umur'),
                'ps.jeniskelamin','ps.noktp','ps.namaayah','ps.nohp', 'pj.penjamin','ps.nopenjamin','ar.asalrujukan','pd.tglregistrasi',
                'pd.noregistrasi','pd.pjnama','pd.pjhubungan','pd.namaperujuk','ru.id as idruangan','ru.ruangan','ins.instalasi','ins.id as idinstalasi'
            );

        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };
        if(isset($request['idpenjamin']) && $request['idpenjamin']!="" && $request['idpenjamin']!="undefined") {
            $data = $data->where('pj.id', '=', $request['idpenjamin']);
        };
        if(isset($request['jeniskunjungan']) && $request['jeniskunjungan']!="" && $request['jeniskunjungan']!="undefined") {
            $data = $data->where('pd.jeniskunjungan', '=', $request['jeniskunjungan']);
        };
        if(isset($request['idjeniskelamin']) && $request['idjeniskelamin']!="" && $request['idjeniskelamin']!="undefined") {
            $data = $data->where('ps.jeniskelaminfk', '=', $request['idjeniskelamin']);
        };

        $data = $data->where('pd.statusenabled',true);
        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->paginate($jumlah);

        return $this->respond($data);
    }

    public function getPengunjungHarian( Request $request) {
        $jumlah = 10;
        if(isset($request['jumlahbaris']) && $request['jumlahbaris']!="" && $request['jumlahbaris']!="undefined") {
            $jumlah = $request['jumlahbaris'];
        };
        $data = \DB::table('pasiendaftar_t as pd')
            ->join('pasien_m as ps','ps.id','=','pd.pasienfk')
            ->leftjoin('penjamin_m as pj','pj.id','=','pd.penjaminfk')
            ->leftjoin('alamatpasien_m as al','al.pasienfk','=','ps.id')
            ->leftjoin('ruangan_m as ru', 'ru.id','=','pd.ruanganakhirfk')
            ->leftjoin('instalasi_m as ins', 'ins.id','=','ru.instalasifk')
            ->select('ps.nocm','ps.namapasien', DB::raw('CONCAT(ps.tempatlahir,", ",DATE_FORMAT(ps.tgllahir, "%d-%m-%Y")) as ttl'),
                DB::raw('CONCAT(FLOOR((TIMESTAMPDIFF(MONTH, ps.tgllahir, CURDATE()) / 12)), " Tahun ",MOD(TIMESTAMPDIFF(MONTH, ps.tgllahir, CURDATE()), 12) , " Bulan ") AS umur'),
                'ps.jeniskelamin','ps.noktp', 'ps.namaayah','ps.nohp','al.alamat','ps.pekerjaan'
            );

        if(isset($request['tglAwal']) && $request['tglAwal']!="" && $request['tglAwal']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '>=', $request['tglAwal']);
        };
        if(isset($request['tglAkhir']) && $request['tglAkhir']!="" && $request['tglAkhir']!="undefined") {
            $data = $data->where('pd.tglregistrasi', '<=', $request['tglAkhir']);
        };
        if(isset($request['idruangan']) && $request['idruangan']!="" && $request['idruangan']!="undefined") {
            $data = $data->where('ru.id', '=', $request['idruangan']);
        };
        if(isset($request['idinstalasi']) && $request['idinstalasi']!="" && $request['idinstalasi']!="undefined") {
            $data = $data->where('ins.id', '=', $request['idinstalasi']);
        };
        if(isset($request['idpenjamin']) && $request['idpenjamin']!="" && $request['idpenjamin']!="undefined") {
            $data = $data->where('pj.id', '=', $request['idpenjamin']);
        };
        if(isset($request['jeniskunjungan']) && $request['jeniskunjungan']!="" && $request['jeniskunjungan']!="undefined") {
            $data = $data->where('pd.jeniskunjungan', '=', $request['jeniskunjungan']);
        };
        if(isset($request['idjeniskelamin']) && $request['idjeniskelamin']!="" && $request['idjeniskelamin']!="undefined") {
            $data = $data->where('ps.jeniskelaminfk', '=', $request['idjeniskelamin']);
        };

        $data = $data->where('pd.statusenabled',true);
        $data = $data->groupBy('ps.nocm','ps.namapasien', 'ps.tgllahir','ps.tempatlahir','ps.jeniskelamin','ps.noktp','ps.namaayah','ps.nohp','al.alamat','ps.pekerjaan');
        $data=$data->orderBy('pd.noregistrasi','asc');
        $data=$data->paginate($jumlah);

        return $this->respond($data);
    }

	
}
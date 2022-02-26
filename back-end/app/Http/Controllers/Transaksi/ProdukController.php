<?php
namespace App\Http\Controllers\Transaksi;

use Illuminate\Http\Request;

use App\Http\Controllers\ApiController;

use App\Master\RunningNumber;
use App\Traits\Valet;
use App\Master\Produk;
use App\Master\HargaNettoProduk;


use DB;

class ProdukController extends ApiController
{
    use Valet;
	public function __construct()
    {
        parent::__construct($skip_authentication=false);
    }

    public function saveProduk(Request $request) {
        $datLogin =$request->all();
        $error="";

        DB::beginTransaction();
        try{
            if($request['idproduk'] == '') {
                $newId = Produk::max('id') + 1;

                $dataProd = new Produk();
                $dataProd->id = $newId;
                $dataProd->kdprofile = 0;
                $dataProd->statusenabled = true;
                $dataProd->norec =  $dataProd->generateNewId();

            }else{
                $dataProd = Produk::where('id',$request['idproduk'])->first();
                $newId = $dataProd->id;
            }

            $dataProd->produk =  $request['produk'];
            $dataProd->satuanfk =  $request['idsatuan'];
            $dataProd->jenisprodukfk =  $request['idjenisproduk'];
            $dataProd->jenisprodukdetailfk =  $request['idjenisprodukdetail'];
            if (isset( $request['idkategoriproduk']) &&  $request['idkategoriproduk']!="" &&  $request['idkategoriproduk']!="undefined"){
                $dataProd->kategoriprodukfk =  $request['idkategoriproduk'];
            }
            
            $dataProd->pegawaiinputfk =  $datLogin['userData']['id'];
            $dataProd->save();


            $transStatus = 'true';
        } catch (\Exception $e) {
            $error = $e->getMessage();
            $transStatus = 'false';
        }

        if ($transStatus == 'true') {
            $transMessage = "Sukses";
            DB::commit();
            $result = array(
                'status' => 201,
                'message' => $transMessage,
            );
        } else {
            $transMessage = "Simpan Gagal";
            DB::rollBack();
            $result = array(
                'status' => 400,
                'message'  => $transStatus,
                'error' => $error
            );
        }
        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    public function getDaftarProduk( Request $request) {
        $jumlah = 10;
        if(isset($request['jumlahpage']) && $request['jumlahpage']!="" && $request['jumlahpage']!="undefined") {
            $jumlah = $request['jumlahpage'];
        };
        $data = \DB::table('produk_m as dat')
            ->leftjoin('satuan_m as sat','sat.id','=','dat.satuanfk')
            ->leftjoin('jenisproduk_m as jp','jp.id','=','dat.jenisprodukfk')
            ->leftjoin('jenisprodukdetail_m as jpd','jpd.id','=','dat.jenisprodukdetailfk')
            ->leftjoin('kategoriproduk_m as kp','kp.id','=','dat.kategoriprodukfk')
            ->select('dat.id as idproduk','dat.produk','sat.satuan','jp.jenisproduk','jpd.jenisprodukdetail','kp.kategoriproduk',DB::raw('(CASE WHEN dat.statusenabled = 1 THEN "AKTIF" ELSE "TIDAK AKTIF" END) AS status')
            );

        if(isset($request['produk']) && $request['produk']!="" && $request['produk']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['produk'] .'%');
        };

        if(isset($request['idproduk']) && $request['idproduk']!="" && $request['idproduk']!="undefined") {
            $data = $data->where('dat.id', '=',$request['idproduk']);
        };

        if(isset($request['idjenisproduk']) && $request['idjenisproduk']!="" && $request['idjenisproduk']!="undefined") {
            $data = $data->where('dat.jenisprodukfk', '=',$request['idjenisproduk']);
        };

        if(isset($request['status']) && $request['status']!="" && $request['status']!="undefined") {
            $data = $data->where('dat.statusenabled', '=',$request['status']);
        };

        $data=$data->orderBy('dat.produk','asc');
        $data=$data->paginate($jumlah);
        
        return $this->respond($data);
    }

    public function getComboProduk(Request $request){

        $jenisproduk = \DB::table('jenisproduk_m as dat')
            ->select('dat.id', 'dat.jenisproduk')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $jenisprodukdetail = \DB::table('jenisprodukdetail_m as dat')
            ->select('dat.id', 'dat.jenisprodukdetail')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $satuan = \DB::table('satuan_m as dat')
            ->select('dat.id', 'dat.satuan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $kategoriproduk = \DB::table('kategoriproduk_m as dat')
            ->select('dat.id', 'dat.kategoriproduk')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();

        $jenispelayanan = \DB::table('jenispelayanan_m as dat')
            ->select('dat.id', 'dat.jenispelayanan')
            ->where('dat.statusenabled', true)
            ->orderBy('dat.id')
            ->get();
        

        $result = array(
            'jenisproduk' => $jenisproduk,
            'jenisprodukdetail' => $jenisprodukdetail,
            'satuan' => $satuan,
            'kategoriproduk' => $kategoriproduk,
            'jenispelayanan' => $jenispelayanan,
        );

        return $this->respond($result);
    }

    public function enableDisableProduk(Request $request)
    {
        $dataLogin =$request->all();

        DB::beginTransaction();
        $error='';

        try {

            Produk::where('id',$request['idproduk'])->update([
                'statusenabled' => $request['status']
            ]);

            $transStatus = 'true';
        } catch (\Exception $e) {
            $transStatus = 'false';
            $error = $e->getMessage();
        }

        if ($transStatus == 'true') {
            $transMessage = 'Update Data Berhasil';
            DB::commit();
            $result = array(
                'status' => 201,
                'message'=>$transMessage,
            );
        } else {
            $transMessage = 'Update Data Gagal';
            DB::rollBack();
            $result = array(
                'status' => 400,
                'error' => $error,
                'message'=>$transMessage,
            );
        }
       return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    public function getDaftarTarifLayanan( Request $request) {
        $jumlah = 10;
        if(isset($request['jumlahpage']) && $request['jumlahpage']!="" && $request['jumlahpage']!="undefined") {
            $jumlah = $request['jumlahpage'];
        };

        $data = \DB::table('harganettoproduk_m as hn')
            ->join('produk_m as dat','dat.id','=','hn.produkfk')
            ->leftjoin('jenisproduk_m as jp','jp.id','=','dat.jenisprodukfk')
            ->leftjoin('jenispelayanan_m as jpel','jpel.id','=','hn.jenispelayananfk')
            ->select('dat.id as idproduk','dat.produk','hn.id as idharganetto','hn.hargasatuan','jpel.jenispelayanan', 'jp.jenisproduk')
            ->whereIn('dat.jenisprodukfk',[1,3]);

        if(isset($request['produk']) && $request['produk']!="" && $request['produk']!="undefined") {
            $data = $data->where('dat.produk', 'like', '%'. $request['produk'] .'%');
        };

        if(isset($request['idproduk']) && $request['idproduk']!="" && $request['idproduk']!="undefined") {
            $data = $data->where('dat.id', '=',$request['idproduk']);
        };

        if(isset($request['idjenisproduk']) && $request['idjenisproduk']!="" && $request['idjenisproduk']!="undefined") {
            $data = $data->where('dat.jenisprodukfk', '=',$request['idjenisproduk']);
        };

        if(isset($request['idjenispelayanan']) && $request['idjenispelayanan']!="" && $request['idjenispelayanan']!="undefined") {
            $data = $data->where('dat.jenisprodukfk', '=',$request['idjenispelayanan']);
        };

        $data=$data->where('dat.statusenabled',true);
        $data=$data->orderBy('dat.produk','asc');
        $data=$data->paginate($jumlah);
        
        return $this->respond($data);
    }

    public function saveTarifLayanan(Request $request) {
        $datLogin =$request->all();
        $error="";

        DB::beginTransaction();
        try{

            if($request['idharganetto'] == '') {
                $nettoAda = HargaNettoProduk::where('produkfk',$request['idproduk'])->where('jenispelayananfk',$request['idjenispelayanan'])->get();

                if (count($nettoAda) > 0 ) {
                    $transMessage = "Data Harga Sudah Ada pada Jenis Pelayanan Silahkan Edit";
                    DB::rollBack();
                    $result = array(
                        "status" => 400,
                        "message" => $transMessage,
                    );
                    return $this->setStatusCode($result['status'])->respond($result, $transMessage);
                }

                $newId = HargaNettoProduk::max('id') + 1;

                $dataProd = new HargaNettoProduk();
                $dataProd->id = $newId;
                $dataProd->kdprofile = 0;
                $dataProd->statusenabled = true;
                $dataProd->norec =  $dataProd->generateNewId();

            }else{
                $dataProd = HargaNettoProduk::where('id',$request['idharganetto'])->first();
                $newId = $dataProd->id;
            }

            $dataProd->produkfk =  $request['idproduk'];
            $dataProd->jenispelayananfk =  $request['idjenispelayanan'];
            $dataProd->hargasatuan =  $request['hargasatuan'];
            
            $dataProd->pegawaiinputfk =  $datLogin['userData']['id'];
            $dataProd->save();


            $transStatus = 'true';
        } catch (\Exception $e) {
            $error = $e->getMessage();
            $transStatus = 'false';
        }

        if ($transStatus == 'true') {
            $transMessage = "Sukses";
            DB::commit();
            $result = array(
                'status' => 201,
                'message' => $transMessage,
            );
        } else {
            $transMessage = "Simpan Gagal";
            DB::rollBack();
            $result = array(
                'status' => 400,
                'message'  => $transStatus,
                'error' => $error
            );
        }
        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }



}
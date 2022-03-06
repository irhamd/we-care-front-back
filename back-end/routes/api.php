<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'pegawai'], function () {
    Route::post("/save-pegawai","Transaksi\PegawaiController@savePegawai");
    Route::get("/get-data-combo-pegawai","Transaksi\PegawaiController@getDataComboPegawai");
    Route::get("/get-daftar-pegawai","Transaksi\PegawaiController@getDaftarPegawai");
    Route::post("/save-user","Transaksi\PegawaiController@saveNewUser");
    Route::get("/get-daftar-user","Transaksi\PegawaiController@getDaftarUser");
    Route::get("/get-combo-user","Transaksi\PegawaiController@getComboUser");
});

Route::group(['prefix' => 'produk'], function () {
    Route::post("/save-produk-baru","Transaksi\ProdukController@saveProduk");
    Route::get("/get-daftar-produk","Transaksi\ProdukController@getDaftarProduk");
    Route::get("/get-combo-produk","Transaksi\ProdukController@getComboProduk");
    Route::post("/enable-disable-produk","Transaksi\ProdukController@enableDisableProduk");
    Route::get("/get-daftar-tarif-layanan","Transaksi\ProdukController@getDaftarTarifLayanan");
    Route::post("/save-tarif-layanan","Transaksi\ProdukController@saveTarifLayanan");
});

Route::post("/getMasterData","Transaksi\MasterController@getMasterData");


Route::group(['prefix' => 'pasien'], function () {
    Route::get("/compo-registrasi-pasien","Transaksi\PasienBaruController@getDataCombo");
    Route::get("/get-pasien-lama","Transaksi\PasienBaruController@getDaftarPasien");
    Route::post("/save-pasien-baru","Transaksi\PasienBaruController@savePasien");
    Route::get("/get-propinsi","Transaksi\PasienBaruController@getPropinsi");
    Route::get("/get-kotakabupaten","Transaksi\PasienBaruController@getKotaKab");
    Route::get("/get-kecamatan","Transaksi\PasienBaruController@getKecamatan");
    Route::get("/get-desakelurahan","Transaksi\PasienBaruController@getDesa");
    Route::get("/get-detail-pasien","Transaksi\PasienBaruController@getDetailPasien");
    Route::get("/get-riwayat-pendaftaran-pasien","Transaksi\PasienBaruController@getRiwayatPendaftaranPasien");
    Route::get("/get-detail-riwayat-pendaftaran","Transaksi\PasienBaruController@getDetailRiwayatPendaftaran");
    Route::get("/get-data-pasien/{pasienfk}","Transaksi\PasienBaruController@getDataPasienSingle");
});

Route::group(['prefix' => 'registrasi'], function () {
    Route::post("/save-registrasi-pelayanan","Transaksi\RegistrasiPasienController@saveRegistrasiPasien");
    Route::get("/compo-registrasi-pelayanan","Transaksi\RegistrasiPasienController@getDataComboRegistrasi");
    Route::get("/get-pasien-byid","Transaksi\RegistrasiPasienController@getPasienById");
    Route::get("/get-daftar-registrasi","Transaksi\RegistrasiPasienController@getDaftarRegistrasi");
    Route::get("/get-daftar-registrasi-rajal","Transaksi\RegistrasiPasienController@getDaftarRegistrasiRajal");
    Route::get("/get-daftar-registrasi-ranap","Transaksi\RegistrasiPasienController@getDaftarRegistrasiRanap");
    Route::get("/batal-registrasi-pasien","Transaksi\RegistrasiPasienController@batalRegistrasiPasien");
    Route::get("/panggil-registrasi-pasien","Transaksi\RegistrasiPasienController@panggilRegistrasi");

});

Route::group(['prefix' => 'tindakan'], function () {
    Route::post("/save-tindakan","Transaksi\TindakanPasienController@saveTindakan");
    Route::get("/get-tindakan-pasien","Transaksi\TindakanPasienController@getTindakanPasien");
    Route::post("/delete-tindakan-pasien","Transaksi\TindakanPasienController@deleteTindakanPasien");
    Route::get("/get-produk","Transaksi\TindakanPasienController@getProduk");
    Route::get("/get-pegawai","Transaksi\TindakanPasienController@getPegawai");

});

Route::group(['prefix' => 'diagnosa'], function () {
    Route::get("/get-pegawai-diagnosa","Transaksi\DiagnosaPasienController@getPegawai");
    Route::post("/save-diagnosa","Transaksi\DiagnosaPasienController@saveDiagnosa");
    Route::get("/get-daftar-diagnosa","Transaksi\DiagnosaPasienController@getDaftarDiagnosaPasien");
    Route::post("/delete-diagnosa","Transaksi\DiagnosaPasienController@deleteDiagnosaPasien");
    Route::get("/getMasterDiagnosa","Transaksi\DiagnosaPasienController@getMasterDiagnosa");

});

Route::group(['prefix' => 'bpjs'], function () {
    Route::get("/get-diagnosa-part","Transaksi\BridgingBPJSController@getDiagnosaPart");

});

Route::group(['prefix' => 'anamnesa'], function () {
    Route::post("/save-anamnesa-pasien","Transaksi\AnamnesaController@saveAnamnesaPasien");
    Route::get("/get-anamnesa-pasien","Transaksi\AnamnesaController@getAnamnesaPasien");
    Route::get("/get-combo-anamnesa","Transaksi\AnamnesaController@getDataComboAnamnesa");

});

Route::group(['prefix' => 'resep'], function () {
    Route::post("/save-resep-pasien","Transaksi\ResepPasienController@saveResepPasien");
    Route::get("/get-resep-pasien","Transaksi\ResepPasienController@getResepPasien");
    Route::get("/get-combo-resep","Transaksi\ResepPasienController@getComboResep");
    Route::get("/get-produk-resep-part","Transaksi\ResepPasienController@getProdukResepPart");
    Route::post("/delete-item-resep","Transaksi\ResepPasienController@deleteItemResep");
    Route::get("/get-all-produk-obat","Transaksi\ResepPasienController@getAllObat");

});

Route::group(['prefix' => 'lab'], function () {
    Route::post("/save-blanko-lab","Transaksi\PemeriksaanLabController@saveBlankoLab");
    Route::get("/get-blanko-lab","Transaksi\PemeriksaanLabController@getBlankoLab");
    Route::get("/get-produk-blanko-lab","Transaksi\PemeriksaanLabController@getProdukBlankoLab");
    Route::post("/delete-item-blanko-lab","Transaksi\PemeriksaanLabController@deleteItemBlankoLab");
    Route::post("/save-pemeriksaan-lab","Transaksi\LaboratoriumController@savePemeriksaanLab");
    Route::get("/get-daftar-pasien-blankolab","Transaksi\LaboratoriumController@getDaftarPasienBlankoLab");
    Route::get("/get-detail-blankolab-bynorec","Transaksi\LaboratoriumController@getDetailBlankoLabByNorec");
    Route::get("/get-daftar-pasien-pelayanan-lab","Transaksi\LaboratoriumController@getDaftarPasienPelayananLab");
    Route::get("/get-detail-pelayanan-lab","Transaksi\LaboratoriumController@getDetailLabByNoregistrasi");
    Route::get("/get-produk-lab","Transaksi\LaboratoriumController@getProdukLab");
    Route::get("/get-ruangan-lab","Transaksi\LaboratoriumController@getRuanganLab");
    Route::get("/get-pegawai-lab","Transaksi\LaboratoriumController@getPegawaiLab");
    Route::post("/delete-pelayanan-lab","Transaksi\LaboratoriumController@deletePelayananLab");

});

Route::group(['prefix' => 'penerimaanbarang'], function () {
    Route::post("/save-penerimaan-barang","Transaksi\PenerimaanBarangController@savePenerimaanBarang");
    Route::get("/get-daftar-head-penerimaan","Transaksi\PenerimaanBarangController@getDaftarHeadPenerimaan");
    Route::get("/get-produk-penerimaan-barang","Transaksi\PenerimaanBarangController@getProdukPenerimaanBarang");
    Route::get("/get-combo-penerimaan-barang","Transaksi\PenerimaanBarangController@getComboPenerimaanBarang");
    Route::get("/get-detail-penerimaan-bynorec","Transaksi\PenerimaanBarangController@getDetailPenerimaanByNorec");
    Route::post("/delete-penerimaan-barang-detail","Transaksi\PenerimaanBarangController@deletePenerimaanBarangDetail");
    Route::get("/get-daftar-kartu-stok","Transaksi\PenerimaanBarangController@getDaftarKartuStok");

});

Route::group(['prefix' => 'kirimbarang'], function () {
    Route::post("/save-kirim-barang","Transaksi\KirimBarangController@saveKirimBarang");
    Route::get("/get-daftar-kirim-barang","Transaksi\KirimBarangController@getDaftarKirimBarang");
    Route::get("/get-detail-kirim-bynokirim","Transaksi\KirimBarangController@getKirimBarangByNoKirim");
    Route::get("/get-combo-kirim-barang","Transaksi\KirimBarangController@getComboKirimBarang");
    Route::get("/get-produk-kirim-barang","Transaksi\KirimBarangController@getProdukKirimBarang");
    Route::post("/batal-kirim-barang","Transaksi\KirimBarangController@batalKirimBarang");

});

Route::group(['prefix' => 'apotik'], function () {
    Route::post("/save-obat-pasien","Transaksi\ApotikController@saveObatPasien");
    Route::get("/get-daftar-pasien-obat","Transaksi\ApotikController@getDaftarPasienPelayananObat");
    Route::get("/get-detail-obat-bystruk","Transaksi\ApotikController@getDetailObatByNoregistrasi");
    Route::get("/get-daftar-pasien-resep","Transaksi\ApotikController@getDaftarPasienResep");
    Route::get("/get-detail-resep-bynores","Transaksi\ApotikController@getResepPasienByNorecRes");
    Route::get("/get-produk-pelayanan-obat","Transaksi\ApotikController@getProdukPelayananObat");
    Route::get("/get-pegawai-pelayanan-obat","Transaksi\ApotikController@getPegawaiObat");
    Route::get("/get-ruangan-pelayanan-obat","Transaksi\ApotikController@getRuanganObat");
    Route::post("/delete-pelayanan-obat","Transaksi\ApotikController@deletePelayananObatPasien");
    Route::get("/get-stok-obat","Transaksi\ProdukController@getStokObat");

});

Route::group(['prefix' => 'kasir'], function () {
    Route::get("/get-daftar-pasien-pulang","Transaksi\KasirController@getDaftarPasienPulang");
    Route::get("/get-combo-pasien-pulang","Transaksi\KasirController@getDataComboPasienPulang");
    Route::get("/get-detail-pelayanan-verif-bynoregistrasi","Transaksi\KasirController@getDetailPelayananVerifByNoregistrasi");
    Route::post("/save-verifikasi-pelayanan","Transaksi\KasirController@saveVerifikasiPelayanan");
    Route::get("/get-rincian-pelayanan-pasien","Transaksi\KasirController@getRincianPelayananPasien");
    Route::post("/save-pembayaran-pasien","Transaksi\KasirController@savePembayaranPasien");
    Route::get("/get-daftar-verifikasi-pelayanan","Transaksi\KasirController@getDaftarVerifikasiLayanan");
    Route::post("/delete-pembayaran-pasien","Transaksi\KasirController@batalPembayaranPasien");
    Route::get("/get-daftar-pasien-bayar","Transaksi\KasirController@getDaftarPasienBayar");
    Route::delete("/hapus-pelayanan","Transaksi\KasirController@hapusPelayananPasien");

});

Route::group(['prefix' => 'laporanharian'], function () {
    Route::get("/get-kunjungan-harian","Transaksi\LaporanHarianController@getKunjunganHarian");
    Route::get("/get-pengunjung-harian","Transaksi\LaporanHarianController@getPengunjungHarian");

});
Route::group(['prefix' => 'kartupasien'], function () {
    Route::get("/get-kartu-pasien","Transaksi\KartuPasienController@getKartuPasien");
});

Route::group(['prefix' => 'rekammedis'], function () {
    Route::get("/coding","Transaksi\KartuPasienController@getKartuPasien");
});



Route::get("/sign-in","Auth\LoginUserController@loginUser");
Route::get("/send-email","Mail\MailController@sendMail");


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

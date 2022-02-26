<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 // Route::get("/compo-registrasi-pasien","Transaksi\PasienBaruController@getDataCombo");
 // Route::get("/testor","Transaksi\PasienBaruController@getDaftarPasien");
 // Route::get("/sign-in","Auth\LoginUserController@loginUser");


Route::get('/', function () {
    return view('welcome');
});

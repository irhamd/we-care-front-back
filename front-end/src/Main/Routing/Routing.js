import React from 'react'
import { BrowserRouter, Router, Link, Route, Switch, useHistory, Redirect, HashRouter } from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Contact from '../../Pages/Contact/Contact'
import AttemptAuth from '../_Auth/AttemptAuth'
import { Slide, ToastContainer, Zoom } from 'react-toastify'
import ReactNotification from 'react-notifications-component'
import '../../_Assets/react-notifications-component.css'
import InputPasienBaru from '../../Pages/Pasien/InputPasienBaru'
import Home from '../../Pages/Home'
import ProtectedRoute from '../../Services/Route/ProtectedRoute'
import DataUser from '../../Pages/User/DataUser'
import _MainMenu from '../../Pages/Menu/_MainMenu'
import DataPasienLama from '../../Pages/Pasien/DataPasienLama'
import Test from '../../Pages/Test/Test'
import PasienDaftar from '../../Pages/Transaksi/PasienDaftar/PasienDaftar'
import RegistrasiPasien from '../../Pages/RegistrasiPasien/RegistrasiPasien'
import PengkajianMedis from '../../Pages/Transaksi/PengkajianMedis'
import InputResep from '../../Pages/Transaksi/Resep/InputResep'
import InputHasilLab from '../../Pages/Transaksi/Penunjang/Lab/InputHasilLab'
import RequestPemriksaanLab from '../../Pages/Transaksi/Penunjang/Lab/RequestPemriksaanLab'
import PenerimaaanBarang from '../../Pages/Transaksi/PenerimaanBarang/Index'
import PengirimanBarang from '../../Pages/Transaksi/PengirimanBarang'
import DaftarPengirimanBarang from '../../Pages/Transaksi/PengirimanBarang/DaftarPengirimanBarang'
import ProsesResep from '../../Pages/Transaksi/Apotek/ProsesResep'
import ProsesInputResep from '../../Pages/Transaksi/Apotek/ProsesResep/ProsesInputResep'
import ResepPasien from '../../Pages/Transaksi/Apotek/ResepPasien'
import DaftarPasienPelayananLab from '../../Pages/Transaksi/Penunjang/DaftarPasienLaboraturium/DaftarPasienPelayananLab'
import InputPelayananDiLab from '../../Pages/Transaksi/Penunjang/DaftarPasienLaboraturium/InputPelayananDiLab/InputPelayananDiLab'
import DetailTransaksi from '../../Pages/Transaksi/DetailTransaksi/DetailTransaksi'
import ShowWebcam from '../../Services/Webcam/ShowWebcam'
import DaftarPasienPulang from '../../Pages/Transaksi/Kasir/DaftarPasienPulang'
import VerifikasiTindakan from '../../Pages/Transaksi/Kasir/VerifikasiTindakan'
import DataPegawai from '../../Pages/Transaksi/Pegawai/DataPegawai'
import InputPegawai from '../../Pages/Transaksi/Pegawai/InputPegawai'
import DataPembayaran from '../../Pages/Transaksi/Kasir/DataPembayaran'
import DataProduk from '../../Pages/Transaksi/Produk/DataProduk'
import TarifLayanan from '../../Pages/Transaksi/Produk/TarifLayanan'
import TestFirebase from '../../Pages/Test/Test-Firebase'
import KartuPasien from '../../Pages/RegistrasiPasien/KartuPasien'
import StokObat from '../../Pages/Transaksi/Apotek/StokObat'
import { Print } from '../../Pages/Test/Print'
import Kasir from '../../Pages/Kasir/Kasir'
import Coding from '../../Pages/RekamMedis/Coding'
// import InputPengaduanPasien from '../../MPP/InputPengaduanPasien'



function Routing() {
    const his = useHistory();
    const c404 = () => {
        return (
            <Redirect to={{ pathname: '/home' }} />
        )
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={AttemptAuth} />
                <ProtectedRoute path="/Dashboard" exact component={Dashboard} />
                <ProtectedRoute path="/home" component={Home} />
                <ProtectedRoute path="/contact/:id" component={Contact} />
                {/* <ProtectedRoute path="/DataPasienLama" component={Print} /> */}
                <ProtectedRoute path="/DataPasienLama" component={DataPasienLama} />
                <ProtectedRoute path="/RegistrasiPasien" component={RegistrasiPasien} />
                <ProtectedRoute path="/PasienDaftar/:detailpasien" component={PasienDaftar} />
                <ProtectedRoute path="/PengkajianMedis/:detailpd" component={PengkajianMedis} />
                <ProtectedRoute path="/Resep/:detailpd" component={InputResep} />
                <ProtectedRoute path="/InputPasienBaru" component={InputPasienBaru} />
                <Route path="/Menu" component={_MainMenu} />
                <ProtectedRoute path="/DataUser" component={DataUser} />
                <Route path="/test" exact  component={Test} />
                <Route path="/test/firebase" component={TestFirebase} />

                {/* LABOLATURIUM */}
                <ProtectedRoute path="/RequestPemriksaanLab" component={RequestPemriksaanLab} />
                <ProtectedRoute path="/KartuPasien/:nocm/:nocmfk" component={KartuPasien} />


                {/* PENERIMAAN BARANG */}
                <ProtectedRoute path="/PenerimaaanBarang/:key" component={PenerimaaanBarang} />
                <ProtectedRoute path="/PengirimanBarang" component={PengirimanBarang} />
                <ProtectedRoute path="/DaftarPengirimanBarang" component={DaftarPengirimanBarang} />
                <ProtectedRoute path="/ProsesResep" exact component={ProsesResep} />
                <ProtectedRoute path="/ProsesResep/:norec_pd" component={ProsesInputResep} />
                <ProtectedRoute path="/ResepPasien" component={ResepPasien} />

                <ProtectedRoute path="/DaftarPasienPelayananLab" component={DaftarPasienPelayananLab} />
                <ProtectedRoute path="/InputPelayananDiLab" component={InputPelayananDiLab} />

                <ProtectedRoute path="/DetailTransaksi/:noregistrasi" component={DetailTransaksi} />
                <ProtectedRoute path="/ShowWebcam" component={ShowWebcam} />


                {/* KASIR */}
                <ProtectedRoute path="/Kasir/DaftarPasienPulang" component={DaftarPasienPulang} />
                <ProtectedRoute path="/Kasir/DataPembayaran" component={DataPembayaran} />
                <ProtectedRoute path="/VerifikasiTindakan/:noregistrasi/:norec_pd/:idpenjamin" component={VerifikasiTindakan} />


                {/* PEGAWAI */}
                <ProtectedRoute path="/DataPegawai" exact component={DataPegawai} />
                <ProtectedRoute path="/DataPegawai/InputPegawai" component={InputPegawai} />

                {/* PRODUK */}
                <ProtectedRoute path="/Produk/DataProduk" exact component={DataProduk} />
                <ProtectedRoute path="/Produk/TarifLayanan" exact component={TarifLayanan} />
                <ProtectedRoute path="/StokObat" exact component={StokObat} />

                {/* LAPORAN */}
                <ProtectedRoute path="/Laporan/Dashboard" exact component={Test} />

                {/* KASIR */}
                <ProtectedRoute path="/Kasir" component={Kasir} />

                {/* REKAM MEDIS */}
                <ProtectedRoute path="/RM/Coding"  component={Coding} />



                <Route path="*" component={() => c404()} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routing

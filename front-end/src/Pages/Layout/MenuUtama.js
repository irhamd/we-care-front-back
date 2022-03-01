import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button, Drawer, Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
    UserOutlined, LaptopOutlined, PlayCircleOutlined, NotificationOutlined, DownloadOutlined, SyncOutlined, UserSwitchOutlined,
    LogoutOutlined, BarChartOutlined, DribbbleSquareOutlined, SendOutlined, ShareAltOutlined, ThunderboltOutlined, TransactionOutlined,
    MenuUnfoldOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, AppstoreOutlined, SettingOutlined, AppstoreAddOutlined, ShoppingCartOutlined, ApiOutlined, LoginOutlined, MoneyCollectOutlined, DeploymentUnitOutlined, UsergroupAddOutlined, DollarCircleOutlined, FileProtectOutlined, DiffOutlined, InfoCircleOutlined, MenuFoldOutlined
}
    from '@ant-design/icons';
import _Api from '../../Services/Api/_Api';

// import "../../_Assets/header/menu.css";

import { Link } from 'react-router-dom';
import { css } from '../../_Assets/custom-css';
import Avatar from 'antd/lib/avatar/avatar';
import { mainColor } from '../../Services/Color';
import { ubahText } from '../../Services/Crypto';
import { dataUser } from '../../Services/Cache/Auth';
import { Cache } from '../../Services/Cache';





function MenuUtama(R) {
    const user = JSON.parse(Cache.get('x-auth-resu'))
    
    // alert(JSON.parse(Cache.get('x-auth-resu')).namalengkap)

    const { SubMenu } = Menu;


    return (
        <div>
            <Menu
                // onClick={this.handleClick}
                // defaultSelectedKeys={['1']}
                theme="dark"
                mode="horizontal"
                onSelect={R.onClose}
                style={{ background: "#001529" }}
            >
                {/* <Menu.Item icon={<AppstoreOutlined />} key="2"> <Link to={"/InputPasienBaru"}> Input Pasien Baru </Link></Menu.Item> */}
                <Menu.Item icon={< BarChartOutlined />} key="1">  <Link to={"/DataPasienLama"}> Data Pasien </Link></Menu.Item>
                <Menu.Item icon={<BarChartOutlined />} key="2"> <Link to={"/RegistrasiPasien"}> Daftar Registrasi Pasien </Link></Menu.Item>
                {/* <Menu.Item icon={<BarChartOutlined />} key="2"> <Link to={"/RegistrasiPasien"}> Daftar Registrasi Pasien </Link></Menu.Item> */}
                <SubMenu key="sub2" icon={<BarChartOutlined />} title="Penunjang">
                    <Menu.Item icon={<AppstoreOutlined />} key="5"><Link to={"/DaftarPasienPelayananLab"}> Daftar Pasien Lab </Link></Menu.Item>

                </SubMenu>
                <SubMenu key="sub4" icon={<ShareAltOutlined />} title="Apotek">
                    {/* <Menu.Item key="4-1" icon={<MenuFoldOutlined />}><Link to={"/ProsesResep"}> Daftar Permintaan Resep  </Link></Menu.Item> */}
                    <Menu.Item key="4-2" icon={<MenuFoldOutlined />}><Link to={"/ResepPasien"}> List Resep Pasien  </Link></Menu.Item>
                    <Menu.Item key="4-3" icon={<MenuFoldOutlined />}><Link to={"/StokObat"}> Stok Obat  </Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub5" icon={<ShoppingCartOutlined />} title="Penerimaan Barang">
                    <SubMenu key="sub51" icon={<BarChartOutlined />} title="Penerimaan">
                        <Menu.Item key="51-1" icon={<MenuFoldOutlined />}> <Link to={"/PenerimaaanBarang/1"}>   Input Barang Masuk </Link></Menu.Item>
                        <Menu.Item key="51-2" icon={<MenuFoldOutlined />}> <Link to={"/PenerimaaanBarang/2"}>   Data Penerimaan Barang </Link></Menu.Item>
                        <Menu.Item key="51-3" icon={<MenuFoldOutlined />}> <Link to={"/PenerimaaanBarang/3"}>   Kartu Stok </Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub61" icon={<BarChartOutlined />} title="Distribusi">
                        <Menu.Item key="61-1" icon={<ShareAltOutlined />}> <Link to={"/PengirimanBarang"}>   Kirim Barang </Link></Menu.Item>
                        <Menu.Item key="61-2" icon={<ShareAltOutlined />}> <Link to={"/DaftarPengirimanBarang"}>   Daftar Pengiriman Barang </Link></Menu.Item>
                    </SubMenu>
                </SubMenu>
                {/* <SubMenu key="sub8" icon={<ApiOutlined />} title="Rujukan">
                    <Menu.Item key="81-1" icon={<LogoutOutlined />}> <Link to={"/login"}>   Rujukan External </Link></Menu.Item>
                    <Menu.Item key="82-2" icon={<LoginOutlined />}> <Link to={"/login"}>   Rujukan Internal </Link></Menu.Item>
                </SubMenu> */}

                <SubMenu key="sub9" icon={<DollarCircleOutlined />} title="Kasir">
                    <Menu.Item key="91-1" icon={<DeploymentUnitOutlined />}> <Link to={"/Kasir/DaftarPasienPulang"}> Daftar Pasien Pulang  </Link></Menu.Item>
                    <Menu.Item key="91-2" icon={<DeploymentUnitOutlined />}> <Link to={"/Kasir/DataPembayaran"}> Data Pembayaran  </Link></Menu.Item>
                    {/* <Menu.Item key="92-2" icon={<LoginOutlined />}> <Link to={"/login"}>   Rujukan Internal </Link></Menu.Item> */}
                </SubMenu>

                <SubMenu key="sub10" icon={<UsergroupAddOutlined />} title="Pegawai">
                    <Menu.Item key="10-1" icon={<DeploymentUnitOutlined />}> <Link to={"/DataPegawai"}> Data Pegawai  </Link></Menu.Item>
                    {/* <Menu.Item key="92-2" icon={<LoginOutlined />}> <Link to={"/login"}>   Rujukan Internal </Link></Menu.Item> */}
                </SubMenu>

                <SubMenu key="sub11" icon={<DeploymentUnitOutlined />} title="Produk">
                    <Menu.Item key="11-1" icon={<FileProtectOutlined />}> <Link to={"/Produk/DataProduk"}> Data Produk  </Link></Menu.Item>
                    <Menu.Item key="11-2" icon={<DiffOutlined />}> <Link to={"/Produk/TambahProduk"}> Produk Baru  </Link></Menu.Item>
                    <Menu.Item key="11-3" icon={<InfoCircleOutlined />}> <Link to={"/Produk/TarifLayanan"}> Tarif Layanan  </Link></Menu.Item>
                    {/* <Menu.Item key="92-2" icon={<LoginOutlined />}> <Link to={"/login"}>   Rujukan Internal </Link></Menu.Item> */}
                </SubMenu>

                <SubMenu key="sub12" icon={<PieChartOutlined />} title="Laporan">
                    <Menu.Item key="12-1" icon={<FileProtectOutlined />}> <Link to={"/Laporan/Dashboard"}> Laporan Kunjungan  </Link></Menu.Item>
                </SubMenu>










                <SubMenu style={{ float: "right", background: "#094783", color: "whitesmoke", borderWidth: "20px", borderStyle: "revert", fontWeight: "bold" }} key="sub7" icon={<UserSwitchOutlined />} title={user.namalengkap}>
                    <Menu.Item key="71-2" icon={<SettingOutlined />}> <Link to={"/"}>   Setting </Link></Menu.Item>
                    <Menu.Item key="71-1" icon={<LogoutOutlined />}> <Link to={"/login"}>   Logout </Link></Menu.Item>
                </SubMenu>


            </Menu>
        </div>
    )
}

export default MenuUtama

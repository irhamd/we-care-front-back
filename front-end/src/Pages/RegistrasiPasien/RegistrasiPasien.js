import React, { useEffect, useState } from 'react'
import { DivCol, _Button, _Date, _Input, _Select, _Switch, _TitleBar } from '../../Services/Forms/Forms'
import { _grid, _Row, _row } from '../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import _Api from '../../Services/Api/_Api';
import { acakText } from '../../Services/Crypto';
import { fDB, fitrah, formatTglWaktu } from '../../Services/Text/GlobalText';
import foto from "../../_Assets/foto/users.png"
import { Col, Row } from 'react-bootstrap';
import { _Push } from '../../Services/Route/ProtectedRoute';
import { Cache } from '../../Services/Cache';



function RegistrasiPasien() {
    const [data, setData] = useState([])
    const [selected, setselected] = useState()
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    // const [selected, selected] = useState("")

    const [combo, setcombo] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

    const LoadData = (val) => {
        setLoading(true)
        _Api.get("registrasi/get-daftar-registrasi", {
            params: val ? { ...val, tglAwal: fDB(val.tglAwal), tglAkhir: fDB(val.tglAkhir) } : filterData
        }).then(res => {
            setData(res.data.daftar)
            setLoading(false)
        })
    }

    const isiCombobox = () => {
        _Api.get("registrasi/compo-registrasi-pelayanan").then(res => {
            setcombo(res.data)
        })
    }

    useEffect(() => {
        LoadData();
        isiCombobox();
    }, [])

    const pengkajianMedis = () => {
        if (!detailpasien) {
            _Toastr.error("Silahkan pilih data ...")
            return
        }
        histori.push("PengkajianMedis/" + detailpasien)

    }
    const inputResep = () => {
        if (!detailpasien) {
            _Toastr.error("Silahkan pilih data ...")
            return
        }
        // console.log('detailpasien', detailpasien)
        histori.push("ProsesResep/" + detailpasien)
    }
    const detailTransaksi = () => {
        if (!detailpasien) {
            _Toastr.error("Silahkan pilih data ...")
            return
        } else {
            histori.push("/DetailTransaksi/" + selected.noregistrasi)
        }
    }


    const columns = [
        {
            title: 'No',
            width: 100,
            align: "center",
            render: (text, row, index) => (
                <> {index + 1} </>
            ),
        },
        {
            title: 'Tanggal Registrasi',
            render: (_, rc) =>
                <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}
                </div>,
            // fixed: 'left',
            width: 150
        },
        {
            title: 'Status Antrian',
            width: 150,
            render: row => (
                <>
                    <Tag icon={<SyncOutlined spin />} color="error" style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", textAlign: "center" }}>
                        Menunggu
                    </Tag>
                </>
            ),
        },

        {
            title: 'No. Registrasi',
            width: 150,
            dataIndex: 'noregistrasi',
            sorter: (a, b) => a.noregistrasi.length - b.noregistrasi.length,
        },
        {
            title: 'Instalasi',
            width: 200,
            render: row => (
                <>
                    <Tag color="blue" style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", textAlign: "center" }}>
                        {row.instalasi}
                    </Tag>
                </>
            ),
        },
        {
            width: 150,
            title: 'Inputan',
            render: (_, rc) =>
                <div style={{ textAlign: "center" }}>
                    <Avatar.Group>
                        <Avatar style={{ backgroundColor: '#156dbf' }}>T</Avatar>
                        <Avatar>D</Avatar>
                        <Avatar>R</Avatar>
                    </Avatar.Group>
                    {/* <Progress percent={100} steps={3} /> */}
                </div>
        },
        {
            title: 'No. RM',
            width: 130,
            dataIndex: 'nocm',
            sorter: (a, b) => a.nocm.length - b.nocm.length,
        },
        {
            width: "70px",
            width: 70,
            render: (_, rc) =>
                data.length >= 1 ? (
                    <Badge count={1}>
                        <Image style={{ width: "100%", padding: "4px" }} src={rc.foto ? rc.foto : foto} />
                    </Badge>

                ) : null,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien',
            width: 250,
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Umur',
            width: 100,
            render: (_, rc) =>
                <div> {fitrah.getUmur(rc.tgllahir)} </div>
        },
        {
            title: 'Nama Ruangan',
            width: 300,
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
            render: row => (
                <>
                    <Tag color="blue" style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", textAlign: "center" }}>
                        {row.ruangan}
                    </Tag>
                </>
            ),
        },

        {
            width: 50,
            title: 'JK',
            dataIndex: 'jeniskelamin',
            sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,
        },
        // {
        //     title: 'Penjamin',
        //     dataIndex: 'penjamin',
        // },

        {
            width: 150,
            title: 'Penjamin',
            render: (_, rc) =>
                <div>
                    <Tag color={"orange"}>
                        {rc.penjamin}
                    </Tag>
                </div>
        },

        // {
        //     width: 150,
        //     title: 'Asal Rujukan',
        //     dataIndex: 'asalrujukan',
        // },
        {
            width: 70,
            title: 'Lunas',
            render: (_, rc) =>
                <div>
                    <Rate disabled value={0} count={1} />
                </div>
        },
    ];

    const pushLab = () => {
        // histori.push("/RequestPemriksaanLab")
        // Cache.set("pasien_pd",  JSON.stringify("ffff"))
    }

    const pushKartuPasien = () => {
        if (!detailpasien) {
            _Toastr.error("Silahkan pilih data ...")
            return
        } else {
            // console.log(selected)
            histori.push("/KartuPasien/" + selected.noregistrasi +"/"+selected.nocmfk)
        }

        // Cache.set("pasien_pd",  JSON.stringify("ffff"))
    }

    return (
        <LayoutAnt pl="10px" mr="40px">
            <_TitleBar title="Daftar Registrasi Pasien" align="center" />
            <DivCol pl="13px">
                <Form layout={"vertical"} onFinish={LoadData} initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }} >
                    <_Row >
                        <_Date sm={2} name="tglAwal" showTime label="Tanggal" />
                        <_Date sm={2} name="tglAkhir" label=" " showTime />
                        {/* <_Select sm={2} name="instalasi" option={combo.instalasi} label="Instalasi" val="id" caption="instalasi" /> */}
                        <_Select sm={2} option={combo.ruangan} label="Ruangan" val="id" name="idruangan" caption="ruangan" />
                        <_Input sm={1} label="No. RM" name="nocm" />
                        <_Input sm={1} label="Nama Pasien" name="namapasien" />
                        <_Input sm={1} label="No. Registrasi" name="noregistrasi" />
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Refresh" />
                    </_Row>
                </Form>
            </DivCol>
            <br />
                <Table
                    rowKey="noregistrasi"
                    // rowSelection={{
                    //     type: "radio",
                    //     ...rowSelection,
                    // }}
                    rowClassName={(record, index) => record == selected && 'bg-orange'}
                    pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                    columns={columns}
                    loading={loading}
                    scroll={{ x: 800, y: 400 }}
                    dataSource={data}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setselected(record)
                                let aa = JSON.stringify(record)
                                // console.log('aa', aa)
                                setdetailpasien(acakText(aa))
                            }, // click row
                            // onDoubleClick: event => { alert(rowIndex) }, // double click row
                        };
                    }}
                />
            <DivCol pl="10px" pr="30px">
                <_Row>
                    <_Button sm={2} icon={<BranchesOutlined />} color="orange"
                        primary onClick={pengkajianMedis} title="Pengkajian Pasien" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary onClick={detailTransaksi}
                        title="Detail Tagihan" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary
                        title="Riwayat Registrasi" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary
                        title="Resep" onClick={inputResep} block />

                    {/* <_Button sm={2} icon={<FileSearchOutlined />} primary title="Blanko Lab" onClick={pushLab} block /> */}

                    <_Button sm={2} icon={<FileSearchOutlined />} primary danger title="Batal Registrasi" onClick={pushLab} block />
                    <_Button sm={2} icon={<FileSearchOutlined />} primary  title="Kartu Pasien" onClick={pushKartuPasien} block />

                </_Row>
            </DivCol>
            <br />
            <br />
            <br />
            <br />
            <br />

        </LayoutAnt>
    )
}

export default RegistrasiPasien

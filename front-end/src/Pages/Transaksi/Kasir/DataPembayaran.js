import React, { useEffect, useState } from 'react'
// import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { DivCol, _Button, _Date, _Input, _Select, _Switch, _TitleBar } from '../../../Services/Forms/Forms';
// import { _grid, _row } from '../../Services/Forms/LayoutBootstrap'
// import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
// import _Api from '../../Services/Api/_Api';

import _Api from '../../../Services/Api/_Api';
import { acakText } from '../../../Services/Crypto';
import LayoutAnt from '../../Layout/LayoutAnt';
import { fitrah, formatNumber } from '../../../Services/Text/GlobalText';
import { Row } from 'react-bootstrap';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';




function DataPembayaran() {
    const [data, setData] = useState([])
    const [selected, setselected] = useState()
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    // const [selected, selected] = useState("")




    const [combo, setcombo] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData, setfilterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

    const handeleFilter = (field) => (e) => {
        // let isMoment =   
        let isMoment = e ? e._isAMomentObject : false
        setfilterData({
            ...filterData,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss') : e && e.target.value
        });
    };

    const LoadData = () => {
        setLoading(true)
        _Api.get("kasir/get-daftar-pasien-bayar", {
            params: filterData
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

    const hapusPembayaran = () => {
        if (!selected) {
            _Toastr.error('Silahkan pilih data ...')
            return
        }
        _Api.post("kasir/delete-pembayaran-pasien", { norec_spem: selected && selected.norec_spem }).then(res => {
            _Toastr.success("Pembayaran telah di batalkan ...")
            LoadData()
            setselected(null)
        }).catch(err => {
            _Toastr.error("Batal bayar ...")
        })
    }

    useEffect(() => {
        LoadData();
        isiCombobox();
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
            let aa = JSON.stringify(selectedRows[0])
            console.log(`aa`, selectedRowKeys)
            setselected(selectedRowKeys)
            // setselected(selectedRows[0])

        },

    };

    // "norec_spem": "3102f3f0-002d-11ec-a592-eb253a1a",
    // "tglstruk": "2021-08-18 21:04:23",
    // "nostrukpembayaran": "SB0000000000003",
    // "totalbayar": 444,
    // "kasir": null,
    // "namapasien": "Alam Sadar",
    // "nocm": "P00000017",
    // "noregistrasi": "2108000011",
    // "ruangan": "Poli Umum",
    // "carabayar": "TUNAI"

    const verifikasiTindakan = () => {
        histori.push("VerifikasiTindakan/" + selected.noregistrasi + "/" + selected.norec_pd + "/" + selected.idpenjamin)
    }
    const columns = [
        {
            title: 'No',
            width: 50,
            render: (text, rc, idx) => (
                <div> {idx + 1} </div>
            )
        },
        {
            title: 'No. Struk',
            width: 150,
            dataIndex: 'nostrukpembayaran',
            sorter: (a, b) => a.nostrukpembayaran.length - b.nostrukpembayaran.length,
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
                    <Tag color="green" style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", fontWeight: "bold" }}>
                        Rp, {formatNumber(row.totalbayar)}
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
            title: 'No. RM',
            width: 130,
            dataIndex: 'nocm',
            sorter: (a, b) => a.nocm.length - b.nocm.length,
        },

        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien',
            width: 350,
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Kasir',
            width: 200,
            render: (_, rc) =>
                <div> {rc.kasir} </div>
        },
        {
            title: 'Nama Ruangan',
            width: 200,
            dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
            filters: [
                {
                    text: 'Poli Umum',
                    value: 'Poli Umum',
                },
                {
                    text: 'IMUNISASI',
                    value: 'IMUNISASI',
                },
            ],
            onFilter: (value, record) => record.ruangan.indexOf(value) === 0,
        },
        {
            width: 100,
            title: 'Cara Bayar',
            render: (_, rc) =>
                <div>
                    <Tag color="orange"> {rc.carabayar} </Tag>
                </div>
        },
    ];

    return (
        <LayoutAnt pl="10px" >
            <_TitleBar align="center" title="DATA PEMBAYARAN" />
            <DivCol pl="13px">
                <Form layout={"vertical"} onFinish={LoadData} >
                    <Row >
                        <_Date sm={2} onChange={handeleFilter('tglAwal')} showTime label="Tanggal" defaultValue={moment(tglAwal)} />
                        <_Date sm={2} onChange={handeleFilter('tglAkhir')} label=" " showTime defaultValue={moment(tglAkhir)} />
                        {/* <_Select sm={2} option={combo.instalasi} label="Instalasi" val="id" caption="instalasi" /> */}
                        <_Select sm={2} option={combo.ruangan} label="Ruangan" val="id" caption="ruangan" />
                        <_Input sm={1} label="No. RM" onChange={handeleFilter('nocm')} />
                        <_Input sm={1} label="Nama Pasien" onChange={handeleFilter('namapasien')} />
                        <_Input sm={1} label="No. Registrasi" onChange={handeleFilter('noregistrasi')} />
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Refresh" />
                    </Row>
                </Form>
            </DivCol>
            <br />
            <DivCol >
                <Table
                    rowKey="norec_spem"
                    // rowSelection={{
                    //     type: "checkbox",
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
                            onClick: event => { setselected(record) }, // click row
                            // onDoubleClick: event => { alert(rowIndex) }, // double click row
                        };
                    }}
                />
            </DivCol>
            <DivCol pl="10px">
                <Row>
                    <_Button sm={2} icon={<BranchesOutlined />} color="red"
                        primary onClick={hapusPembayaran} title="Hapus / Batal Bayar " block />


                </Row>
            </DivCol>
            <br />
            <br />
            <br />
            <br />
            <br />

        </LayoutAnt>
    )
}

export default DataPembayaran

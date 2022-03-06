import React, { useEffect, useState } from 'react'
// import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined, StopOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { DivCol, _Button, _Date, _Input, _Select, _Switch, _TitleBar } from '../../../Services/Forms/Forms';
// import { _grid, _row } from '../../Services/Forms/LayoutBootstrap'
// import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
// import _Api from '../../Services/Api/_Api';

import _Api from '../../../Services/Api/_Api';
import { acakText } from '../../../Services/Crypto';
import LayoutAnt from '../../Layout/LayoutAnt';
import { fitrah } from '../../../Services/Text/GlobalText';
import { Row } from 'react-bootstrap';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';




function DaftarPasienPulang() {
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
        _Api.get("kasir/get-daftar-pasien-pulang", {
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

    useEffect(() => {
        LoadData();
        isiCombobox();
    }, [])

    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
    //         let aa = JSON.stringify(selectedRows[0])
    //         setselected(selectedRows[0])
    //         setdetailpasien(acakText(aa))
    //         // Cache.set("detailpasien", detailpasien)
    //     },
    //     getCheckboxProps: (record) => ({
    //         name: record.row,
    //     }),
    // };

    const verifikasiTindakan = () => {
        if (!selected) {
            _Toastr.error("Silahkan pilih data ...")
            return
        } 
        histori.push("/VerifikasiTindakan/" + selected.noregistrasi + "/" + selected.norec_pd + "/" + selected.idpenjamin)
    }

    const detailTransaksi = () => {
        if (!selected) {
            _Toastr.error("Silahkan pilih data ...")
            return
        } else {
            histori.push("/DetailTransaksi/" + selected.noregistrasi)
        }
    }

    const columns = [
        {
            title: 'No',
            width: 50,
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
        // {
        //     title: 'Status Antrian',
        //     width: 150,
        //     render: row => (
        //         <>
        //             <Tag icon={<SyncOutlined spin />} color="error" style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", textAlign: "center" }}>
        //                 Menunggu
        //             </Tag>
        //         </>
        //     ),
        // },

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
            title: 'No. RM',
            width: 130,
            dataIndex: 'nocm',
            sorter: (a, b) => a.nocm.length - b.nocm.length,
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
            width: 50,
            title: 'JK',
            dataIndex: 'jeniskelamin',
            sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,
        },
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

        {
            width: 150,
            title: 'Asal Rujukan',
            dataIndex: 'asalrujukan',
        },
        // {
        //     width: 70,
        //     title: 'Lunas',
        //     render: (_, rc) =>
        //         <div>
        //             <Rate disabled value={0} count={1} />
        //         </div>
        // },
    ];

    const pushLab = () => {
        // histori.push("/RequestPemriksaanLab")
        // Cache.set("pasien_pd",  JSON.stringify("ffff"))
    }

    return (
        <LayoutAnt pl="10px" >
            <_TitleBar color="#ffa50087" label="DAFTAR PASIEN PULANG" />
            <DivCol pl="13px">
                <Form layout={"vertical"} onFinish={LoadData} >
                    <Row >
                        <_Date sm={2} onChange={handeleFilter('tglAwal')} showTime label="Tanggal" defaultValue={moment(tglAwal)} />
                        <_Date sm={2} onChange={handeleFilter('tglAkhir')} label=" " showTime defaultValue={moment(tglAkhir)} />
                        {/* <_Select sm={2} option={combo.instalasi} label="Instalasi" val="id" caption="instalasi" /> */}
                        <_Select sm={3} option={combo.ruangan} label="Ruangan" val="id" caption="ruangan" />
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
                            onClick: event => { setselected(record) }, // click row
                            // onDoubleClick: event => { alert(rowIndex) }, // double click row
                        };
                    }}
                />
            </DivCol>
            <DivCol pl="10px">
                <Row>
                    <_Button sm={2} icon={<BranchesOutlined />} color="orange"
                        primary onClick={verifikasiTindakan} title="Verifikasi Tindakan" block />
                    
                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary onClick={detailTransaksi}
                        title="Detail Tagihan" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary
                        title="Riwayat Registrasi" block />

                    <_Button sm={2} icon={<StopOutlined />} primary danger title="Closing" block />
                    <_Button sm={2} icon={<IssuesCloseOutlined />} primary  title="Open Billing" block />
                    

                    {/* <_Button sm={2} icon={<AppstoreAddOutlined />} primary onClick={() => detailTransaksi(selected.noregistrasi)}
                        title="Detail Tagihan" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary
                        title="Riwayat Registrasi" block />

                    <_Button sm={2} icon={<AppstoreAddOutlined />} primary
                        title="Resep" onClick={inputResep} block />

                    <_Button sm={2} icon={<FileSearchOutlined />} primary
                        title="Blanko Lab" onClick={pushLab} block /> */}


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

export default DaftarPasienPulang

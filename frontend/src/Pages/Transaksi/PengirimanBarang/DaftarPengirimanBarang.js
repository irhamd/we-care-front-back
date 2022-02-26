import { DownloadOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Card, Form, Table, Tag } from 'antd'
import moment from 'moment';
import momenTagt from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api';
import { DivCol, _Button, _Date, _Select } from '../../../Services/Forms/Forms';
import { _Row } from '../../../Services/Forms/LayoutBootstrap';
import LayoutAnt from '../../Layout/LayoutAnt';
import ExpandDetailPengirimanBarang from './ExpandDetailPengirimanBarang';

function DaftarPengirimanBarang(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])


    const warna = ['green', 'green', 'red', 'orange', 'blue']

    // "tglkirim": "2021-08-03 08:43:16",
    // "idruanganasal": 18,
    // "ruanganasal": "GUDANG PUSKESMAS",
    // "idruangantujuan": 19,
    // "ruangantujuan": "APOTEK",
    // "keperluankirim": "DISTRIBUSI",
    // "nokirim": "TB2108000000001",
    // "namalengkap": "Administrator",
    // "keterangan": "kirim",
    // "jumlahbarang": 1

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        {
            title: 'Tanggal Kirim', width: 200,
            render: (row) => (
                <> {moment(row.tglkirim).format('DD-MM-YYYY HH:mm')}  </>
            ),
        },
        {
            title: 'No. Kirim', width: 250,
            dataIndex: 'nokirim'
        },
        {
            title: 'Ruangan Asal', width: 300,
            dataIndex: 'ruanganasal',
        },
        {
            title: 'Ruangan Tujuan', width: 300,
            dataIndex: 'ruangantujuan'
        },
        {
            title: 'Keperluan', width: 150,
            render: row => (
                <Tag color={warna[1]}>  {row.keperluankirim} </Tag>
            )
        },


        {
            title: 'User Pengirim', width: 200,
            dataIndex: 'namalengkap'
        },



        // {
        //     title: 'Flag', width: 50,
        //     render: row => (
        //         <Tag color={warna[row.idflag]}>  {row.flag} </Tag>
        //     )
        // },
        { title: 'Keterangan', dataIndex: 'keterangan' },
        // { title: 'Tahun Anggaran', width: 120, dataIndex: 'tahunanggaran' },
        // { title: 'Nama Suplier', dataIndex: 'suplier' },
        // { title: 'Jumlah Barang', dataIndex: 'jumlahproduk' },
        // { title: 'Ruangan', dataIndex: 'ruangan' },
        // { title: 'Tanggal Penerimaan', width: 200, dataIndex: 'tglpenerimaan' },
        // { title: 'Sumber Dana', dataIndex: 'sumberdana' },
        // { title: 'Keterangan', dataIndex: 'keterangan' },
    ];


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
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss') : e
        });
    };

    const loadData = () => {
        // console.log(params)
        setLoading(true)
        _Api.get(`kirimbarang/get-daftar-kirim-barang`, { params: filterData }).then(res => {
            setdataBarangMasuk(res.data)
            setLoading(false)
        })
    };

    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])
    const LoadCombo = () => {
        setLoading(true)
        _Api.get("kirimbarang/get-combo-kirim-barang").then(res => {
            setCombo(res.data)
            setLoading(false)
        })
    }


    useEffect(() => {
        loadData()
        LoadCombo()
    }, [])

    return (
        <LayoutAnt>
            <DivCol>

                <Form layout={"vertical"} onFinish={loadData}
                    initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
                >
                    <_Row >
                        <_Date sm={2} showTime name="tglAwal" label="Tanggal" onChange={handeleFilter('tglAwal')} />
                        <_Date sm={2} label=" " name="tglAkhir" showTime onChange={handeleFilter('tglAwal')} />
                        <_Select sm={2} name="idruanganasal" onChange={handeleFilter('idruanganasal')} option={Combo.ruanganasal} label="Ruangan Asal" val="id" caption="ruangan" />
                        <_Select sm={2} name="idruangantujuan" onChange={handeleFilter('idruangantujuan')} option={Combo.ruangantujuan} label="Ruangan Tujuan" val="id" caption="ruangan" />
                        {/* <_Select sm={3} name="idsuplier" onChange={handeleFilter('idsuplier')} option={Combo.suplier} label="Nama Suplier" val="id" caption="suplier" /> */}
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Load" />
                        {/* <_Button sm={2} icon={<DownloadOutlined />} color="orange" block primary style={{ marginTop: "23px" }}
                        onClick={() => setactiveKey("1")}
                        title="Input Penerimaan Baru" /> */}
                    </_Row>
                </Form>
                <Card title=" * DAFTAR PENGIRIMAN BARANG" headStyle={{ background: "orange" }} size="small">
                    <Table
                        loading={Loading}
                        headStyle={{ textAlign: "center" }}
                        columns={columns}
                        bordered
                        expandable={{
                            expandedRowRender: record =>
                                <div>
                                    <ExpandDetailPengirimanBarang record={record} />
                                </div>,
                            expandIcon: ({ expanded, onExpand, record }) =>
                                expanded ? (
                                    <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                                ) : (
                                    <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                                )

                            // rowExpandable: record => record.name !== 'Not Expandable',
                        }}
                        rowKey="nokirim"
                        className="components-table-demo-nested"
                        dataSource={dataBarangMasuk}
                    />,
                </Card>
            </DivCol>

        </LayoutAnt>
    )
}

export default DaftarPengirimanBarang

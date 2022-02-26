import { DownloadOutlined } from '@ant-design/icons';
import { Card, Form, Table, Tag } from 'antd'
import moment from 'moment';
import momenTagt from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api';
import { DivCol, _Button, _Date, _Select } from '../../../Services/Forms/Forms';
import { _Row } from '../../../Services/Forms/LayoutBootstrap';
import { fitrah } from '../../../Services/Text/GlobalText';
import ExpandDetailBarang from './ExpandDetailBarang';

function KartuStok(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])


    const warna = ['green', 'green', 'red', 'orange', 'blue']

    const columns = [
        {
            title: 'No', width: 100,
            render: (text, row, index) => (
                <> {index + 1} </>
            ),

        },
        {
            title: 'Tanggal', width: 200,
            render: (row) => (
                <> {moment(row.tgllayanan).format('DD-MM-YYYY HH:mm')}  </>
            ),
            sorter: (a, b) => a.tgllayanan - b.tgllayanan,

        },

        {
            title: 'Produk', width: 300, dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
            editable: true,
        },
        {
            title: 'Ruangan', width: 200, dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
            editable: true,
        },
        {
            title: 'Stok Barang',
            children: [
                { title: 'Stok Awal', width: 100, dataIndex: 'saldoawal' },
                { title: 'Stok Masuk', width: 100, dataIndex: 'saldomasuk' },
                { title: 'Stok Keluar', width: 100, dataIndex: 'saldokeluar' },
                { title: 'Stok Akhir', width: 100, dataIndex: 'saldoakhir' },
                {
                    title: 'Stok Akhir', width: 100,
                    // dataIndex: 'saldoakhir',
                    render: row => (
                        <Tag size="large" style={{ width: "100%", textAlign: "center", fontWeight: "bold" }} color="cyan">  {row.saldoakhir} </Tag>
                    )

                },
            ]
        },
        {
            title: 'Flag', width: 200,
            sorter: (a, b) => a.idflag - b.idflag,
            render: row => (
                <Tag color={warna[row.idflag]}>  {row.flag} </Tag>
            )
        },
        { title: 'Keterangan', dataIndex: 'keterangan', with: 400 },
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
        _Api.get(`penerimaanbarang/get-daftar-kartu-stok`, { params: filterData }).then(res => {
            setdataBarangMasuk(res.data)
        })
    };


    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Form layout={"vertical"} onFinish={loadData}
                initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
            >
                <_Row >
                    <_Date sm={2} showTime name="tglAwal" label="Tanggal" onChange={handeleFilter('tglAwal')} />
                    <_Date sm={2} label=" " name="tglAkhir" showTime onChange={handeleFilter('tglAwal')} />
                    <_Select sm={2} name="idruangan" onChange={handeleFilter('idruangan')} option={pr.Combo.ruangan} label="Ruangan" val="id" caption="ruangan" />
                    {/* <_Select sm={3} name="idsuplier" onChange={handeleFilter('idsuplier')} option={pr.Combo.suplier} label="Nama Suplier" val="id" caption="suplier" /> */}
                    <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Refresh" />
                    {/* <_Button sm={2} icon={<DownloadOutlined />} color="orange" block primary style={{ marginTop: "23px" }}
                        onClick={() => pr.setactiveKey("1")}
                        title="Input Penerimaan Baru" /> */}
                </_Row>
            </Form>
            <Card title=" * KARTU STOK" headStyle={{ background: "#71bdfbd9" }} size="small">
                <Table
                    columns={columns}
                    scroll={{ x: 2000 }}
                    rowClassName={(rc, index) =>
                        rc.idflag == 1 ? 'cl-border, bg-green' : rc.idflag == 2 ? 'cl-border, bg-red' : rc.idflag == 3 ? 'cl-border, bg-orange' : 'cl-border, bg-blue'}
                    rowKey="norec_pb"
                    className="components-table-demo-nested"
                    dataSource={dataBarangMasuk}
                />,
            </Card>

        </div>
    )
}

export default KartuStok

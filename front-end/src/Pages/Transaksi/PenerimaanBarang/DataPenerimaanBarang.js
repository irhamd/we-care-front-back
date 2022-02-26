import { DownloadOutlined } from '@ant-design/icons';
import { Card, Form, Table } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api';
import { DivCol, _Button, _Date, _Select } from '../../../Services/Forms/Forms';
import { _Row } from '../../../Services/Forms/LayoutBootstrap';
import ExpandDetailBarang from './ExpandDetailBarang';

function DataPenerimaanBarang(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])

    const columns = [
        { title: 'No. Penerimaan',width: 200,  dataIndex: 'nopenerimaan' },
        { title: 'Tahun Anggaran', width: 120, dataIndex: 'tahunanggaran' },
        { title: 'Nama Suplier', dataIndex: 'suplier' },
        // { title: 'Jumlah Barang', dataIndex: 'jumlahproduk' },
        { title: 'Ruangan', dataIndex: 'ruangan' },
        { title: 'Tanggal Penerimaan',width: 200,  dataIndex: 'tglpenerimaan' },
        { title: 'Sumber Dana', dataIndex: 'sumberdana' },
        { title: 'Keterangan', dataIndex: 'keterangan' },
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
        _Api.get(`penerimaanbarang/get-daftar-head-penerimaan`, { params: filterData }).then(res => {
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
                    <_Date sm={2} showTime name="tglAwal" label="Tanggal"  onChange={handeleFilter('tglAwal')}/>
                    <_Date sm={2} label=" " name="tglAkhir" showTime  onChange={handeleFilter('tglAwal')}/>
                    <_Select sm={2} name="idruangan" onChange={handeleFilter('idruangan')} option={pr.Combo.ruangan} label="Ruangan" val="id" caption="ruangan" />
                    <_Select sm={3} name="idsuplier" onChange={handeleFilter('idsuplier')} option={pr.Combo.suplier} label="Nama Suplier" val="id" caption="suplier" />
                    <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Refresh" />
                    {/* <_Button sm={2} icon={<DownloadOutlined />} color="orange" block primary style={{ marginTop: "23px" }}
                        onClick={() => pr.setactiveKey("1")}
                        title="Input Penerimaan Baru" /> */}
                </_Row>
            </Form>
            <Card title=" * Data Barang Masuk" headStyle={{ background: "#71bdfbd9" }} size="small">
                <Table
                    columns={columns}
                    rowKey="norec_pb"
                    className="components-table-demo-nested"
                    expandable={{
                        expandedRowRender: record =>
                            <div>
                                <ExpandDetailBarang record={record} />
                            </div>

                        // rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={dataBarangMasuk}
                />,
            </Card>

        </div>
    )
}

export default DataPenerimaanBarang

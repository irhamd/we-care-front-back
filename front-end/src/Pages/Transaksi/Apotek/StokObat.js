import { DownloadOutlined, FileZipFilled, FundViewOutlined, ScheduleFilled } from '@ant-design/icons';
import { Card, Form, Table, Tag } from 'antd'
import moment from 'moment';
import momenTagt from 'moment';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import _Api from '../../../Services/Api/_Api';
import { Cache } from '../../../Services/Cache';
import { acakText, ubahText } from '../../../Services/Crypto';
import { DivCol, _Button, _Date, _Input, _Select, _TitleBar } from '../../../Services/Forms/Forms';
import { _Row } from '../../../Services/Forms/LayoutBootstrap';
import LayoutAnt from '../../Layout/LayoutAnt';
import DetailResepObat from './DetailResepObat/DetailResepObat';

function StokObat(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])
    const [dataStokObat, setdataStokObat] = useState([])
    const [selected, setselected] = useState()
    const [dataDetail, setDataDetail] = useState([])
    const [showDetail, setshowDetail] = useState(false)
    const [noregistrasi, setnoregistrasi] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData, setfilterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

 

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        {
            title: 'Ruangan', width: 200,
            dataIndex: 'ruangan'
        },
        {
            title: 'Nama Obat',
            width: 600,
            // dataIndex: 'produk',
            render: row => (
                <div   style={{ fontWeight:"bold" }}>
                    { row.produk }
                </div>
            ),
        },
        {
            title: 'Jumlah', width: 50,
            render: row => (
                <Tag  color={ row.jumlah <=0 ? "error" :"blue" } style={{ fontSize: "17px", fontWeight:"bold" , paddingBottom: "3px", textAlign: "left" }}>
                    { row.jumlah }
                </Tag>
            ),
        },

        {
            title: 'Satuan', width: 200,
            dataIndex: 'satuan'
        },
      
       
      
       
    ];

    
    const loadData = () => {
        // console.log(params)
        setLoading(true)
        _Api.get(`apotik/get-stok-obat`, { params: filterData }).then(res => {
            setdataStokObat(res.data)
            setLoading(false)
        })
    };

    const prosesResep = () => {
        var cc = acakText(JSON.stringify(selected))
        // alert(cc)
        // Cache.set("newobat", true)
        histori.push("ProsesResep/" + cc)
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
            <_TitleBar label="DATA OBAT" />
            <DivCol pr="30px">
                <Form layout={"vertical"} onFinish={loadData}
                    initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
                >
                    <_Row >
                        <_Input sm={2} name="namaobat"label="Nama Obat" />
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Load" />
                    </_Row>
                </Form>
                <Table
                    loading={Loading}
                    headStyle={{ textAlign: "center" }}
                    rowClassName={(record, index) => record.jumlah <= 0 && 'bg-kosong'}
                    columns={columns}
                    rowKey="nokirim"
                    className="components-table-demo-nested"
                    dataSource={dataStokObat}
                    onRow={(rc, i) => {
                        return {
                            onClick: event => {
                                setselected(rc)
                                // console.log(rc)
                            },
                            onDoubleClick: event => { prosesResep() }, // double click row
                        };
                    }}
                />,
            </DivCol>
           
        </LayoutAnt>
    )
}

export default StokObat

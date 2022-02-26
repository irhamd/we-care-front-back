import { DownloadOutlined, FileZipFilled, ScheduleFilled } from '@ant-design/icons';
import { Card, Form, Table, Tag } from 'antd'
import moment from 'moment';
import momenTagt from 'moment';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import _Api from '../../../Services/Api/_Api';
import { Cache } from '../../../Services/Cache';
import { acakText, ubahText } from '../../../Services/Crypto';
import { DivCol, _Button, _Date, _Input, _Select, _TitleBar } from '../../../Services/Forms/Forms';
import { _Row } from '../../../Services/Forms/LayoutBootstrap';
import LayoutAnt from '../../Layout/LayoutAnt';

function ProsesResep(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])
    const [selected, setselected] = useState()
    const histori = useHistory()
    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        // {
        //     title: 'Tanggal Kirim', width: 200,
        //     render: (row) => (
        //         <> {moment(row.tglkirim).format('DD-MM-YYYY HH:mm')}  </>
        //     ),
        // },
        {
            title: 'No. RM', width: 100,
            dataIndex: 'nocm'
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien'
        },
        {
            title: 'Noregistrasi', width: 130,
            dataIndex: 'noregistrasi'
        },

        {
            title: 'No Resep', width: 200,
            dataIndex: 'noresep'
        },
        {
            title: 'Penulis Resep',
            dataIndex: 'penulisresep'
        },
        {
            title: 'Ruangan', width: 200,
            dataIndex: 'ruangan'
        },
        {
            title: 'Depo',
            dataIndex: 'depo'
        },
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
        _Api.get(`apotik/get-daftar-pasien-resep`, { params: filterData }).then(res => {
            setdataBarangMasuk(res.data)
            setLoading(false)
        })
    };

    const prosesResep = () => {
        var cc = acakText(JSON.stringify(selected))
        // alert(cc)
        // Cache.set("newobat", 'tidak')
        Cache.remove('norec_rp')
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
            <_TitleBar label="DAFTAR PERMINTAAN  RESEP" />
            <DivCol>
                <Form layout={"vertical"} onFinish={loadData}
                    initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
                >
                    <_Row >
                        <_Date sm={2} showTime name="tglAwal" label="Tanggal" onChange={handeleFilter('tglAwal')} />
                        <_Date sm={2} label=" " name="tglAkhir" showTime onChange={handeleFilter('tglAwal')} />
                        {/* <_Select sm={2} name="idruanganasal" onChange={handeleFilter('idruanganasal')} option={Combo.ruanganasal} label="Ruangan Asal" val="id" caption="ruangan" /> */}
                        <_Select sm={2} name="idruangantujuan" onChange={handeleFilter('idruangantujuan')} option={Combo.ruangantujuan} label="Ruangan Tujuan" val="id" caption="ruangan" />
                        <_Input sm={1} label="No. RM" onChange={handeleFilter('nocm')} />
                        <_Input sm={2} label="Nama Pasien" onChange={handeleFilter('namapasien')} />
                        <_Input sm={1} label="No. Registrasi" onChange={handeleFilter('noregistrasi')} />
                        {/* <_Select sm={3} name="idsuplier" onChange={handeleFilter('idsuplier')} option={Combo.suplier} label="Nama Suplier" val="id" caption="suplier" /> */}
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Load" />
                        {/* <_Button sm={2} icon={<DownloadOutlined />} color="orange" block primary style={{ marginTop: "23px" }}
                        onClick={() => setactiveKey("1")}
                        title="Input Penerimaan Baru" /> */}
                    </_Row>
                </Form>
                <Table
                    loading={Loading}
                    headStyle={{ textAlign: "center" }}
                    rowClassName={(record, index) => record == selected && 'bg-orange'}
                    columns={columns}
                    rowKey="nokirim"
                    className="components-table-demo-nested"
                    dataSource={dataBarangMasuk}
                    onRow={(rc, i) => {
                        return {
                            onClick: event => {
                                setselected(rc)
                                console.log(rc)
                            },
                            onDoubleClick: event => { prosesResep() }, // double click row
                        };
                    }}
                />,
                <_Button icon={<ScheduleFilled />} block sm={1} onClick={prosesResep} label="Proses" />
            </DivCol>


        </LayoutAnt>
    )
}

export default ProsesResep

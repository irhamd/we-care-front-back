import { DownloadOutlined, FileZipFilled, FundViewOutlined, MinusCircleTwoTone, PlusCircleTwoTone, ScheduleFilled } from '@ant-design/icons';
import { Card, Drawer, Form, Popconfirm, Table, Tag } from 'antd'
import moment from 'moment';
import momenTagt from 'moment';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import _Api from '../../../../Services/Api/_Api';
import { Cache } from '../../../../Services/Cache';
import { acakText } from '../../../../Services/Crypto';
// import { _Button } from '../../../../Services/Forms/Forms';
// import { Cache } from '../../../Services/Cache';
// import { acakText, ubahText } from '../../../Services/Crypto';
import { DivCol, _Button, _Date, _Input, _Select, _TitleBar } from '../../../../Services/Forms/Forms';
import { _Row } from '../../../../Services/Forms/LayoutBootstrap';
import LayoutAnt from '../../../Layout/LayoutAnt';
import ExpandDaftarPasienPelayananLab from './Expand-DaftarPasienPelayananLab';
// import { _Row } from '../../../Services/Forms/LayoutBootstrap';
// import LayoutAnt from '../../Layout/LayoutAnt';
// import DetailResepObat from './DetailResepObat/DetailResepObat';

function DaftarPasienPelayananLab(pr) {
    const [dataBarangMasuk, setdataBarangMasuk] = useState([])
    const [selected, setselected] = useState()
    const [dataDetail, setDataDetail] = useState([])
    const [showDetail, setshowDetail] = useState(false)
    const [showPasienMenunggu, setshowPasienMenunggu] = useState(false)
    const [noregistrasi, setnoregistrasi] = useState([])
    const [PasienMenunggu, setPasienMenunggu] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData, setfilterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

    const constShowDetail = (row) => {
        setshowDetail(true)
        setnoregistrasi(row.noregistrasi)
        Cache.set('norec_rp', JSON.stringify(row))
        _Api.get(`apotik/get-detail-obat-bystruk?noregistrasi=${row.noregistrasi}`).then(res => {
            setDataDetail(res.data)
            setLoading(false)
        })
        // 
    }

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        {
            title: 'Ruangan Lab', width: 200,
            dataIndex: 'ruanganlab'
        },
        {
            title: 'No. RM', width: 100,
            dataIndex: 'nocm'
        },
        {
            title: 'Noregistrasi', width: 160,
            dataIndex: 'noregistrasi'
        },
        {
            title: 'No. Blangko', width: 160,
            dataIndex: 'nolab'
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien'
        },

        {
            title: 'Act', width: 300,
            render: (row) => (
                <_Row>
                    <Popconfirm placement="top" title={"Hapus blangko pemeriksaan .?"}  okText="Ya" cancelText="Batal">
                        <_Button title="Hapus Pemeriksaan" danger btnDel icon={<FundViewOutlined />} sm={5} />
                    </Popconfirm>


                </_Row>
            ),
        },

        // {
        //     title: 'Ruangan', width: 200,
        //     dataIndex: 'ruangan'
        // },

        // {
        //     title: 'Detail', width: 100,
        //     render: (row) => (
        //         <_Button title="Lihat Obat" icon={<FundViewOutlined />} color="orange" onClick={() => constShowDetail(row)} />
        //     ),
        // },
    ];

    const columnsMenunggu = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        {
            title: 'Ruangan Lab', width: 200,
            dataIndex: 'ruanganlab'
        },
        {
            title: 'No. RM', width: 100,
            dataIndex: 'nocm'
        },
        {
            title: 'Noregistrasi', width: 160,
            dataIndex: 'noregistrasi'
        },
        {
            title: 'No. Blangko', width: 160,
            dataIndex: 'nolab'
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien'
        },
    ];

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
        _Api.get(`lab/get-daftar-pasien-pelayanan-lab`, { params: filterData }).then(res => {
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
    const loadDataPasienMenunggu = (val) => {
        setLoading(true)
        var filter = {
            ...val,
            tglAwal: moment(val.tAwal).format('YYYY-MM-DD HH:mm:ss'),
            tglAkhir: moment(val.tAkhir).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log(filter)
        _Api.get("lab/get-daftar-pasien-blankolab", { params: filter }).then(res => {
            setPasienMenunggu(res.data)
            setLoading(false)
        })
    }


    useEffect(() => {
        loadData()
        LoadCombo()
        // loadDataPasienMenunggu(null)
    }, [])

    return (
        <LayoutAnt>
            <_TitleBar align="center" label="DAFTAR PASIEN LABORATURIUM" />
            <DivCol>

                <div className="site-drawer-render-in-current-wrapper">
                    <Form layout={"vertical"} onFinish={loadData}
                        initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
                    >
                        <_Row >
                            <_Date sm={2} onChange={handeleFilter('tglAwal')} label="Tanggal" defaultValue={moment(tglAwal)} />
                            <_Date sm={2} onChange={handeleFilter('tglAkhir')} label=" " defaultValue={moment(tglAkhir)} />

                            <_Select sm={2}
                                // option={combo.ruangan}
                                label="Ruangan" val="id" caption="ruangan" onChange={handeleFilter('idruanganlab')} />
                            {/* idruanganlab */}
                            <_Input sm={1} label="No. RM" onChange={handeleFilter('nocm')} />
                            <_Input sm={2} label="Nama Pasien" onChange={handeleFilter('namapasien')} />
                            <_Input sm={1} label="No. Registrasi" onChange={handeleFilter('noregistrasi')} />
                            <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Load" />
                        </_Row>
                    </Form>
                    <Table
                        loading={Loading}
                        rowClassName={(record, index) => record == selected && 'bg-orange'}
                        columns={columns}
                        rowKey="norec_sl"
                        className="components-table-demo-nested"
                        dataSource={dataBarangMasuk}
                        // bordered
                        expandable={{
                            expandedRowRender: record =>
                                <div>
                                    <ExpandDaftarPasienPelayananLab record={record} />
                                </div>,
                            expandIcon: ({ expanded, onExpand, record }) =>
                                expanded ? (
                                    <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
                                ) : (
                                    <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
                                )
                            // rowExpandable: record => record.name !== 'Not Expandable',
                        }}
                    />,

                    <Drawer
                        title="Daftar Pasien Menunggu"
                        placement="left"
                        headerStyle={{ background: "orange", height: "30px", padding: "5px 0 0 20px" }}
                        bodyStyle={{ background: "rgba(102, 198, 236, 0.18)" }}
                        width="1300"
                        closable={false}
                        onClose={() => setshowPasienMenunggu(false)}
                        visible={showPasienMenunggu}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <Form layout={"vertical"} onFinish={loadDataPasienMenunggu} onLoadStart={loadDataPasienMenunggu} autoComplete={false}
                            initialValues={{ tAwal: moment(tglAwal), tAkhir: moment(tglAkhir) }}
                        >
                            <_Row >
                                <_Date sm={2} name="tAwal" label="Tanggal" defaultValue={moment(tglAwal)} />
                                <_Date sm={2} name="tAkhir" label=" " defaultValue={moment(tglAkhir)} />

                                <_Select sm={2}
                                    // option={combo.ruangan}
                                    label="Ruangan Asal" val="id" caption="ruangan" onChange={handeleFilter('idruanganlab')} />
                                {/* idruanganlab */}
                                <_Input sm={2} label="No. RM" name="nocm" />
                                <_Input sm={2} label="Nama Pasien" name="namapasien" />
                                <_Input sm={1} label="No. Registrasi" onChange={handeleFilter('noregistrasi')} />
                                <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Cari" />
                            </_Row>
                        </Form>
                        <span> Double clik data untuk di proses ...  </span>
                        <Table
                            loading={Loading}
                            rowClassName={(record, index) => record == selected && 'bg-orange'}
                            columns={columnsMenunggu}
                            pagination={false}
                            rowKey="norec_blankolab"
                            dataSource={PasienMenunggu}
                            onRow={(rc, i) => {
                                return {
                                    onClick: event => {
                                        setselected(rc)
                                        // setdetailpasien(acakText(JSON.stringify(rc)))
                                    },
                                    onDoubleClick: event => {
                                        // alert(JSON.stringify(rc))
                                        histori.push(`InputPelayananDiLab/${acakText(JSON.stringify(rc))}`)
                                    }, // double click row
                                };
                            }}
                        />,
                    </Drawer>
                </div>
                <hr />
                <_Button icon={<ScheduleFilled />} color="orange" block sm={2} onClick={() => setshowPasienMenunggu(true)} label="Tambah Layanan" />


            </DivCol>



        </LayoutAnt>
    )
}

export default DaftarPasienPelayananLab

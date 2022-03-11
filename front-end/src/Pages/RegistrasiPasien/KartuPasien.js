import React, { useEffect, useRef, useState } from 'react'
import { DivCol, _Button, _Date, _Input, _Select, _Switch, _TitleBar } from '../../Services/Forms/Forms'
import { _Col, _grid, _Row, _row } from '../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate, Descriptions } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined, PrinterOutlined } from '@ant-design/icons';

import { useHistory, withRouter } from 'react-router-dom';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import _Api from '../../Services/Api/_Api';
import { acakText } from '../../Services/Crypto';
import { fDB, fitrah, formatTglWaktu } from '../../Services/Text/GlobalText';
import foto from "../../_Assets/foto/users.png"
import { Col, Row } from 'react-bootstrap';
import { _Push } from '../../Services/Route/ProtectedRoute';
import { Cache } from '../../Services/Cache';
import DetailPasien from '../Pasien/DetailPasien';
import DetailPasienDaftar from '../Pasien/DetailPasienDaftar';
import ReactToPrint from 'react-to-print';
import RiwayatKunjunganKartuPasien from '../Transaksi/Riwayat/RiwayatKunjunganKartuPasien';



function KartuPasien(pr) {
    const [data, setData] = useState([])
    const [selected, setselected] = useState()
    const [ininoregistrasi, setininoregistrasi] = useState(null)
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    // const [selected, selected] = useState("")
    const printReff = useRef();


    const [combo, setcombo] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

    const LoadData = () => {
        setLoading(true)
        _Api.get("kartupasien/get-kartu-pasien?nocmfk="+pr.match.params.nocmfk).then(res => {
            // console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
    }

    const isiCombobox = () => {
        _Api.get("registrasi/compo-registrasi-pelayanan").then(res => {
            setcombo(res.data)
        })
    }

    const munculDetail = (noreg) => {
        setininoregistrasi( noreg )
    }

    useEffect(() => {

        // console.log('pr', pr)
        LoadData();
        isiCombobox();
    }, [])

   

    var stile = { fontSize: "17px",  margin: "10px", top: "0px" }


    const columns = [
        {
            title: 'Tgl Registrasi',
            //   dataIndex: 'tglregistrasi',
            key: 'tglregistrasi',
            width: 150,
            render: row =>
                <div style={{ textAlign: "center" }}>
                    <a style={stile}>{moment(row.tglregistrasi).format("DD/MM yyyy")}</a>
                    <div style={{ marginTop: "-10px" }}>  <_Button size="small" label="Detail" btnFind onClick={()=>munculDetail(row.noregistrasi)} /> </div>
                </div>
        },
        {
            title: 'ANAMNESIS / PEMERIKSAAN',
            render: row => <p style={stile}>
                {row.keluhanutama} <br />
                {row.keluhantambahan} /
                <span> {row.diastole && "Tekanan Darah (TD) : " + row.diastole + " Hg /"} </span>
                <span> {row.suhu && "Suhu : " + row.suhu + " °C /"} </span>
                <span> {row.sistole && "Sistole : " + row.sistole + " mm "} </span>
            </p>
        },
        {
            title: 'DIAGNOSIS',
            render: row =>
                <p style={stile}>
                    {/* <p> { JSON.stringify(row.diagnosa ) } </p>  */}
                    <ul>
                        {
                            row.diagnosa.map((item, i) => {
                                return (
                                    <li key={i}> {item.diagnosa} / {item.keterangan} </li>
                                )
                            })
                        }
                    </ul>
                </p>
        },

        {
            title: 'RESEP / TERAPI / DLL',
            key: 'action',
            render: row =>
                <div style={stile}>
                    <ul>
                        {
                            row.dataresep.map((item, i) => {
                                return (
                                    <li key={i}> {item.produk}  ( {item.jumlah}  {item.satuan} )</li>
                                )
                            })
                        }
                    </ul>
                </div>
        },
    ];




    const pushLab = () => {
        // histori.push("/RequestPemriksaanLab")
        // Cache.set("pasien_pd",  JSON.stringify("ffff"))
    }

    const handleAfterPrint = React.useCallback(() => {
        // console.log("`onAfterPrint` called");
        setLoading( false )

      }, []);
    
      const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called");
        setLoading( true )
      }, []);


    return (
        <LayoutAnt>
            <RiwayatKunjunganKartuPasien ininoregistrasi={ininoregistrasi} onClose={() => setininoregistrasi(null)} /> 
            <DetailPasienDaftar data={{ noregistrasi: pr.match.params.nocm }} />

            <div style={{ background: "grey", padding: "10px 130px", fontSize: "14px" }}>
                <_Col style={{ background: "white" }}>
                    <ReactToPrint
                        onAfterPrint={handleAfterPrint}
                        onBeforePrint={handleBeforePrint}
                        trigger={() => <div> <br /> <_Button icon={<PrinterOutlined />} label="Cetak" /> </div>}
                        content={() => printReff.current}
                    />
                    <div ref={printReff} style={{ padding: "15px 50px" }}>
                        <Spin spinning={ loading }>
                        <_TitleBar title="KARTU PASIEN" align="center" />
                        <br />
                        <Table bordered columns={columns} dataSource={data} />
                        </Spin>
                    </div>

                </_Col>

            </div>

            <br />
            <br />

        </LayoutAnt>
    )
}

export default withRouter(KartuPasien)

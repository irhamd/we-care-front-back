import { AppstoreAddOutlined, BookOutlined, CaretRightOutlined, PlayCircleTwoTone } from '@ant-design/icons'
import { Affix, Button, Card, Collapse, Divider, Tag, Timeline } from 'antd'
import Form from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory, withRouter } from 'react-router-dom'
import _Api from '../../../Services/Api/_Api'
import { Cache } from '../../../Services/Cache'
import { ubahText } from '../../../Services/Crypto'
import { DivCol, _Button, _Label, _TitleBar } from '../../../Services/Forms/Forms'
import LayoutAnt from '../../Layout/LayoutAnt'
import DetailPasien from '../../Pasien/DetailPasien'
import DetailPasienDaftar from '../../Pasien/DetailPasienDaftar'
import RiwayatKunjungan from '../Riwayat/RiwayatKunjungan'
import Anamnesa from './Anamnesa/Anamnesa'
import InputDiagnosa from './Diagnosa/InputDiagnosa'
import InputTindakan from './Tindakan/InputTindakan'

function PengkajianMedis(pr) {

    const [dataPD, setdataPD] = useState([])
    const [anamnesa, setAnamnesa] = useState({})
    const [riwayatKunjungan, setriwayatKunjungan] = useState({})
    const { Panel } = Collapse;
    const histori = useHistory();

    let hash = pr.location.pathname.split("/PengkajianMedis/")[1]
    const arr = ubahText(hash)
    let data = JSON.parse(arr)

    const pushResep = () => {
        histori.push("/Resep/" + hash)
    }
    const pushLab = () => {
        histori.push("/RequestPemriksaanLab")
        Cache.set("pasien_pd", hash)
    }


    const panelStyle = { background: "#40a9ffb5" };

    // const loadData = () => {
    //     _Api.get(`anamnesa/get-anamnesa-pasien?noregistrasi=${data.noregistrasi}`).then(res => {
    //         setAnamnesa(res.data)
    //     })

    // };

    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])

    const LoadCombo = () => {
        setLoading(true)
        _Api.get("kirimbarang/get-combo-kirim-barang").then(res => {
            setCombo(res.data)
            setLoading(false)
        })
    }
    const loadDetailKunjungan = () => {
        setLoading(true)
        _Api.get("pasien/get-riwayat-pendaftaran-pasien?nocmfk=" + data.nocmfk).then(res => {
            setriwayatKunjungan(res.data)
        })
    }

    useEffect(() => {
        setdataPD(data)
        LoadCombo()
        loadDetailKunjungan()
        // loadData()
    }, [])

    return (
        <LayoutAnt hidetop>
            <DivCol bg="#40a9ff1c" pl="10px">
                <Row>

                    {/* <Form layout="vertical"> */}
                    <Col sm={2}>
                        <DetailPasien norm={data.nocm} />
                        <br />
                        <Card headStyle={{ background: "rgb(97 182 249)" }} title="* Riwayat Kunjungan" size="small">
                            <br />
                            <RiwayatKunjungan data={riwayatKunjungan} />
                        </Card>

                    </Col>
                    <Col sm={10} style={{ paddingLeft: "25px" }}>
                        <div style={{ marginLeft: "-13px" }}>
                            <DetailPasienDaftar data={data && data} />
                        </div>
                        {/* <_TitleBar /> */}
                        <br />
                        <Row>
                            <_Button sm={2} icon={<AppstoreAddOutlined />}
                                primary block color="orange"
                                title=" Input Tindakan" />

                            <_Button sm={2} icon={<AppstoreAddOutlined />} primary block title="Laboraturium" onClick={pushLab} />

                            <Col sm={2}>
                                <Button icon={<AppstoreAddOutlined />} type="primary" block  > 
                                    Detail Registrasi
                                </Button>
                            </Col>
                            <Col sm={2}>
                                <Button icon={<BookOutlined />} type="primary" block onClick={pushResep}>
                                    Resep
                                </Button>
                            </Col>

                            <Col sm={12}> &nbsp; </Col>
                            <Col sm={12} style={{ paddingRight :"30px" }}>
                                <Collapse bordered collapsible
                                    style={{ background: "#40a9ff1c" }}
                                    expandIcon={({ isActive }) => <PlayCircleTwoTone rotate={isActive ? 90 : 0} />}
                                    defaultActiveKey={[3]}
                                >
                                    <Panel header="Data Tindakan" key="1" style={panelStyle}>
                                        <InputTindakan row={data} />
                                    </Panel>
                                    <Panel header="Diagnosa Pasien" key="2" style={panelStyle}>
                                        <InputDiagnosa row={data} />
                                        <br />
                                    </Panel>
                                    <Panel header="Anamnesa" key="3" style={panelStyle}>
                                        <Anamnesa combo={Combo} data={anamnesa} row={data} />
                                    </Panel>
                                    {/* <Panel header="Resep" key="4" style={panelStyle}>
                                        <InputResep data={anamnesa} row={data} />
                                    </Panel> */}
                                </Collapse>
                            </Col>


                        </Row>

                    </Col>
                    {/* </Form> */}
                </Row>
            </DivCol>
        </LayoutAnt>
    )
}

export default withRouter(PengkajianMedis)

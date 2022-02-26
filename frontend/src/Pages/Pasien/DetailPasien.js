import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory, withRouter } from 'react-router-dom'
import { Cache } from '../../Services/Cache'
import { ubahText } from '../../Services/Crypto'
import { DivCol, _Input } from '../../Services/Forms/Forms'
// import foto from "../../_Assets/foto/foto.jpg"
import foto from "../../_Assets/foto/foto.jpg"

// import foto from "../../_Assets/foto/foto.jpg"
import moment from 'moment';
import _Api from '../../Services/Api/_Api'
import { fitrah } from '../../Services/Text/GlobalText'
import Form from 'antd/lib/form/Form'
import { Collapse, Image, Spin } from 'antd'
import { PlayCircleTwoTone } from '@ant-design/icons'


function DetailPasien(pr) {

    const [pasien, setPasien] = useState("")
    const [Loading, setLoading] = useState(true)
    const history = useHistory()
    const { Panel } = Collapse;

    useEffect(() => {
        // try {
        //     setPasien(pr.match.params.detailpasien)
        //     console.log(pr.location.pathname)
        //     let hash = pr.location.pathname

        //     const arr = ubahText(hash.split("/PasienDaftar/")[1])
        //     // console.log(arr)
        // } catch (error) {
        //     // alert("error")
        //     history.push("/DataPasienLama")
        // }

        _Api.get("pasien/get-pasien-lama?nocm=" + pr.norm).then(res => {
            let ps = res.data.daftar[0]
            setPasien(ps)
            setLoading(false)
            // let umur = Math.floor(moment(new Date()).diff(moment(ps.tgllahir),'years',true))
            // setPasien(...pasien,{"umur": fitrah.getUmur(ps.tgllahir)})
        })
    }, [])
    return (
        <Spin spinning={Loading} size="large" tip="Muat Data Pasien ...">
            <Collapse collapsible
                expandIcon={({ isActive }) => <PlayCircleTwoTone rotate={isActive ? 90 : 0} />}
                defaultActiveKey={[1]}
            >
                <Panel header="DATA PASIEN" key="1">

                    <Form layout={"vertical"}>
                        <br />
                        <div style={{ paddingLeft: "5px" }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Image style={{ width: "100%", padding: "4px" }} className="rounded" src={pasien.foto ? pasien.foto : foto} />
                            </Col>
                            <br />
                            {/* <_Label label={"DATA PASIEN"} /> */}
                            <Row style={{ margin: "0px" }}>
                                <_Input sm={8} value={pasien.nocm} label="Nomor Rekam Medis" />
                                <_Input sm={4} value={pasien.jeniskelamin} label="Jender" />
                            </Row>
                            <_Input value={pasien.namapasien} label="Nama Pasien" />
                            <_Input value={pasien.nohp} label="No. HP" />

                            <Row style={{ margin: "0px" }}>
                                <_Input sm={7} value={moment(pasien.tgllahir).format('DD-MM-YYYY')} label="Tanggal Lahir" />
                                <_Input sm={5} value={fitrah.getUmur(pasien.tgllahir)} label="Umur" />
                            </Row>
                            {/* <_Input value={pasien.umur} label="Umur" /> */}

                            <_Input value={pasien.alergi} label="Alergi" />
                            <_Input multiline value={pasien.alamat} label="Alamat" />
                            <_Input value={pasien.desakelurahan} label="Desa Kelurahan" />
                            <_Input value={moment(pasien.tgldaftar).format('DD-MM-YYYY')} label="Tanggal Kunjungan Pertama" />
                            <br />
                        </div>
                    </Form>
                </Panel>

            </Collapse>
        </Spin>
    )
}

export default withRouter(DetailPasien)

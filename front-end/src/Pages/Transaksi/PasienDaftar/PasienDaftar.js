import React, { createRef, useEffect, useState } from 'react'
import { Button, Collapse, Layout, Menu, Form } from 'antd';
import LayoutAnt from '../../Layout/LayoutAnt';
import { DivCol, _Button, _Date, _Input, _Label, _Select, _Switch, _TitleBar } from '../../../Services/Forms/Forms';
import { Row, Col } from 'react-bootstrap';
// import  from 'antd/lib/form/Form';
import _Api from '../../../Services/Api/_Api';
// import foto from "../../../_Assets/foto/foto.jpg"
import moment from 'moment';
import { useHistory, withRouter } from 'react-router-dom';
import { ubahText } from '../../../Services/Crypto';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';
import DetailPasien from '../../Pasien/DetailPasien';
import { CloudDownloadOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import { _Row, _row } from '../../../Services/Forms/LayoutBootstrap';
import { getDate, getDateTime } from '../../../Services/Text/GlobalText';
// import { _Toastr } from '../../Services/Toastr/Notify/_Toastr'

function PasienDaftar(r) {
    const colDetail = { marginTop: "-10px", padding: "10px 10px 10px 30px" }
    const [pasien, setPasien] = useState({})
    const history = useHistory()
    const [objPd, setobjPd] = useState({})
    const [statuspenyakit, setstatuspenyakit] = useState("lama")
    const { Panel } = Collapse;

    // const foto="../../../_Assets/foto/foto.jpg"

    const formref = createRef()
    const form = Form.useForm()

    const handleChange = (field, row) => (e, f) => {
        let isMoment = e._isAMomentObject && e._isAMomentObject
        // alert(f.children[1])
        setobjPd({
            ...objPd,
            [row]: f && f.lenght ? f.children[1] : "",
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss')
                : e && e.target ? e.target.value : e
        });
    };

    const [combobox, setcombobox] = useState({})
    const comboBox = () => {
        _Api.get("registrasi/compo-registrasi-pelayanan").then(res => {
            setcombobox(res.data)
        })
    }

    const savePasienDaftar = (val) => {
        var obj = { ...val, ...objPd, tglregistrasi: moment(val.tglregistrasi).format('YYYY-MM-DD HH:mm:ss') }
        _Api.post("registrasi/save-registrasi-pelayanan", obj
        ).then(res => {
            _Toastr.success(res.data.message)
            formref.current.resetFields()
            history.push("/RegistrasiPasien")
        }).catch(err => {
            _Toastr.error(err.response.data.message)
        })
    }

    let hash = r.location.pathname
    const arr = ubahText(hash.split("/PasienDaftar/")[1])
    let pasienS = JSON.parse(arr)

    const changeSwitch = (e) => {
        if (e) {
            setobjPd({
                ...objPd,
                iddepartemen: 3,
                israwatinap: e
            })
        } else {
            setobjPd({
                ...objPd,
                iddepartemen: '',
                israwatinap: e
            })
        }
    }

    const changeDapartemen = (e) => {
        setobjPd({
            ...objPd,
            iddepartemen: e,
            israwatinap: e == 3 ? true : false
        })

    }
    const initialValue = {
        idasalrujukan: 1,
        idkelas: 0,
        tglregistrasi: moment(getDateTime),
        iddepartemen: 2,
        idruangan: 1,

    }

    useEffect(async () => {
        // try {
        await comboBox()

        setPasien(JSON.parse(arr))
        let umur = Math.floor(moment(pasienS.tgldaftar).diff(moment(pasienS.tgllahir), 'years', true))
        // console.log(pasienS)
        setPasien({ ...pasien, "umur": umur })

        // console.log(umur)

        setobjPd({
            ...objPd,
            "norec_pd": "",
            "idpasien": pasienS.nocmfk,
            "idpegawai": 1,
            "israwatinap": false,
            // "penjamin": "BPJS",
            "idasalrujukan": 1,
            "statuskasuspenyakit": "Lama"
        });

        // } catch (error) {
        //     // alert("error")
        //     history.push("/DataPasienLama")
        // }
    }, [])

    return (
        <LayoutAnt>
            <Form layout="vertical" ref={formref} initialValues={initialValue} onFinish={savePasienDaftar}   >
                <Row>
                    <Col sm={{ span: 3 }} style={colDetail}>
                        <DetailPasien norm={pasienS.nocm} />
                    </Col>
                    <Col sm={8}>

                        <Collapse bordered collapsible
                            style={{ background: "#40a9ff1c", width: "100%" }}
                            expandIcon={({ isActive }) => <PlayCircleTwoTone rotate={isActive ? 90 : 0} />}
                            defaultActiveKey={[1, 2, 3]}
                        >
                            <Panel header="REGISTRASI PASIEN" key="1" style={{ background: "#40a9ffb5" }}>
                                <Row>
                                    <Col sm={6} style={{ paddingLeft: "40px" }}>

                                        <_Switch label="Pasien Rawat Inap" name='israwatinap' onChange={(e) => changeSwitch(e)} />
                                        <_Date showTime label="Tanggal Registrasi" required name="tglregistrasi" format="YYYY-MM-DD HH:mm:ss"
                                        // onChange={handleChange('tglregistrasi')}
                                        />
                                        <_Select option={combobox.instalasi} label="Tujuan Registrasi" val="id" caption="instalasi"
                                            onChange={(e) => changeDapartemen(e)} name="iddepartemen" required
                                        />
                                        <_Select option={combobox.penjamin} label="Penjamin" val="id" caption="penjamin" sm={7}
                                            onChange={handleChange('idpenjamin', 'penjamin')} required name="idpenjamin"
                                        // onChange={(e,f)=>console.log(f)}
                                        />
                                        <_Select option={combobox.ruangan} label="Ruangan Tujuan" val="id" caption="ruangan"
                                            onChange={handleChange('idruangan')} required name="idruangan"
                                        />

                                        <_Select option={combobox.kelas} label="Kelas" val="id" caption="kelas" sm={5}
                                            onChange={handleChange('idkelas')} required name="idkelas" />
                                        <_Switch label="Status Penyakit" titleCheck="Baru" titleUnCheck="Lama"
                                            onChange={e => setstatuspenyakit(e ? "baru" : "lama")}
                                        />
                                        <br />
                                        <br />
                                        <br />
                                        {/* 
                                        <_Label label="Rujukan" />
                                        <_Select option={combobox.asalrujukan} label="Asal Rujukan" val="id" caption="asalrujukan" name="idasalrujukan"
                                            onChange={handleChange('idasalrujukan')} defaultValue="1" required
                                        />
                                        <_Input label="Nama Perujuk" onChange={handleChange('namaperujuk')} />
                                        <_Input multiline label="Catatan Perujuk" onChange={handleChange('catatanrujukan')} />

                                        <br />
                                        <br /> */}


                                    </Col>
                                    <Col sm={{ span: 6 }} style={{ paddingRight: "20px" }}>
                                        <_Label label={"Data Penanggung Jawab"} />
                                        <_Input label="Nama" onChange={handleChange('pjnama')} />
                                        <_Input sm={7} label="No. HP" onChange={handleChange('pjnohp')} />
                                        <_Select option={combobox.statuskeluarga} label="Hubungan Keluarga"
                                            val="id" caption="statuskeluarga" sm={5}
                                            onChange={handleChange('pjhubungan')}
                                        />

                                        <hr />
                                        <_Row>
                                            <_Button block submit sm={7} btnSave title="Simpan" icon={<CloudDownloadOutlined />} color="orange" />
                                            <_Button block danger sm={5} onClick={() => history.goBack()} btnCancel title="Batal" />

                                        </_Row>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>


                </Row>

            </Form>


        </LayoutAnt >
    )
}

export default withRouter(PasienDaftar)

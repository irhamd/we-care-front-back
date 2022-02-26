import React, { createRef, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
// import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
// import LayoutAnt from '../../Layout/LayoutAnt'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Image, Spin } from 'antd';
import { MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, StopOutlined } from '@ant-design/icons';
import _Api from '../../../../../Services/Api/_Api';
import { ubahText } from '../../../../../Services/Crypto';
import { DivCol, _Button, _Input, _RadioGroup, _Select, _Switch, _Text, _TitleBar } from '../../../../../Services/Forms/Forms';
import { _Col, _Row } from '../../../../../Services/Forms/LayoutBootstrap';
import { _Toastr } from '../../../../../Services/Toastr/Notify/_Toastr';
import LayoutAnt from '../../../../Layout/LayoutAnt';
import TempInputPelayananDiLab from './Temp-InputPelayananDiLab';



function InputPelayananDiLab(pr) {

    const { Panel } = Collapse;
    const formRef = createRef();
    const [form] = Form.useForm();
    const [spin, setSpin] = useState(true)
    let hash = pr.location.pathname
    const history = useHistory()

    const arr = ubahText(hash.split("/InputPelayananDiLab/")[1])

    let data = JSON.parse(arr)

    const [combobox, setcombobox] = useState({})
    const [produk, setProduk] = useState([])
    const [ruangan, setruangan] = useState([])
    const [pegawai, setpegawai] = useState([])
    const [dataForm, setdataForm] = useState({})
    const [state, setstate] = useState({})


    const loadCombobox = () => {
        _Api.get("resep/get-combo-resep").then(res => {
            setcombobox(res.data)
            // setSpin(false)
        })
        _Api.get(`lab/get-ruangan-lab`).then(res => {
            setruangan(res.data)
            // setSpin(false)
        })
        _Api.get("tindakan/get-pegawai").then(res => {
            setpegawai(res.data)
            // setSpin(false)
        })

        _Api.get("lab/get-produk-blanko-lab").then(res => {
            setProduk(res.data)
        })

    }
    // "norec_pd" : "5542ec10-f725-11eb-882e-7df4c876",
    // "norec_apdlab" : "",
    // "idruanganlab": 20,
    // "ruanganlab": "LABORATORIUM",
    // "idruanganasal": 1,
    // "ruanganasal": "Poli Umum",
    // "tglregistrasi" : "2021-08-10 08:30:00",
    // "norec_blankolab": "",
    // "noblankolab": "",
    // "statusprioritas": "TIDAK",
    // "nolab": "",


    // idruangan: 8
    // namapasien: 'Irfan'
    // noblankolab: 'BL2108000000003'
    // nocm: 'P00000015'
    // nocmfk: 24
    // norec_apd: '60965cf0-fb17-11eb-997c-13307f35'
    // norec_blankolab: '8a4674a0-fb1a-11eb-a525-439a0a24'
    // norec_pd: '60964040-fb17-11eb-8efc-0d8bdc6a'
    // noregistrasi: '2108000005'
    // pegawaiblanko: 'H. Ridwan'
    // ruangan: 'POLI ANAK'



    const LoadData = async () => {
        try {
            setSpin(true)
            await _Api.get(`lab/get-detail-blankolab-bynorec?norec_blankolab=${data.norec_blankolab}`).then(res => {
                let row = res.data
                setdataForm({ ...res.data, 'nolab': '', norec_apdlab: '' })
                setSpin(false)
                // setstate({ ...state, namadokter: [row.idpegawai, row.pegawai] })
                // setstate({ ...state, asisten: [row.idasisten, row.asisten] })


                form.setFieldsValue({
                    ...row,
                    detail: res.data.details
                });
            })

        } catch (error) {
            setSpin(false)
        }
    }

    const ulang = () => {
        form.resetFields();
    }


    useEffect(async () => {
        setSpin(true)
        loadCombobox()
        await LoadData()

    }, [])
    const onFinish = (values) => {
        console.log(values);
        var gabung = { ...values, ...dataForm }
        console.log(gabung)
        _Api.post("lab/save-pemeriksaan-lab", gabung).then(res => {
            LoadData()
            ulang()
            _Toastr.success(res.data.message)
            history.goBack()
        }).catch(err => {
            _Toastr.error(err.response.data.message)
        })
    };
    return (
        <LayoutAnt>
            <_TitleBar align="center" title="RESEP APOTEK" />
            <DivCol>
                <_Row stle={{ paddingTop: "-20px" }}>
                    <_Col sm={12}>
                        <_Row>
                            <_Col sm={1} style={{ background: "#bfbfbf" }}>
                                {/* <Image width={124} style={{ paddingRight: "20px" }} className="rounded" src={foto} /> */}
                            </_Col>
                            <_Col>
                                <Descriptions
                                    bordered
                                    size={"small"}
                                    column={4}
                                    contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                                    labelStyle={{ background: "rgb(208, 220, 229)", textAlign: "right" }}
                                >
                                    <Descriptions.Item label="No. RM : ">{dataForm.nocm}</Descriptions.Item>
                                    <Descriptions.Item label="Nama Pasien :">{dataForm.namapasien}</Descriptions.Item>
                                    <Descriptions.Item label="Tempat Lahir :">{dataForm.tempatlahir}</Descriptions.Item>
                                    <Descriptions.Item label="No. KTP :">{dataForm.noktp}</Descriptions.Item>
                                    <Descriptions.Item label="Jenis Kelamin :">{dataForm.jeniskelamin}</Descriptions.Item>
                                    <Descriptions.Item label="Tanggal Registrasi :">{dataForm.tglregistrasi}</Descriptions.Item>
                                    <Descriptions.Item label="No. Registrasi :">{dataForm.noregistrasi}</Descriptions.Item>
                                    <Descriptions.Item label="Asal Rujukan :"> &nbsp;{dataForm.asalrujukan}</Descriptions.Item>
                                    <Descriptions.Item label="Penjamin :">{dataForm.penjamin}</Descriptions.Item>
                                    <Descriptions.Item label="Ruangan Saat Ini :">{dataForm.ruangan}</Descriptions.Item>
                                    <Descriptions.Item label="Instalasi :">{dataForm.instalasi}</Descriptions.Item>
                                </Descriptions>
                            </_Col>
                        </_Row>
                    </_Col>
                    <_Col sm={12}>
                        {/* <p>{JSON.stringify(dataResep)}</p> */}
                        <Collapse bordered collapsible
                            style={{ background: "#40a9ff1c" }}
                            expandIcon={({ isActive }) => <PlayCircleTwoTone rotate={isActive ? 90 : 0} />}
                            defaultActiveKey={[1, 2, 3]}
                        >
                            {/* <p>{arr}  </p> */}
                            <Panel header="Input Resep" key="1">
                                <br />
                                <Form onFinish={onFinish} form={form} autoComplete="off" layout="vertical"
                                    ref={formRef}
                                    initialValues={{
                                        norec_apd: dataForm.norec_apd,
                                    }}
                                >
                                    <_Row>
                                        <_Col sm={4} style={{ paddingLeft: "20px" }}>
                                            <br/>
                                            <_Input multiline name="saran" label="Saran" disabled style={{marginTop:"2px"}} />
                                            <_Input option={ruangan} name="ruanganlab" disabled val="id" label="Ruangan Penunjang" caption="ruanganlab" />
                                            <_Input label="Ruangan Asal" name="ruanganasal" disabled />
                                            <_Input label="Status Prioritas" name="statusprioritas" disabled />
                                            <_Input name="norec_apd" hidden />
                                            <_Input name="norec_rp" hidden />
                                        </_Col>
                                        <_Col sm={8}>
                                            <Spin spinning={spin}>
                                                <TempInputPelayananDiLab pegawai={pegawai} produk={produk} LoadData={LoadData} dataResep={dataForm} formRef={formRef} combobox={combobox} />
                                            </Spin>
                                        </_Col>
                                    </_Row>
                                </Form>

                            </Panel>
                        </Collapse>
                    </_Col>
                </_Row>



            </DivCol>
        </LayoutAnt >
    )
}

export default withRouter(InputPelayananDiLab)

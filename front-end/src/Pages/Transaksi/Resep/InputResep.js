import React, { createRef, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ubahText } from '../../../Services/Crypto'
import { DivCol, _Button, _Input, _RadioGroup, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../../Layout/LayoutAnt'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Image, Spin } from 'antd';
import { MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, StopOutlined } from '@ant-design/icons';
import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import _Api from '../../../Services/Api/_Api'
import TemptResep from './TemptResep'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'
// import foto from "../_Assets/foto/foto.jpg"
import foto from "../../../_Assets/foto/users.png"


function InputResep(pr) {

    const { Panel } = Collapse;
    const formRef = createRef();
    const [form] = Form.useForm();
    const [spin, setSpin] = useState(false)
    let hash = pr.location.pathname
    const arr1 = ubahText(hash.split("/Resep/")[1])
    let data = JSON.parse(arr1)

    const [combobox, setcombobox] = useState({})
    const [pegawai, setpegawai] = useState([])
    const [dataResep, setdataResep] = useState({})
    const [state, setstate] = useState({})

    const loadCombobox = () => {
        _Api.get("resep/get-combo-resep").then(res => {
            setcombobox(res.data)
            setSpin(false)

        })
        _Api.get("tindakan/get-pegawai").then(res => {
            setpegawai(res.data)
            setSpin(false)

        })
    }
    const LoadData = () => {
        try {
            _Api.get(`resep/get-resep-pasien?noregistrasi=${data.noregistrasi}`).then(res => {
                let row = res.data
                setdataResep(res.data)
                setSpin(false)
                setstate({ ...state, namadokter: [row.idpegawai, row.pegawai] })
                setstate({ ...state, asisten: [row.idasisten, row.asisten] })

                form.setFieldsValue({
                    noresep: row.noresep,
                    idpegawai: row.idpegawai,
                    idasisten: row.idasisten,
                    idruanganresep: row.idruanganresep,
                    norec_rp: row.norec_rp,
                    statusprioritas: row.statusprioritas,
                    alergiobat: row.alergiobat,
                });
            })
        } catch (error) {
            setSpin(false)
        }
    }

    const ulang = () => {
        form.resetFields();
    }

    useEffect(() => {
        setSpin(true)
        loadCombobox()
        LoadData()


    }, [])
    const onFinish = (values) => {
        // console.log(values);
        _Api.post("resep/save-resep-pasien", values).then(res => {
            // console.log(res)
            LoadData()
            ulang()
            _Toastr.success(res.data.message)
        }).catch(err => {
            _Toastr.error(err.response.data.message)
        })
    };
    return (
        <LayoutAnt>
            <_TitleBar align="center" title="RESEP" />
            <DivCol>
                {/* <pre> {arr1} </pre> */}
                {/* <p> {JSON.stringify(dataResep)} </p> */}
                <_Row stle={{ paddingTop: "-20px" }}>
                    <_Col sm={12}>
                        {/* <DetailPasien nocm={data.nocm} /> */}
                        <_Row>
                            {/* <_Col sm={1} style={{ background: "#bfbfbf" }}>
                                <Image width={124} style={{ paddingRight: "20px" }} className="rounded" src={foto} />
                            </_Col> */}
                            <_Col>
                                <Descriptions
                                    bordered
                                    size={"small"}
                                    column={4}
                                    contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                                    labelStyle={{ background: "rgb(208, 220, 229)", textAlign: "right" }}
                                >
                                    <Descriptions.Item label="No. RM : ">{data.nocm}</Descriptions.Item>
                                    <Descriptions.Item label="Nama Pasien :">{data.namapasien}</Descriptions.Item>
                                    {/* <Descriptions.Item label="Nama Pasien">{data.namapasien}</Descriptions.Item> */}
                                    <Descriptions.Item label="Tempat Lahir :">{data.tempatlahir}</Descriptions.Item>
                                    <Descriptions.Item label="No. KTP :">{data.noktp}</Descriptions.Item>
                                    <Descriptions.Item label="Jenis Kelamin :">{data.jeniskelamin}</Descriptions.Item>
                                    <Descriptions.Item label="Tgl Lahir :">{data.tgllahir}</Descriptions.Item>
                                    <Descriptions.Item label="No. Registrasi :">{data.noregistrasi}</Descriptions.Item>
                                    <Descriptions.Item label="Asal Rujukan :"> &nbsp;{data.asalrujukan}</Descriptions.Item>
                                    <Descriptions.Item label="Penjamin :">{data.penjamin}</Descriptions.Item>
                                    <Descriptions.Item label="Ruangan Saat Ini :">{data.ruangan}</Descriptions.Item>
                                    <Descriptions.Item label="Instalasi :">{data.instalasi}</Descriptions.Item>
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
                            {/* <p>{arr1}  </p> */}
                            <Panel header="Input Resep" key="1">
                                <br />
                                <Form onFinish={onFinish} form={form} autoComplete="off"
                                    ref={formRef}
                                    initialValues={{
                                        norec_apd: data.norec_apd,
                                        // idpegawai: dataResep && dataResep.idpegawai

                                    }}
                                // {...formItemLayout}
                                >
                                    <_Row>
                                        <_Col sm={1} />
                                        <_Col sm={{ offset: 1, span: 4 }}>
                                            <_Row>

                                                <_Text sm={3} label="Nomor Resep" mb="1px" align="right" />
                                                <_Input name="noresep" disabled mb="0px" sm={8} />


                                                <_Text sm={3} label="Nama Dokter" mb="1px" align="right" />
                                                <_Select option={pegawai} name="idpegawai" sm={8}
                                                    val="id" caption="namalengkap" mb="0px" />

                                                {/* <_Autocomplete sm={8}
                                                    placeholder={dataResep.pegawai}
                                                    name="idpegawai" required
                                                    route="tindakan/get-pegawai"
                                                    field="nama" search="namalengkap"
                                                /> */}
                                                <_Text sm={3} label="Asisten" mb="1px" align="right" />
                                                {/* <_Autocomplete name="idasisten" required sm={8}
                                                    defaultValue={state.asisten}
                                                    route="tindakan/get-pegawai"
                                                    field="nama"
                                                    search="namalengkap"
                                                /> */}
                                                <_Select option={pegawai} name="idasisten" sm={8}
                                                    val="id" caption="namalengkap" mb="0px" />

                                                <_Input name="norec_apd" hidden />
                                                <_Input name="norec_rp" hidden />
                                            </_Row>
                                        </_Col>
                                        <_Col sm={{ offset: 1, span: 4 }}>
                                            <_Row>
                                                <_Text sm={3} label="Ruangan" mb="1px" align="right" />
                                                <_Select option={combobox.ruangan} name="idruanganresep" sm={8} val="id" caption="ruangan" mb="0px" />

                                                <_Text sm={3} label="Status Prioritas" mb="1px" align="right" />
                                                <_RadioGroup defaultValue={dataResep.statusprioritas} name={'statusprioritas'} options={[
                                                    { label: 'Ya', value: 'Ya' },
                                                    { label: 'Tidak', value: 'Tidak' },
                                                ]} sm={8} />
                                                <_Text sm={3} label="Alergi Obat" mb="1px" align="right" />
                                                <_Input name="alergiobat" mb="0px" sm={8} defaultValue={dataResep.alergiobat} />
                                            </_Row>
                                        </_Col>

                                        {/* <_Col sm={{ offset: 1, span: 4 }}>
                                            <_Row>
                                                <_Autocomplete
                                                    name="idpegawai" required
                                                    route="tindakan/get-pegawai"
                                                    label="Nama Dokter"
                                                    field="nama" search="namalengkap" mb="0px"
                                                />
                                                <_Autocomplete name="idasisten" required
                                                    route="tindakan/get-pegawai"
                                                    label="Asisten"
                                                    field="nama"
                                                    search="namalengkap"
                                                    mb="0px"
                                                />
                                                <_Input nam="alergiobat" label="Alergi Obat" />
                                                <_Select option={combobox.ruangan} label="Ruangan Tujuan" val="id" caption="ruangan" mb="0px" />
                                            </_Row>
                                        </_Col> */}


                                    </_Row>
                                    <Spin spinning={spin}>
                                        <TemptResep LoadData={LoadData} dataResep={dataResep} formRef={formRef} combobox={combobox} />
                                    </Spin>
                                </Form>

                            </Panel>
                        </Collapse>
                    </_Col>
                </_Row>



            </DivCol>
        </LayoutAnt >
    )
}

export default withRouter(InputResep)

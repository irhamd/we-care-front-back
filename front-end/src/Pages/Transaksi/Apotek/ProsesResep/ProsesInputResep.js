import React, { createRef, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { DivCol, _Button, _Input, _RadioGroup, _Select, _Switch, _Text, _TitleBar } from '../../../../Services/Forms/Forms';
// import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
// import LayoutAnt from '../../Layout/LayoutAnt'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Image, Spin } from 'antd';
import { MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, StopOutlined } from '@ant-design/icons';
// import _Autocomplete from '../../../Services/Forms/_Autocomplete'
// import TemptResep from './TemptResep'
// import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'
// import foto from "../_Assets/foto/foto.jpg"
// import foto from "../../../_Assets/foto/foto.jpg"
import foto from '../../../../_Assets/foto/foto.jpg'
import _Api from '../../../../Services/Api/_Api'
import { ubahText } from '../../../../Services/Crypto'
import { _Col, _Row } from '../../../../Services/Forms/LayoutBootstrap';
import LayoutAnt from '../../../Layout/LayoutAnt';
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr';
import TempProsesResep from './TempProsesResep';
import { Cache } from '../../../../Services/Cache';
import DetailPasienDaftar from '../../../Pasien/DetailPasienDaftar';



function ProsesInputResep(pr) {

    const { Panel } = Collapse;
    const formRef = createRef();
    const [form] = Form.useForm();
    const [spin, setSpin] = useState(true)
    let hash = pr.location.pathname
    const history = useHistory()

    const arr1 = ubahText(hash.split("/ProsesResep/")[1])
    var obatBaru = Cache.get('norec_rp')

    let data = JSON.parse(obatBaru ? obatBaru : arr1)

    const [combobox, setcombobox] = useState({})
    const [produk, setProduk] = useState([])
    const [pegawai, setpegawai] = useState([])
    const [dataResep, setdataResep] = useState({})
    const [state, setstate] = useState({})


    const loadCombobox = () => {
        _Api.get("resep/get-combo-resep").then(res => {
            setcombobox(res.data)
            // setSpin(false)
        })
        _Api.get(`apotik/get-produk-pelayanan-obat?idruangan=${obatBaru ? obatBaru.iddepo : data.iddepo}`).then(res => {
            setProduk(res.data)
            // setSpin(false)
        })
        _Api.get("tindakan/get-pegawai").then(res => {
            setpegawai(res.data)
            // setSpin(false)

        })
    }

    const FilterObat = (id) => {

        _Api.get(`apotik/get-produk-pelayanan-obat?idruangan=${id}`).then(res => {
            setProduk(res.data)
            // setSpin(false)
        })
    }
    const LoadData = () => {
        try {
            setSpin(true)
            console.log(data)
            _Api.get(`apotik/get-detail-resep-bynores?norec_apd=${data.norec_apd}`).then(res => {
                let row = res.data
                setdataResep(res.data)
                setSpin(false)
                setstate({ ...state, namadokter: [row.idpegawai, row.pegawai] })
                setstate({ ...state, asisten: [row.idasisten, row.asisten] })

                form.setFieldsValue({
                    ...row,
                    detail: !obatBaru && res.data.details
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
        console.log(values);
        _Api.post("apotik/save-obat-pasien", values).then(res => {
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
                {/* <pre> {arr1} </pre> */}
                {/* <p> {JSON.stringify(dataResep)} </p> */}
                <_Row stle={{ paddingTop: "-20px" }}>
                    <_Col sm={12}>
                        {/* <DetailPasienDaftar  nocm={data.nocm} /> */}
                        <DetailPasienDaftar data={arr1} />
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


                                                <_Text sm={3} label="Penulis Resep" mb="1px" align="right" />
                                                <_Select option={pegawai} name="idpenulisresep" sm={8}
                                                    val="id" caption="namalengkap" mb="0px" />

                                                {/* <_Autocomplete sm={8}
                                                    placeholder={dataResep.pegawai}
                                                    name="idpegawai" required
                                                    route="tindakan/get-pegawai"
                                                    field="nama" search="namalengkap"
                                                /> */}
                                                <_Text sm={3} label="Apoteker" mb="1px" align="right" />
                                                {/* <_Autocomplete name="idasisten" required sm={8}
                                                    defaultValue={state.asisten}
                                                    route="tindakan/get-pegawai"
                                                    field="nama"
                                                    search="namalengkap"
                                                /> */}
                                                <_Select option={pegawai} name="idapoteker" sm={8} required
                                                    val="id" caption="namalengkap" mb="0px" />

                                                <_Input name="norec_apd" hidden />
                                                <_Input name="norec_rp" hidden />
                                            </_Row>
                                        </_Col>
                                        <_Col sm={{ offset: 1, span: 4 }}>
                                            <_Row>
                                                <_Text sm={3} label="Depo" mb="1px" align="right" />
                                                <_Select option={combobox.ruangan} name="iddepo" onSelect={e => FilterObat(e)} sm={8} val="id" caption="ruangan" mb="0px" />

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
                                        <TempProsesResep produk={produk} LoadData={LoadData} dataResep={dataResep} formRef={formRef} combobox={combobox} />
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

export default withRouter(ProsesInputResep)

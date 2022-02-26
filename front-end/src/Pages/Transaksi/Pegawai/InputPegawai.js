import { RollbackOutlined, SaveOutlined, ScheduleFilled } from '@ant-design/icons'
import { Col, Form, Spin, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import _Api from '../../../Services/Api/_Api'
import { DivCol, _Button, _Date, _Input, _RadioGroup, _Select, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import { jeniskelamin, pendidikanakhir } from '../../../Services/Text/GlobalText'
import LayoutAnt from '../../Layout/LayoutAnt'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'

function InputPegawai() {

    const [datapegawai, datasetpegawai] = useState([])
    const [selected, setselected] = useState()
    const [combo, setcombo] = useState()
    const [Loading, setLoading] = useState(true)
    const [form] = Form.useForm()
    const history = useHistory()

    const simpanPegawai = (val) => {
        // console.log(`val`, { ...init1, ...val, })
        var obj = { ...init, ...val, }
        _Api.post(`pegawai/save-pegawai`, obj).then(res => {
            datasetpegawai(res.data)
            setLoading(false)
            _Toastr.success(res.data.message)
            form.resetFields()
        })
    }

    const loadCombo = () => {
        _Api.get(`pegawai/get-data-combo-pegawai`).then(res => {
            setcombo(res.data)
            setLoading(false)
        })
    }

    const init = {
        "idpegawai": "",
        "nik": "",
        "nip": "",
        "noserikartupegawai": "",
        "namalengkap": "",
        "gelardepan": "",
        "gelarbelakang": "",
        "jeniskelamin": "",
        "idjeniskelamin": "0",
        "tempatlahir": "",
        "tgllahir": "",
        "agama": "",
        "idagama": "0",
        "statusperkawinan": "",
        "idstatusperkawinan": "0",
        "email": "",
        "alamat": "",
        "nohp": "",
        "pendidikanawal": "",
        "idpendidikanawal": "0",
        "kodesdmkawal": "",
        "pendidikanakhir": "",
        "idpendidikanakhir": "0",
        "kodesdmkakhir": "",
        "jabatan": "",
        "idjabatan": "0",
        "statuskepegawaian": "",
        "idstatuskepegawaian": "0",
        "tmtmenjadipns": "",
        "tmtmenjadicpns": "",
        "tanggalmulaitugas": "",
        "tanggalberakhirhonorer": "",
        "jeniskepegawaian": "",
        "idjeniskepegawaian": "0",
        "golonganterakhir": "",
        "idgolonganterakhir": "0",
        "tmtgolongan": "",
        "masakerjagolonganthn": "",
        "masakerjagolonganbulan": "",
        "tglberakhirsip": "",
        "tglberakhirstr": "",
        "tglberakhirsik": ""
    }



    useEffect(() => {
        form.resetFields()
        loadCombo()
    }, [])

    return (
        <LayoutAnt>
            <_TitleBar title="PEGAWAI BARU" align="Center" />
            <Spin spinning={Loading} >
                <DivCol style={{ marginTop: "-25px" }}>
                    <Form layout={"vertical"} onFinish={simpanPegawai}
                        initialValues={init} autoComplete={"off"} form={form}
                    >
                        <_Row>
                            <_Col>
                                {/* <div style={{ marginLeft: "20px" }}> */}
                                <_Input name="idpegawai" hidden />
                                <_Row>
                                    <_Input sm={5} required name="nik" label="NIK" />
                                    <_Input sm={6} name="nip" label="NIP" />
                                </_Row>

                                <_Input sm={11} required name="namalengkap" label="Nama Pasien" />
                                <_Row>
                                    <_Input sm={6} name="tempatlahir" label="Tempat Lahir" />
                                    <_Date sm={5} required format="DD-MM-YYYY" label="Tanggal Lahir (dd-mm-yyyy)" />
                                </_Row>
                                <_RadioGroup sm={5} required name="jeniskelamin" label="Jenis Kelamin" options={jeniskelamin} />

                                {/* <_Input sm={4} name="jeniskelamin" label="Jenis Kelamin" /> */}
                                {/* <_Select sm={2} option={combo && combo.agama} label="Agama" name="agama" val="agama" caption="agama" /> */}
                                <_Select sm={5} option={combo && combo.statusperkawinan} label="Status Perkawinan" name="statusperkawinan" val="statusperkawinan" caption="statusperkawinan" />
                                <_Select sm={5} required required option={combo && combo.jeniskepegawaian} label="Jenis Pegawai" name="jeniskepegawaian" val="jeniskepegawaian" caption="jeniskepegawaian" />
                                <_Select sm={5} option={combo && combo.golongan} label="Golongan" name="golonganterakhir" val="golongan" caption="golongan" />
                            </_Col>
                            <_Col>
                                <_Select sm={4} option={combo && combo.statuskepegawaian} label="Status Kepegawaian" name="statuskepegawaian" val="statuskepegawaian" caption="statuskepegawaian" />
                                <_Select sm={6} required option={combo && combo.jabatan} label="Jabatan"
                                    name="jabatan" val="jabatan" caption="jabatan" />

                                <_Input sm={5} name="email" label="Email" />
                                <_Input multiline required name="alamat" label="Alamat" />
                                <_Input sm={4} required name="nohp" label="No. HP" />
                                <_Select sm={6} required option={combo && combo.pendidikan} label="Pendidikan Terakhir"
                                    name="pendidikanakhir" val="pendidikan" caption="pendidikan" />


                                {/* <_Input sm={4} name="pendidikanakhir" label="Pendidikan Terakhir" /> */}
                            </_Col>
                            {/* </div> */}
                        </_Row>
                        <hr />
                        <_Row>

                            <_Button icon={<SaveOutlined />} sm={3} style={{ marginTop: "23px" }} block sm={2} submit label="Simpan" />
                            <_Button icon={<RollbackOutlined />} sm={3} style={{ marginTop: "23px" }} onClick={()=>history.goBack()} block sm={2} danger label="Kembali" />
                        </_Row>

                    </Form>

                </DivCol>
            </Spin>
        </LayoutAnt>
    )
}

export default InputPegawai

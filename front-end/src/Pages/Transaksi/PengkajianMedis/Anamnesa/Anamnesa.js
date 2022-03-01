import { Card, Form, Radio } from 'antd'
// import { Button } from 'bootstrap'
import moment from 'moment'
import React, { createRef, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import _Api from '../../../../Services/Api/_Api'
import { comboBox } from '../../../../Services/Combo'
import { DivCol, _Button, _Input, _Mentions, _Select, _Text } from '../../../../Services/Forms/Forms'
import { _CheckBox } from '../../../../Services/Forms/FormsAdd'
import { _Col, _Row } from '../../../../Services/Forms/LayoutBootstrap'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete'
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr'
import Lainnya from './Lainnya'
import PemeriksaanFisik from './PemeriksaanFisik'

function Anamnesa(pr) {
    const formRef = createRef();

    const [dataAnamnesa, setdataAnamnesa] = useState({
        anamnesahead: {
            "norec_anhead": "",
            "norec_apd": pr.row.norec_apd
        },
    })
    const [valueForm, setvalueForm] = useState(pr.data)

    // var listKeluhan = [
    //     { value: "batuk", caption: "Batuk" },
    //     { value: "demam", caption: "demam" },
    //     { value: "pilek", caption: "pilek" },
    // ]

    var listKeluhan = [
        { "value": "demam", "caption": "demam" },
        { "value": "sakit kepala", "caption": "sakit kepala" },
        { "value": "batuk", "caption": "batuk" },
        { "value": "sakit tenggorokan", "caption": "sakit tenggorokan" },
        { "value": "sakit mata", "caption": "sakit mata" },
        { "value": "sakit gigi", "caption": "sakit gigi" },
        { "value": "sariawan", "caption": "sariawan" },
        { "value": "panas dalam", "caption": "panas dalam" },
        { "value": "muntaber", "caption": "muntaber" },
        { "value": "gatal-gatal", "caption": "gatal-gatal" }
    ]


    const onFinish = (values) => {
        // let obj = Object.assign(values, dataAnamnesa)
        const obj = { ...dataAnamnesa, ...values };
        // const obj = { values };
        _Api.post("anamnesa/save-anamnesa-pasien", obj).then(res => {
            _Toastr.success(res.data.message)

        }).catch(err => {
            _Toastr.error(err.response.data.message + " ' " + err.response.data.error + " '")

        })
    };




    const aturField = (field, sub, value) => {
        let data = formRef.current

        data.setFieldsValue({
            [field]: { [sub]: value },
        });
    }

    const getIMT = () => {
        let data = formRef.current

        var TB = data.getFieldValue(['pemeriksaanfisik', 'tinggibadan']) / 100
        var BB = data.getFieldValue(['pemeriksaanfisik', 'beratbadan'])
        var imt = BB / (TB * TB)

        let ket = ""
        if (imt < 17) ket = "Kurus"
        if (imt > 18 && imt < 23) ket = "Normal"
        if (imt > 25 && imt < 27) ket = "Kegemukan"
        if (imt > 27) ket = "Obesitas"

        aturField("pemeriksaanfisik", "imt", imt.toFixed(2))
        aturField("pemeriksaanfisik", "hasilimt", ket)
    }


    const cekSkalaNyeri = (angka) => {
        let data = formRef.current
        let ket = ""
        if (angka <= 3) {
            ket = "Ringan"
        } else
            if (angka <= 6) {
                ket = "Sedang"
            } else
                ket = "Berat"

        data.setFieldsValue({
            pemeriksaanfisik: { "skalanyeri": ket },
            skalanyeriangkalagi: angka,
        });
    }

    const loadData = () => {
        let data = formRef.current
        _Api.get(`anamnesa/get-anamnesa-pasien?noregistrasi=${pr.row.noregistrasi}`).then(res => {
            if (res.data.anamnesahead != null) {
                setdataAnamnesa({ anamnesahead: res.data.anamnesahead })
                data.setFieldsValue(res.data)
            }
        })
    };

    let initialValues = {
        "pemeriksaanfisik": {
            "statushamil": "Tidak",
            "caraukurtb": "Berdiri",
            "detakjantung": "Regular",
            "triage": "Tidak Gawat Darurat",
            "kesadaran": "",
            "idkesadaran": "",
            "sistole": "",
            "diastole": "",
            "tinggibadan": "",
            "idcaraukur": "",
            "beratbadan": "",
            "lingkarperut": "",
            "imt": "",
            "hasilimt": "",
            "detaknadi": "",
            "nafas": "",
            "saturasi": "",
            "suhu": "",
            "aktifitasfisik": "",
            "skalanyeri": "",
            "skalanyeriangka": ""
        },
        "lainnya": {
            "tipeaskep": "Text",
            "merokok": "Tidak",
            "konsumsialkohol": "Tidak",
            "kurangsayurbuah": "Tidak",
            "edukasi": "",
            "terapi": "",
            "rencana": "",
            "deskripsiaskep": "",
            "observasi": "",
            "biopsikososial": "",
            "keterangan": "",
        },
        "riwayatpenyakit": {
            "istidakada": true
        },
        "alergipasien": {
            "istidakada": true
        },
        "anamnesa": {
            "lamasakitthn": "",
            "lamasakitbln": "",
            "lamasakithr": ""
        },
    }

    useEffect(() => {
        loadData()
        // let data = formRef.current
        // aturField("pemeriksaanfisik", "imt", imt.toFixed(2))

        formRef.current.setFieldsValue({
            // pemeriksaanfisik: { imt: "beaasss" },
        });

    }, [])

    return (
        <div>
            <_Row>
                <_Col>
                    <Form onFinish={onFinish}
                        initialValues={initialValues}
                        autoComplete="off"
                        // initialValues={pr.data}
                        ref={formRef}
                    >
                        <Card title=" _Anamnesa" size="small">
                            <br />
                            <_Row>
                                <_Col sm={6}>
                                    <_Row>
                                        <_Text align="right" sm={4}> Nama Dokter / Perawat </_Text>
                                        {/* <_Autocomplete
                                            name={['anamnesa', 'idpegawai']}
                                            required label=" "
                                            sm={8}
                                            onChange={handleChange("idpegawai", null, "anamnesa")}
                                            route="tindakan/get-pegawai"
                                            field="nama"
                                            search="namalengkap"
                                        /> */}

                                        <_Select name={['anamnesa', 'idpegawai']} label=" " option={pr.combo.pegawai} sm={8}
                                            val="id" caption="namalengkap" required />


                                        <_Text align="right" sm={4}> Keluhan Utama </_Text>
                                        <_Mentions required sm={8} name={['anamnesa', 'keluhanutama']} list={listKeluhan}
                                            placeholder="Tambahkan tanda koma {,} untuk mengaktifkan autocomplete ."
                                            value="okee"
                                        />

                                    </_Row>
                                </_Col>
                                <_Col sm={6}>
                                    <_Row>

                                        {/* <_Text align="right" sm={4}> Perawat / Asisten </_Text>
                                        <_Autocomplete
                                            name={['anamnesa', 'idasisten']}
                                            required
                                            required label=" "
                                            sm={8}
                                            onChange={handleChange("idasisten", null, "anamnesa")}
                                            route="tindakan/get-pegawai"
                                            field="nama"
                                            search="namalengkap"
                                        />

                                        <_Select name={['anamnesa', 'idasisten']} label=" " option={pr.combo.pegawai} sm={8}
                                            val="id" caption="namalengkap" /> */}


                                        <_Text align="right" sm={4}> Keluhan Tambahan </_Text>

                                        <_Mentions required sm={8} name={['anamnesa', 'keluhantambahan']} list={listKeluhan}
                                            placeholder="Tambahkan tanda koma {,} untuk mengaktifkan autocomplete ." />
                                    </_Row>
                                </_Col>
                                <_Row>
                                    <_Text align="right" sm={5} > Lama Sakit &nbsp; :  </_Text>
                                    <_Col>
                                        <_Row>
                                            <_Input name={['anamnesa', 'lamasakitthn']} addonAfter="Tahun" sm={{ span: 4 }} />
                                            <_Input name={['anamnesa', 'lamasakitbln']} addonAfter="Bulan" sm={4} />
                                            <_Input name={['anamnesa', 'lamasakithr']} addonAfter="Hari" sm={4} />
                                        </_Row>
                                    </_Col>
                                </_Row>
                            </_Row>
                        </Card>
                        <PemeriksaanFisik getIMT={getIMT} aturField={aturField} cekSkalaNyeri={cekSkalaNyeri} />
                        {/* <Lainnya /> */}
                        <hr />
                        <_Row>
                            <_Button block btnSave submit title="Simpan" style={{ marginBottom: "50px" }} size="large" sm={{ span: 3, offset: 9 }} />

                        </_Row>
                    </Form>
                </_Col>
            </_Row>

        </div>
    )
}

export default Anamnesa

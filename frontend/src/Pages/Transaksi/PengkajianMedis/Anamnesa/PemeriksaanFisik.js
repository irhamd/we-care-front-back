import { Card, Form, Input, InputNumber, Radio, Skeleton, Slider } from 'antd'
import Text from 'antd/lib/typography/Text'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import _Api from '../../../../Services/Api/_Api'
import { comboBox } from '../../../../Services/Combo'
import { DivCol, _Button, _Input, _Mentions, _Number, _RadioGroup, _Select, _Switch, _Text } from '../../../../Services/Forms/Forms'
import { _Slider } from '../../../../Services/Forms/FormsAdd'
import { _Col, _Row } from '../../../../Services/Forms/LayoutBootstrap'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete'
import { marksSkalaNyeri } from '../../../../Services/Text/GlobalText'

function PemeriksaanFisik(pr) {

    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])
    const [state, setState] = useState({})
    const [pfisik, setpfisik] = useState(true)
    const [rpenyakit, setrpenyakit] = useState(true)


    const listStatusHamil = [
        { label: 'Tidak', value: 'Tidak' },
        { label: 'Ya', value: 'Ya' },
    ];

    const listDetakJantung = [
        { label: 'Regular', value: 'Regular' },
        { label: 'Irregular', value: 'Irregular' },
    ];

    const listTriage = [
        { label: 'Gawat Darurat', value: 'Gawat Darurat' },
        { label: 'Darurat', value: 'Darurat' },
        { label: 'Tidak Gawat Darurat', value: 'Tidak Gawat Darurat' },
        { label: 'Meninggal', value: 'Meninggal' },
    ];

    const getComboOption = (name) => (e, f) => {
        pr.aturField('pemeriksaanfisik', name, f && f.children[1])
    }

    const LoadCombo = () => {
        setLoading(true)
        _Api.get("anamnesa/get-combo-anamnesa").then(res => {
            setCombo(res.data)
            setLoading(false)
        })
    }


    useEffect(() => {
        LoadCombo()
    }, []);

    return (
        <>
            <Card title=" _   Pemeriksaan Fisik" size="small" extra={<_Switch  defaultChecked={pfisik} onChange={e => setpfisik(e)} />}>
                <br />
                <Skeleton loading={!pfisik} active>
                    <_Row>
                        <_Col sm={5}>
                            <_Row>
                                {/* <_Text align="right" sm={4}> Kesadaran  &nbsp; :</_Text>
                                <_Select sm={8} name={['pemeriksaanfisik', 'idkesadaran']} option={Combo.kesadaran} val="id" caption="value"
                                    onChange={getComboOption('kesadaran')} /> */}
                                <_Input name={['pemeriksaanfisik', 'kesadaran']} hidden />

                                <_Text align="right" sm={4}> Sistole  &nbsp; :</_Text>
                                <_Input number name={['pemeriksaanfisik', 'sistole']} addonAfter="mm" sm={6} />

                                <_Text align="right" sm={4}> Diastole  &nbsp; :</_Text>
                                <_Input number addonAfter="Hg" name={['pemeriksaanfisik', 'diastole']} sm={5} />

                                <_Text align="right" sm={4}> Tinggi Badan  &nbsp; :</_Text>
                                <_Input addonAfter="Cm" required number name={['pemeriksaanfisik', 'tinggibadan']} sm={5} />

                                <_Text align="right" sm={4}> Cara Ukur Badan  &nbsp; :</_Text>
                                {/* <_RadioGroup name={['pemeriksaanfisik', 'idcaraukur']} val="id"
                                onChange={getCaraUkur}
                                caption="value" options={Combo.caraukurtb} sm={8} /> */}

                                <_Select sm={8} name={['pemeriksaanfisik', 'idcaraukur']} option={Combo.caraukurtb} val="id" caption="value"
                                    onChange={getComboOption('caraukurtb')} />

                                <_Input name={['pemeriksaanfisik', 'caraukurtb']} hidden />

                                <_Text align="right" sm={4}> Berat Badan  &nbsp; :</_Text>
                                <_Input addonAfter="Kg" onChange={pr.getIMT} name={['pemeriksaanfisik', 'beratbadan']} sm={5} />

                                <_Text align="right" sm={4}> Lingkar Perut  &nbsp; :</_Text>
                                <_Input addonAfter="Cm" name={['pemeriksaanfisik', 'lingkarperut']} sm={5} />

                                <_Text align="right" sm={4}> IMT  &nbsp; :</_Text>
                                <_Input disabled name={['pemeriksaanfisik', 'imt']} sm={8} />

                                <_Text align="right" sm={4}> Hasil IMT  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'hasilimt']} disabled sm={8} />


                            </_Row>
                        </_Col>
                        <_Col sm={7}>
                            <_Row>

                                <_Text align="right" sm={4}> Detak Nadi  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'detaknadi']} addonAfter="/menit" sm={5} />

                                <_Text align="right" sm={4}> Nafas  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'nafas']} addonAfter="/menit" sm={5} />

                                <_Text align="right" sm={4}> Saturasi (Sp02)  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'saturasi']} addonAfter="%" sm={5} />

                                <_Text align="right" sm={4}> Suhu  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'suhu']} addonAfter="°C" sm={5} />

                                <_Text align="right" sm={4}> Aktifitas Fisik  &nbsp; :</_Text>
                                <_Input name={['pemeriksaanfisik', 'aktifitasfisik']} multiline sm={8} />


                                <_Text align="right" sm={4}> Status Hamil  &nbsp; :</_Text>
                                <_RadioGroup hidden name={['pemeriksaanfisik', 'statushamil']} options={listStatusHamil} sm={8} />

                                <_Text align="right" sm={4}> Detak Jantung  &nbsp; :</_Text>
                                <_RadioGroup name={['pemeriksaanfisik', 'detakjantung']} options={listDetakJantung} sm={8} />

                                {/* <_Text align="right" sm={4}> Triage  &nbsp; :</_Text>
                                <_RadioGroup size={"small"} name={['pemeriksaanfisik', 'triage']} direction="vertical" sm={{ span: 8, offset: 3 }} options={listTriage} /> */}

                            </_Row>
                        </_Col>
                        <_Col>
                            {/* <_Text align="right" sm={4}> Skala Nyeri  &nbsp; :</_Text> */}
                            <br />
                            <Form.Item style={{ paddingLeft: "100px" }} name={['pemeriksaanfisik', 'skalanyeriangka']}>
                                <Slider max={10} marks={marksSkalaNyeri} onChange={e => {
                                    // setskalanyeri(e)
                                    pr.cekSkalaNyeri(e)
                                }
                                } />
                            </Form.Item>
                        </_Col>
                    </_Row>
                    <_Row>
                        <_Input name={['pemeriksaanfisik', 'skalanyeriangka']} disabled sm={{ span: 2, offset: 4 }} label="Skala Nyeri" />
                        <_Input name={['pemeriksaanfisik', 'skalanyeri']} disabled sm={{ span: 2 }} />
                    </_Row>
                </Skeleton>
            </Card>
            <Card title="_Riwayat Penyakit" size="small" extra={<_Switch defaultChecked={rpenyakit}  onChange={e => setrpenyakit(e)} />}>
                <_Row>
                    <Skeleton loading={!rpenyakit} active>

                        <_Col sm={{ span: 4, offset: 1 }}>
                            <br />
                            <_Row>
                                <_Switch name={['riwayatpenyakit', 'istidakada']} onChange={(e) => setState({ ...state, riwayatP: e })} sm={{ span: 10, offset: 1 }} label="Tidak Ada Riwayat Penyakit" />
                                <_Text align="right" sm={4}> RPS  &nbsp; :</_Text>
                                <_Input name={!state.riwayatP && ['riwayatpenyakit', 'rps']} multiline disabled={state.riwayatP} sm={8} />

                                <_Text align="right" sm={4}> RPD  &nbsp; :</_Text>
                                <_Input name={['riwayatpenyakit', 'rpd']} multiline disabled={state.riwayatP} sm={8} />

                                <_Text align="right" sm={4}> RPK  &nbsp; :</_Text>
                                <_Input name={['riwayatpenyakit', 'rpk']} multiline disabled={state.riwayatP} sm={8} />
                            </_Row>
                        </_Col>
                        <_Col sm={4}>
                            <br />
                            <_Row>
                                <_Switch name={['alergipasien', 'istidakada']}
                                    onChange={(e) => setState({ ...state, riwayatA: e })}
                                    sm={{ span: 10, offset: 1 }} label="Tidak Ada Alergi Pasien" />
                                <_Text align="right" sm={4}> Obat  &nbsp; :</_Text>
                                <_Input name={['alergipasien', 'obat']} sm={8} disabled={state.riwayatA} />

                                <_Text align="right" sm={4}> Makanan  &nbsp; :</_Text>
                                <_Input name={['alergipasien', 'makanan']} multiline sm={8} disabled={state.riwayatA} />

                                <_Text align="right" sm={4}> Lainnya  &nbsp; :</_Text>
                                <_Input name={['alergipasien', 'lainnya']} multiline sm={8} disabled={state.riwayatA} />
                            </_Row>
                        </_Col>
                    </Skeleton>
                </_Row>


            </Card>
        </>


    )
}

export default PemeriksaanFisik

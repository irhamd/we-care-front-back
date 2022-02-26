import { Card, Checkbox, Form, Input, InputNumber, Radio, Skeleton, Slider } from 'antd'
import Text from 'antd/lib/typography/Text'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import _Api from '../../../../Services/Api/_Api'
import { comboBox } from '../../../../Services/Combo'
import { DivCol, _Button, _Input, _Mentions, _Number, _RadioGroup, _Select, _Switch, _Text } from '../../../../Services/Forms/Forms'
import { _CheckBox, _Slider } from '../../../../Services/Forms/FormsAdd'
import { _Col, _Row } from '../../../../Services/Forms/LayoutBootstrap'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete'

function Lainnya(pr) {

    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])
    const [lainnya, setlainnya] = useState(true)

    const listYaTidak = [
        { label: 'Tidak', value: 'Tidak' },
        { label: 'Ya', value: 'Ya' },
    ];

    const listTipeAskep = [
        { label: 'Text', value: 'Text' },
        { label: 'SOAP', value: 'SOAP' },
    ];


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
            <Card title="_ Lainnya" size="small" extra={<_Switch defaultChecked={lainnya}  onChange={e=>setlainnya(e)} />}>
                <br />
                <Skeleton loading={!lainnya} active>
                    <_Row>
                        <_Col>
                            <_Row>

                                <_Text align="right" sm={3}> Edukasi  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'edukasi']} value={"okee"} sm={8} />

                                <_Text align="right" sm={3}> Terapi  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'terapi']} sm={8} />

                                <_Text align="right" sm={3}> Rencana  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'rencana']} sm={8} />

                                <_Text align="right" sm={3}> Tipe Askep  &nbsp; :</_Text>
                                <_RadioGroup name={['lainnya', 'tipeaskep']} required options={listTipeAskep} sm={8} />

                                <_Text align="right" sm={3}> Deskripsi Askep  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'deskripsiaskep']} sm={8} />

                                <_Text align="right" sm={3}> Observasi  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'observasi']} sm={8} />

                                <_Text align="right" sm={3}> Biopsikososial  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'biopsikososial']} sm={8} />

                                <_Text align="right" sm={3}> Keterangan  &nbsp; :</_Text>
                                <_Input number name={['lainnya', 'keterangan']} sm={9} />

                                <_Text align="right" sm={3}> Merokok  &nbsp; :</_Text>
                                <_RadioGroup name={['lainnya', 'merokok']} radio options={listYaTidak} sm={8} />

                                <_Text align="right" sm={3}> Konsumsi Alkohol  &nbsp; :</_Text>
                                <_RadioGroup name={['lainnya', 'konsumsialkohol']} radio options={listYaTidak} sm={8} />

                                <_Text align="right" sm={3}> Kurang Sayuran / Buah  &nbsp; :</_Text>
                                <_RadioGroup name={['lainnya', 'kurangsayurbuah']} radio options={listYaTidak} sm={8} />



                            </_Row>
                        </_Col>


                    </_Row>
                </Skeleton>

            </Card>
        </>


    )
}

export default Lainnya

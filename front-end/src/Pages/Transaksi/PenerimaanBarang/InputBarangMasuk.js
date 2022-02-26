import { CalendarOutlined } from '@ant-design/icons'
import { Card, Form } from 'antd'
import React, { useState } from 'react'
// import Form, { useForm } from 'antd/lib/form/Form'

import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import _Api from '../../../Services/Api/_Api'
import { _Button, _Date, _Input, _Number, _Select, _Text } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'
import TempInputPenerimaanBarang from './TempInputPenerimaanBarang'

function InputBarangMasuk(pr) {

    const [callback, setCallback] = useState([])
    const [form] = Form.useForm()

    const onFinish = (val) => {
        var obj = {
            ...val,
            nopenerimaan: "",
            norec_pb: "",
            suplier: "-",
            detail:
                callback


        }
        _Api.post("penerimaanbarang/save-penerimaan-barang", obj).then(res => {
            _Toastr.success(res.data.message)
            form.resetFields()
        })

    }

    const resetFormDetail = (f) => {
        f.submit()
    }

    const onFormFinish = () => {

    }


    return (
        // <Form layout="vertical" >
        <Form.Provider onFormFinish={onFormFinish}>
            <Card title=" * Input Barang Masuk" size="small">
                <Form onFinish={onFinish}
                    form={form}
                    name="formsuplier"
                // initialValues={{
                //     nopenerimaan: "",
                //     norec_pb: "",
                //     suplier: "-",
                // }}
                >
                    <_Row>
                        <Col sm={{ span: 6, offset: 1 }} >
                            <_Row>
                                {/* <_Text  align="right" sm={4} >  </_Text>  */}
                                <_Text align="right" sm={4}> Nama Suplier  :</_Text>
                                <_Select sm={8} name="idsuplier" option={pr.Combo.suplier}
                                    val="id" caption="suplier" />


                                <_Text align="right" sm={4}> Sumber Dana &nbsp; :</_Text>
                                <_Select sm={8} name="idsumberdana" option={pr.Combo.sumberdana}
                                    val="id" caption="sumberdana" />

                                <_Text align="right" sm={4}> Tahun Anggaran &nbsp; :</_Text>

                                <_Number addonAfter={<CalendarOutlined />} sm={3} name="tahunanggaran" mb="0px" />
                                <_Text align="right" sm={5}>  &nbsp; </_Text>
                                <_Text align="right" sm={4}> Ruangan &nbsp; :</_Text>
                                <_Select sm={8} name="idruangan" option={pr.Combo.ruangan}
                                    val="id" caption="ruangan" />

                                <_Text align="right" sm={4}> Penanggung Jawab &nbsp; :</_Text>
                                <_Select sm={8} name="idpenenggungjawab" option={pr.Combo.pegawai}
                                    val="id" caption="namalengkap" />
                                <_Text align="right" sm={4}> Keterangan &nbsp; :</_Text>
                                <_Input multiline sm={8} name="keterangan" />
                                {/* <_Input name="nopenerimaan" hidden />
                                <_Input name="norec_pb" hidden />
                                <_Input name="suplier" hidden /> */}

                            </_Row>
                        </Col>

                    </_Row>
                </Form>
                <Col sm={12} >
                    <TempInputPenerimaanBarang form={form} resetFormDetail={resetFormDetail} setCallback={setCallback} />
                </Col>

                {/* <_Button className="blink" label="Simpan Ke database" btnSave onClick={submitForm} /> */}
                <br />
                <br />

                {/* <_Row>


                <_Text align="right" sm={4}> Hasil IMT  &nbsp; :</_Text>
                <_Input name={['pemeriksaanfisik', 'hasilimt']} disabled sm={8} />


            </_Row> */}




            </Card>
        </Form.Provider>


    )
}

export default withRouter(InputBarangMasuk)

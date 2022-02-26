import { Button, Form, Modal } from 'antd'
import React, { useState } from 'react'
import _Api from '../../../Services/Api/_Api'
import { _Button, _Input, _Number, _Select } from '../../../Services/Forms/Forms'
import { _Row } from '../../../Services/Forms/LayoutBootstrap'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'

function TarifBaru(pr) {
    const [loading, setLoading] = useState(true)
    const [formProduk] = Form.useForm()


    const simpanTarif = (val) => {
        setLoading(true)
        var obj = {
            ...val,
            "idharganetto": "",
            "idproduk": pr.data.idproduk,
        }
        // console.log(`obj`, obj)
        _Api.post("produk/save-tarif-layanan", obj).then(res => {
            _Toastr.success(res.data.message)
            formProduk.resetFields()
            pr.close()
        })
    }


    return (
        <div>
            <Modal title="Tarif Baru" visible={pr.show} onCancel={pr.close}
                footer={false}
            >
                {/* <p> {JSON.stringify(pr.data)} </p> */}
                <Form layout={"vertical"} onFinish={simpanTarif} form={formProduk} >
                    <_Row >
                        <_Input required value={pr.data.produk} label="Produk" />
                        <_Number format required name="hargasatuan" label="Harga Satuan" />
                        <_Select required name="idjenispelayanan" option={pr.combo.jenispelayanan} label="Kategori" val="id" caption="jenispelayanan" />

                        <_Row>
                            <_Button sm={6} block primary submit title="Simpan" />
                            <_Button sm={6} block primary onClick={() => pr.close()} danger title="Batal" />
                        </_Row>
                    </_Row>
                </Form>
            </Modal>
        </div>
    )
}

export default TarifBaru

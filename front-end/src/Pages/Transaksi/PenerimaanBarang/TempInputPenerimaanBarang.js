import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ubahText } from '../../../Services/Crypto'
import { DivCol, _Button, _Date, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../../Layout/LayoutAnt'
import DetailPasien from '../../Pasien/DetailPasien'

import { Input, Button, Space, Badge, Descriptions, Collapse, Card, Table, Form } from 'antd';
import { CloseCircleOutlined, EnterOutlined, MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-bootstrap'
import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import _Api from '../../../Services/Api/_Api'
import moment from 'moment'

function TempInputPenerimaanBarang(pr) {
    const kanan = { marginRight: "-15px" }
    const [detailProduk, setdetailProduk] = useState({})
    const [produk, setproduk] = useState([])
    const [Loading, setLoading] = useState(false)
    const [arrTindakan, setarrTindakan] = useState([])
    const [tempBarang, settempBarang] = useState({})
    const [form] = Form.useForm()


    const batalInput = (i) => {
        var arr = [...arrTindakan]
        delete arr[i]
        setarrTindakan([])
        setarrTindakan(arr);
        pr.setCallback(arr)

        // form.resetFields();

    }

    // const batalInput = (key) => {
    //     const dataSource = [...arrTindakan];
    //     setarrTindakan(dataSource.filter((item) => item.key !== key))
    // };


    const columns = [
        {
            title: 'No',
            width: 50,
            dataIndex: 'no',
            sorter: (a, b) => a.no - b.no,
        },
        {
            title: 'Nama Barang',
            // width: 250,
            dataIndex: 'namaproduk',
            sorter: (a, b) => a.namaproduk.length - b.namaproduk.length,
        },
        {
            title: 'Jumlah',
            width: 100,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah.length - b.jumlah.length,
        },
        {
            title: 'Harga Beli',
            width: 200,
            dataIndex: 'hargabeli',
            sorter: (a, b) => a.hargabeli.length - b.hargabeli.length,
        },
        {
            title: 'Satuan',
            width: 100,
            dataIndex: 'satuan',
            sorter: (a, b) => a.satuan.length - b.satuan.length,
        },
        {
            title: 'Harga Jual',
            width: 200,
            dataIndex: 'hargajual',
            sorter: (a, b) => a.hargajual - b.hargajual,
        },
        {
            title: 'Tanggal Kedaluarsa',
            width: 200,
            dataIndex: 'tglkadaluarsa',
            sorter: (a, b) => a.tglkadaluarsa.length - b.tglkadaluarsa.length,
        },
        {
            title: 'Total Harga',
            width: 200,
            dataIndex: 'hargatotal',
            sorter: (a, b) => a.totalharga.length - b.totalharga.length,
        },
        {
            title: 'Batal',
            width: 100,
            render: (text, row, index) => {
                return (
                    <div> <_Button label="Batal" onClick={() => batalInput(index)} btnCancel color="orange" mb="0px" /> </div>
                )
            },
        },
    ];


    const pushBarang = (val) => {
        // console.log(val)
        // console.log(detailProduk)
        const obj = {
            ...val,
            namaproduk: detailProduk.produk,
            tglkadaluarsa: moment(val.tglkadaluarsa).format('YYYY-MM-DD')
        }
        setarrTindakan([...arrTindakan && arrTindakan, obj]);
        pr.setCallback([...arrTindakan && arrTindakan, obj])
        form.resetFields();
    }

    const submitForm = () => {
        pr.form.submit()
        setarrTindakan([])

    }


    useEffect(() => {
        _Api.get("penerimaanbarang/get-produk-penerimaan-barang").then(res => {
            setproduk(res.data)
            setLoading(false)
        })
    }, [])

    const hitungTotal = () => {
        // alert(e)
        var hargabeli = form.getFieldValue("hargabeli")
        var jumlah = form.getFieldValue("jumlah")
        form.setFieldsValue({
            hargatotal: hargabeli * jumlah,

        });
    }

    return (
        <Card title=" * List Barang Masuk" size="small">

            <Col sm={12}>
                <Form
                    form={form}
                    onFinish={pushBarang}
                    name="formtemp"
                    initialValues={{ norec_pbd: "" }}
                    layout="vertical"
                // initialValues={{ nama: "Siapa Nama" }}
                // onFieldsChange={(_, allFields) => {
                //     console.log(allFields)
                // }}
                // onFormChange={(e, f) => console.log(e)}
                // onFinish={ (values)=> {values.preventDefault(); console.log('Finish:', values)}}

                >
                    <_Number name="norec_pbd" hidden />
                    <_Row>
                        <_Autocomplete required sm={4}
                            // onChange={handleChange("produkfk", "produk")}
                            name="idproduk"
                            callback={setdetailProduk}
                            onChange={e=>console.log(e)}
                            // onSelect={(e,f)=>console.log(f)}
                            route="penerimaanbarang/get-produk-penerimaan-barang"
                            label="Nama Barang"
                            field="nama"
                            search="produk"
                        // onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                        />

                        <_Number name="hargabeli" onChange={hitungTotal} label="Harga Beli" format sm={1} required />
                        <_Number name="jumlah" onChange={hitungTotal} label="Jumlah" sm={1} required />
                        <_Number name="hargajual" label="Harga Jual" format sm={1} required />
                        <_Date required name="tglkadaluarsa" format='DD-MM-YYYY' sm={2} label="Tanggal Kedaluarsa" />
                        <_Number name="hargatotal" disabled label="Total Harga" format sm={2} required />
                        <hr />
                        {/* <Col sm={12} style={{textAlign:"right"}}> */}
                        <_Button sm={1} style={{ marginTop: "23px" }} color="orange" submit label="Tambah" type="primary" icon={<EnterOutlined />} />
                        <br />
                        <br />
                    </_Row>
                </Form>
            </Col>


            <Table
                rowKey="nocmfk"
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
                pagination={{ pageSize: 100 }}
                columns={columns}
                // loading={loading}
                scroll={{ x: 800, y: 270 }}
                dataSource={arrTindakan}
            />
            <br />
            <_Button className="blink" label="Simpan Ke database" btnSave
                onClick={submitForm}
            />

        </Card>

    )
}

export default TempInputPenerimaanBarang

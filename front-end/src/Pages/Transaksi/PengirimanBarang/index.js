import { Card, Form, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api'
import { DivCol, _Button, _Input, _Select, _Number, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../../Layout/LayoutAnt'
import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import { EnterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'

function PengirimanBarang() {

    const [form] = Form.useForm()
    const [formIsi] = Form.useForm()

    const [detailProduk, setdetailProduk] = useState({})
    const [ruanganAsal, setruanganAsal] = useState()

    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])
    const LoadCombo = () => {
        setLoading(true)
        _Api.get("kirimbarang/get-combo-kirim-barang").then(res => {
            setCombo(res.data)
            setLoading(false)
        })
    }

    const [tempBarang, settempBarang] = useState([])

    const batalInput = (i) => {
        var arr = [tempBarang]
        delete arr[i]
        settempBarang(arr);
    }


    const pushBarang = (val) => {
        // console.log(val)
        // console.log(detailProduk)
        const obj = {
            ...val,
            namaproduk: detailProduk.produk,
        }
          settempBarang([...tempBarang, obj]);
        form.resetFields();

    }

    const cekRuanganAsal = (e) => {
        setruanganAsal(e)
        settempBarang([])
    }
    const onFormFinish = (name, info) => {



        if (name === 'data') {
            if (tempBarang.length == 0) {
                _Toastr.error("Silahkan lengkapi list barang yg akan di kirim ...")
                return
            }
            setLoading(true)
            // console.log(info.values)

            var data = { ...info.values, detail: tempBarang }
            // console.log(obj)

            _Api.post("kirimbarang/save-kirim-barang", data).then(res => {
                // setCombo(res.data)
                setLoading(false)
                _Toastr.success(res.data.messages)
                formIsi.resetFields();
                settempBarang([])
                setruanganAsal(null)

            }).catch(err => {
                _Toastr.error(err.response.data.error)

            })

        }

    }


    const columns = [
        {
            title: 'No',
            width: 50,
            render: (text, row, index) => {
                return (
                    <div> {index + 1} </div>
                )
            },
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
            title: 'Batal',
            width: 100,
            render: (text, row, index) => {
                return (
                    <div> <_Button label="Batal"
                        onClick={() => batalInput(index)}
                        btnCancel color="orange" mb="0px" /> </div>
                )
            },
        },
    ];



    useEffect(() => {
        LoadCombo()
    }, [])

    return (
        <LayoutAnt>
            <Form.Provider onFormFinish={onFormFinish}>
                <_TitleBar title="Pengiriman Barang" align="Center" />
                <DivCol style={{ marginTop: "-25px" }}>
                    <_Row>
                        <_Col sm={4} >
                            <Form layout="vertical" autoComplete="off" form={formIsi} name="data">
                                <_Input name="nokirim" label="No. Kirim" />
                                <_Select name="idkeperluankirim" label="Keperluan" option={Combo.keperluan} val="id" caption="keperluankirim" required />
                                <_Select name="idpegawai" label="Nama Pegawai" option={Combo.pegawai} val="id" caption="namalengkap" required />
                                <_Input name="norec_kb" hidden />
                                <_Input name="ruanganasal" hidden />
                                <_Input name="ruangantujuan" hidden />
                                <_Input name="keterangan" multiline label="Keterangan" />
                                <_Select name="idruanganasal" required label="Ruangan Asal" option={Combo.ruanganasal} onChange={(e) => cekRuanganAsal(e)} val="id" caption="ruangan" />
                                <_Select name="idruangantujuan" required label="Ruangan Tujuan" option={Combo.ruangantujuan} val="id" caption="ruangan" />
                                <hr />
                                <_Button title="Simpan" submit btnSave />

                            </Form>
                        </_Col>
                        <_Col sm={8} style={{ paddingTop: "25px" }} >
                            <Form form={form} layout="vertical" name="detail" onFinish={pushBarang}>
                                <Card title=" * List Barang" headStyle={{ background: "#71bdfbd9" }} size="small">
                                    <_Row>
                                        <_Autocomplete required sm={6}
                                            name="idproduk"
                                            callback={setdetailProduk}
                                            // onSelect={(e,f)=>console.log(f)}
                                            route="kirimbarang/get-produk-kirim-barang"
                                            label="Nama Barang"
                                            param={`idruanganasal=${ruanganAsal}`}
                                            field="nama"
                                            search="produk"
                                        />

                                        <_Number name="jumlah" label="Jumlah" sm={1} required />
                                        <_Button sm={1} style={{ marginTop: "23px" }} color="orange" submit label="Tambah" type="primary" icon={<VerticalAlignBottomOutlined />} />

                                        <Table
                                            rowKey="idproduk"
                                            pagination={{ pageSize: 100 }}
                                            columns={columns}
                                            // loading={loading}
                                            scroll={{ x: 800, y: 270 }}
                                            dataSource={tempBarang}
                                        />
                                    </_Row>
                                </Card>
                            </Form>
                        </_Col>
                    </_Row>

                </DivCol>
            </Form.Provider>
        </LayoutAnt>
    )
}

export default PengirimanBarang

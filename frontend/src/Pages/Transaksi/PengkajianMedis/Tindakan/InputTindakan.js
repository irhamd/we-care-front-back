import { EnterOutlined, CloudUploadOutlined, ApiOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import Form, { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import _Api from '../../../../Services/Api/_Api'
import { acakText } from '../../../../Services/Crypto'
import { DivCol, _Date, _Input, _Number, _Switch } from '../../../../Services/Forms/Forms'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete'
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr'
import DataTIndakan from './DataTindakan'


function InputTindakan(pr) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    // const [detailpasien, setdetailpasien] = useState("")
    const [tempTindakan, settempTindakan] = useState({})
    const [arrTindakan, setarrTindakan] = useState([])
    const histori = useHistory()
    const [state, setState] = useState({})
    const [detailTindakan, setdetailTindakan] = useState([])
    const [formInputTindakan] = useForm();

    const handleChange = (field, row) => (e, f) => {
        let isMoment = e && e._isAMomentObject
        settempTindakan({
            ...tempTindakan,
            norec_apd: pr.row.norec_apd,
            hargasatuan: detailTindakan && detailTindakan.hargasatuan,
            // hargatotal:  detailTindakan.hargasatuan * [field] ,
            idparamedis: null,
            [row]: f && f.children,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss')
                : e && e.target ? e.target.value : e
        });
    };



    const columns = [
        {
            title: 'Tanggal Pelayanan',
            width: 150,
            dataIndex: 'tglpelayanan',
            sorter: (a, b) => a.tglpelayanan.length - b.tglpelayanan.length,
        },
        {
            title: 'Nama Tindakan',
            width: 300,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Jumlah',
            width: 70,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah.length - b.jumlah.length,
        },

        // {
        //     title: 'Harga Satuan',
        //     width: 200,
        //     dataIndex: 'hargasatuan',
        //     sorter: (a, b) => a.hargasatuan.length - b.hargasatuan.length,
        // },
        {
            title: 'Nama Dokter',
            width: 200,
            dataIndex: 'namadokter',
            sorter: (a, b) => a.hargasatuan.length - b.hargasatuan.length,
        },
        // {
        //     title: 'Total Harga',
        //     width: 200,
        //     dataIndex: 'hargatotaljasa',
        //     sorter: (a, b) => a.hargatotaljasa - b.hargatotaljasa,
        // },

    ];

    const rowSelection = {
        // onChange: (selectedRowKeys, selectedRows) => {
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
        // },
        // getCheckboxProps: (record) => (
        //     console.log(record)
        // )
    };

    const LoadData = () => {
        setLoading(true)
        setState({})

        _Api.get("tindakan/get-tindakan-pasien?noregistrasi=" + pr.row.noregistrasi).then(res => {
            setData(res.data.daftar)
            setLoading(false)
        })
    }

    const pushTindakan = () => {
        console.log(detailTindakan)
        setarrTindakan([...arrTindakan && arrTindakan, tempTindakan]);
        formInputTindakan.resetFields();

    }

    const handleTotal = (jumlah) => (e, f) => {
        var total = parseInt(e) * parseInt(detailTindakan && detailTindakan.hargasatuan)

        settempTindakan({
            ...tempTindakan,
            "jumlah": e,
            hargatotal: total
        });
    };

    const simpanData = () => {
        let obj = {
            pelayananpasien: arrTindakan
        }
        setState({ loadingSave: true })
        _Api.post("tindakan/save-tindakan", obj).then(res => {
            // console.log(res.data)
            _Toastr.success(res.data.message)
            setarrTindakan([])
            LoadData();
        })

    }

    useEffect(() => {
        LoadData();
    }, [])

    return (
        <DivCol>
            <Row>
                <Col sm={4} style={{ paddingLeft: " 10px" }}>
                    <Form
                        form={formInputTindakan}
                        onFinish={pushTindakan}
                        layout="vertical"
                    // initialValues={{ nama: "Siapa Nama" }}
                    // onFieldsChange={(_, allFields) => {
                    //     console.log(allFields)
                    // }}
                    // onFormChange={(e, f) => console.log(e)}
                    // onFinish={ (values)=> {values.preventDefault(); console.log('Finish:', values)}}

                    >
                        <_Date required name="tgl" showTime label="Tanggal Pelayanan" onChange={handleChange("tglpelayanan")} />
                        <_Autocomplete required
                            onChange={handleChange("produkfk", "produk")}
                            name="tindakan"
                            callback={setdetailTindakan}
                            value={tempTindakan.produkfk}
                            // onSelect={(e,f)=>console.log(f)}
                            route="tindakan/get-produk"
                            label="Nama Tindakan"
                            field="nama"
                            search="produk"
                        // onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                        />
                        <_Autocomplete
                            name="namadokter"
                            required
                            onChange={handleChange("idpelaksana", "namadokter")}
                            route="tindakan/get-pegawai"
                            label="Nama Dokter"
                            value={tempTindakan.idpelaksana}
                            field="nama"
                            search="namalengkap"
                        // onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                        />

                        <_Number name="jumlah" label="Jumlah" format sm={4} onChange={handleTotal("jumlah")} required
                        />
                        <_Switch name="isparamedis" label="Dilakukan Oleh Perawat" onChange={handleChange("isparamedis")} />
                        <hr />
                        <Button style={{ background: "orange", borderColor: "orange" }} htmlType="submit"
                            type="primary" icon={<EnterOutlined />}>
                            Tambah </Button>
                        <br />
                        <br />
                    </Form>
                </Col>

                <Col sm={7} style={{ paddingTop: "24px" }}>
                    <Table
                        rowKey="nocmfk"
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        pagination={{ position: ["none", "none"], pageSize: 100 }}
                        columns={columns}
                        loading={loading}
                        scroll={{ x: 800, y: 270 }}
                        dataSource={arrTindakan}
                    />
                    <br />
                    <Col sm={{ span: 4 }}>
                        <Button block loading={state.loadingSave} disabled={!arrTindakan.length > 0 ? true : false}
                            type="primary" icon={<CloudUploadOutlined />} onClick={simpanData}> Simpan Ke Database
                        </Button>
                    </Col>

                    <br />
                    <br />
                    <br />

                </Col>

            </Row>
            <br />
            <Row>
                <Col>
                    <DataTIndakan LoadData={LoadData} dataSource={data} />
                </Col>
            </Row>
        </DivCol>

    )
}

export default InputTindakan

import { EnterOutlined, CloudFormOutlined, FormOutlined, StopOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, Tooltip } from 'antd'
import Form, { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import _Api from '../../../../Services/Api/_Api'
import { acakText } from '../../../../Services/Crypto'
import { DivCol, _Button, _Date, _Input, _Number, _Select, _Switch } from '../../../../Services/Forms/Forms'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete'
import _AutocompleteRev from '../../../../Services/Forms/_AutocompleteRev'
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr'

function InputDiagnosa(pr) {

    const [svdiagnosa, setSvdiagnosa] = useState([])
    const [dataDiagnosa, setdataDiagnosa] = useState([])
    const [loading, setLoading] = useState(false)
    const [formInputTindakan] = useForm();

    const handleChange = (field, row) => (e, f) => {
        let isMoment = e && e._isAMomentObject
        setSvdiagnosa({
            ...svdiagnosa,
            idparamedis: null,
            norec_apd: pr.row.norec_apd,
            statuskasuspenyakit: "Lama",
            [row]: f && f.children,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss')
                : e && e.target ? e.target.value : e
        });
    };

    const changeSwitch = (field, values) => (e) => {
        let val = !e ? values[0] : values[1]
        // console.log(val)
        setSvdiagnosa({
            ...svdiagnosa,
            [field]: val
        });
    }


    var jenisDiagnosa = [
        {
            "id": 1,
            "jenisdiagnosa": "PRIMER"
        },
        {
            "id": 2,
            "jenisdiagnosa": "SEKUNDER"
        },
        {
            "id": 3,
            "jenisdiagnosa": "KOMPLIKASI"
        }]

    const columns = [
        {
            title: 'Action',
            width: 100,
            fixed: 'left',
            render: (_, record) =>
                <div>
                    <Popconfirm title={`Hapus Diagnosa "${record.diagnosa && record.diagnosa.toUpperCase()}" ?`} okText="Hapus" cancelText="Batal"
                        onConfirm={() => hapusDiagnosa(record.dorec_diag)}
                    >
                        <Tooltip placement="bottom" title={"Hapus"}>
                            <Button type="primary" shape="round" danger size="small" icon={<StopOutlined />} > Hapus </Button>
                        </Tooltip>
                    </Popconfirm>

                </div>
        },

        {
            title: 'Tanggal',
            width: 100,
            dataIndex: 'tgldiagnosa',
            sorter: (a, b) => a.tgldiagnosa.length - b.tgldiagnosa.length,
        },
        {
            title: 'Pelaksana',
            width: 200,
            dataIndex: 'pegawaidiagnosa',
            sorter: (a, b) => a.pegawaidiagnosa.length - b.pegawaidiagnosa.length,
        },
        {
            title: 'Kode Diagnosa',
            width: 70,
            dataIndex: 'kodediagnosa',
            sorter: (a, b) => a.kodediagnosa.length - b.kodediagnosa.length,
        },
        {
            title: 'Nama Diagnosa',
            width: 300,
            dataIndex: 'diagnosa',
            sorter: (a, b) => a.diagnosa.length - b.diagnosa.length,
        },
        {
            title: 'Ruangan',
            width: 150,
            dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
        },
        {
            title: 'Jenis Diagnosa',
            width: 100,
            dataIndex: 'jenisdiagnosa',
            sorter: (a, b) => a.jenisdiagnosa.length - b.jenisdiagnosa.length,
        },
        {
            title: 'Keterangan',
            width: 100,
            dataIndex: 'keterangan',
            sorter: (a, b) => a.keterangan.length - b.keterangan.length,
        },
        // {
        //     title: 'Total Harga',
        //     width: 100,
        //     dataIndex: 'hargatotaljasa',
        //     sorter: (a, b) => a.hargatotaljasa - b.hargatotaljasa,
        // },

    ];



    const LoadData = () => {
        setLoading(true)
        _Api.get("diagnosa/get-daftar-diagnosa?noregistrasi=" + pr.row.noregistrasi).then(res => {
            setdataDiagnosa(res.data.daftar)
            setLoading(false)
        })
    }
    const simpanDiagnosa = () => {
        setLoading(true)
        let obj = {
            diagnosapasien: [svdiagnosa]
        }
        _Api.post("diagnosa/save-diagnosa", obj).then(res => {
            LoadData()
            formInputTindakan.resetFields();

            setLoading(false)
        })
    }
    const hapusDiagnosa = (norec) => {
        setLoading(true)
        let obj = {
            diagnosapasien: [norec]
        }
        _Api.post("diagnosa/delete-diagnosa", obj).then(res => {
            LoadData()
            setLoading(false)
        })
    }

    useEffect(() => {
        LoadData()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            // onSelectChange({ ...setselectTindakan, selectedRowKeys })
        }
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
        // },
    };
    return (
        <DivCol>
            <Form layout="vertical" onFinish={simpanDiagnosa} form={formInputTindakan} >
                <Row>
                    <_Select option={jenisDiagnosa} onChange={handleChange("idjenisdiagnosa")} sm={7}
                        required
                        name="idjenisdiagnosa"
                        label="Jenis Diagnosa" val="id" caption="jenisdiagnosa"
                    />
                   

                    <_AutocompleteRev
                        name="diagnosa"
                        required
                        sm={7}
                        onChange={handleChange("kodediagnosa", "diagnosa")}
                        route="diagnosa/getMasterDiagnosa"
                        label="Nama / Kode Diagnosa"
                        field="diagnosa"
                        val="kode"
                        search="diagnosa"
                    />
                    <_Autocomplete required
                        name="namadokter"
                        sm={7}
                        onChange={handleChange("idpegawaidiagnosa")}
                        route="tindakan/get-pegawai"
                        label="Nama Dokter"
                        field="kode"
                        required
                        search="namalengkap"
                    />

                    <_Switch label="Status Penyakit" sm={{ span: 5 }}
                        onChange={changeSwitch("statuskasuspenyakit", ["Lama", "Baru"])}
                        titleCheck="Baru" titleUnCheck="Lama"
                    />

                    <_Input
                        sm={{ span: 7 }}
                        name="ket"
                        onChange={handleChange("keterangan")}
                        label="Keterangan"
                    />
                    {/* <Button style={{ background: "orange", borderColor: "orange", top: "23px" }}
                        type="primary" icon={<FormOutlined />} htmlType="submit"
                    > Save </Button> */}

                    <_Button label="Simpan" icon={<FormOutlined />} submit sm={12} />

                    <br />
                    <br />
                </Row>
            </Form>
            <br /> <br />
            <Row>
                <Col>
                    <Table
                        rowKey="norec_pp"
                        rowSelection={rowSelection}
                        pagination={{ position: ['bottomCenter'], pageSize: "5" }}
                        columns={columns}
                        loading={pr.loading || loading}
                        scroll={{ x: 800, y: 800 }}
                        dataSource={dataDiagnosa}
                    />
                </Col>
            </Row>
        </DivCol>
    )
}

export default InputDiagnosa

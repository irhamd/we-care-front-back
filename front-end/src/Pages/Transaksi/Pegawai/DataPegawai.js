import { ScheduleFilled, SisternodeOutlined, SubnodeOutlined, SyncOutlined, UserAddOutlined } from '@ant-design/icons'
import { Drawer, Table, Tag, Form } from 'antd'
// import Form from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import _Api from '../../../Services/Api/_Api'
import { DivCol, _Button, _Date, _Input, _Select, _Space, _TitleBar } from '../../../Services/Forms/Forms'
import { _Row } from '../../../Services/Forms/LayoutBootstrap'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'
import LayoutAnt from '../../Layout/LayoutAnt'

function DataPegawai() {

    const [datapegawai, datasetpegawai] = useState([])
    const [selected, setselected] = useState([])
    const [Loading, setLoading] = useState(true)
    const [showUser, setshowUser] = useState(false)
    const [combo, setcombo] = useState([])
    const histori = useHistory()
    const [formUser] = Form.useForm()


    const getDataPegawai = (val) => {
        _Api.get(`pegawai/get-daftar-pegawai?namapegawai=${val && val.nama}`).then(res => {
            datasetpegawai(res.data)
            setLoading(false)
        })
    }

    const addUser = () => {
        // console.log(`selected`, selected)
        if(selected.length == 0){
            _Toastr.error("Pilih pasien ...!")
            return
        }
        formUser.resetFields()
        setshowUser(true)
    }

    const saveUser = (val) => {

        var obj = { ...val, idpegawai: selected && selected.idpegawai }

        if (obj.katasandi != obj.katasandilagi) {
            _Toastr.error("Password tidak cocok ...!")
            return
        }

        _Api.post(`pegawai/save-user`, obj).then(res => {
            _Toastr.success(res.data.messages)
            formUser.resetFields()
            setshowUser(false)
        }).catch(rr => {
            _Toastr.error(rr.response.data.messages)
        })
    }

    const loadCombo = (val) => {
        _Api.get(`pegawai/get-combo-user`).then(res => {
            setcombo(res.data)
        })
    }

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },

        {
            title: 'NIP', width: 200,
            dataIndex: 'nip'
        },
        {
            title: 'Nama Pegawai',
            dataIndex: 'namapegawai'
        },


        {
            title: 'Jabatan', width: 150,
            render: (text, row, index) => (
                <Tag color="red" style={{ textAlign: "center" }}> {row.jabatan} </Tag>
            ),
        },

        {
            title: 'Kelompok', width: 200,
            dataIndex: 'kelompokpegawai'
        },
        {
            title: 'User Login', width: 200,
            render: (text, row, index) => (
                <Tag color="blue" style={{ textAlign: "center" }}> {row.namauser} </Tag>
            ),
        },

    ];

    const tambahPegawai = () => {
        histori.push("DataPegawai/InputPegawai")
    }



    useEffect(() => {
        getDataPegawai()
        loadCombo()
        formUser.resetFields()
    }, [])

    return (
        <LayoutAnt>
            <_TitleBar title="DATA PEGAWAI" align="Center" />
            <DivCol style={{ marginTop: "-25px" }}>
                <Form layout={"vertical"} onFinish={getDataPegawai}
                // initialValues={{ tglAwal: moment(tglAwal), tglAkhir: moment(tglAkhir) }}
                >
                    <_Row >

                        <_Button icon={<UserAddOutlined />} style={{ marginTop: "23px" }} block sm={2} onClick={tambahPegawai} label="Tambah Pegawai" />
                        <_Button icon={<SubnodeOutlined />} style={{ marginTop: "23px" }} color="orange" block sm={2} onClick={addUser} label="Atur User Login" />
                        <_Input sm={{ offset: 4, span: 3 }} name="nama" label="Nama" />
                        <_Button icon={<SyncOutlined />} style={{ marginTop: "23px" }} submit block sm={1} label="Refresh" />

                    </_Row>
                </Form>
                <div className="site-drawer-render-in-current-wrapper">
                    <Drawer
                        title={" * Update User [ " + selected.lenght && selected.namapegawai  + " ]" }
                        placement="top"
                        // headerStyle={{ , height: "30px", padding: "5px 0 0 20px" }}
                        bodyStyle={{ background: "rgba(102, 198, 236, 0.18)" }}
                        closable={false}
                        height="150"
                        onClose={() => setshowUser(false)}
                        visible={showUser}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <Form autoComplete={"off"} form={formUser} layout="vertical" onFinish={saveUser} >
                            <_Row >
                                <_Input required sm={2} name="namauser" label="Username" />
                                <_Input required password sm={3} name="katasandi" label="Kata Sandi" />
                                <_Input required password sm={3} name="katasandilagi" label="Ulangi Kata Sandi" />
                                <_Select required sm={3} option={combo && combo.kelompukuser} label="Kelompok User"
                                    name="idkelompokuser" val="id" caption="kelompokuser" />
                                <_Button icon={<ScheduleFilled />} style={{ marginTop: "23px" }}
                                    submit block sm={1} label="Simpan" />

                            </_Row>
                        </Form>

                    </Drawer>
                    <_Space/>
                    <Table
                        loading={Loading}
                        headStyle={{ textAlign: "center" }}
                        rowClassName={(record, index) => record == selected && 'bg-orange'}
                        columns={columns}
                        rowKey="nip"
                        dataSource={datapegawai}
                        onRow={(rc, i) => {
                            return {
                                onClick: event => {
                                    setselected(rc)
                                },
                                // onDoubleClick: event => { prosesResep() }, // double click row
                            };
                        }}
                    />,
                </div>
            </DivCol>

        </LayoutAnt>
    )
}

export default DataPegawai

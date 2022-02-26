import React, { useEffect, useState } from 'react'
import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Row, Col, Space, DatePicker, Spin, Popconfirm, Tooltip } from 'antd';
import { DivCol, _ButtonFilter, _Date, _Input, _Number, _TitleBar } from '../../Services/Forms/Forms';
import { mainColor } from '../../Services/Color';
import { WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { _Message } from '../../Services/Toastr/Notify/NotifyToastr';
import _Api from '../../Services/Api/_Api';
import '../../_Assets/react-notifications-component.css'
import { Boot } from '../../Services/Forms/LayoutBootstrap';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import { ubahText } from '../../Services/Crypto';
// import 'react-notifications-component/dist/theme.css'



function Dashboard() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

 


    const columns = [
        {
            title: 'Action',
            width: "70px",
            fixed: 'left',
            render: (_, record) =>
                data.length >= 1 ? (
                    <div>
                        <Popconfirm title="Hapus Data ?" okText="Hapus" cancelText="Batal" onConfirm={() => deletePasien(record.id)}>
                            <Tooltip placement="bottom" title={"Hapus"}>
                                <Button type="primary" danger size="small" icon={<CloseCircleOutlined style={{ paddingTop: "-10px" }} />} />
                            </Tooltip>
                        </Popconfirm>

                        <Tooltip placement="bottom" title={"Update"}>
                            <Button type="primary" style={{ background: "orange", borderColor: "orange" }} warning size="small" icon={<WarningOutlined />} />
                        </Tooltip>

                    </div>
                ) : null,
        },
        {
            title: 'No',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien',
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien',
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'namapasien',
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jeniskelamin',
            sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,

        },

    ];


    const LoadData = () => {
        _Api.get("getDataPasien").then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    }

    const deletePasien = (id_pasien) => {
        setLoading(true)
        _Api.delete("deleDataPasien?id_pasien=" + id_pasien).then(res => {
            LoadData();
            _Toastr.success("Suksess ...")
        })
    }

    useEffect(() => {
        LoadData();
    }, [])

    const filter = () => {
        // store.addNotification({
        //     title: "Success!",
        //     message: "teodosii@react-notifications-component",
        //     type: "warning",
        //     insert: "top",
        //     container: "top-right",
        //     animationIn: ["animate__animated", "animate__fadeIn"],
        //     animationOut: ["animate__animated", "animate__fadeOut"],
        //     pauseOnHover: true,
        //     dismiss: {
        //         duration: 5000,
        //         onScreen: false,
        //         //   showIcon :true
        //     }
        // });
        _Toastr.success('Berhasil simpan data ...!')

        // _Message.success(" ✋ ddd")
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0].id);
            // deletePasien(selectedRows[0].id);
        },
        getCheckboxProps: (record) => ({
            name: record.row,
        }),
    };


    return (
        <div>
            <LayoutAnt  >
                <_TitleBar title="DATA PASIEN" align="center" />
                <br />
                <Form layout={"vertical"} >
                    <DivCol>
                        <Boot.Row>
                            <Boot.Col sm={2}>
                                <_Number min="1" label="No. RM" />
                            </Boot.Col>
                            <Boot.Col sm={2}>
                                <_Date label="Tanggal" />

                            </Boot.Col>
                            <Boot.Col sm={3}>
                                <_Input label="Nama Pasien" onChange={(e) => alert(e.target.value)} />
                            </Boot.Col>
                            <Boot.Col sm={3}>
                                <_Input label="Alamat" onChange={(e) => alert(e.target.value)} />
                            </Boot.Col>
                            <Boot.Col sm={4}>
                                <_Input label="Alamat" onChange={(e) => alert(e.target.value)} />
                            </Boot.Col>
                            <Boot.Col sm={1}>
                                <_ButtonFilter onClick={() => filter()} />
                            </Boot.Col>
                            <Boot.Col sm={1}>
                                <_ButtonFilter onClick={() => filter()} />
                            </Boot.Col>
                        </Boot.Row>
                        {/* <Row>
                            <_Input span={2} label="No. RM" onChange={(e) => alert(e.target.value)} />
                            <_Input span={6} label="Nama Pasien" onChange={(e) => alert(e.target.value)} />
                            <_Number span={4} label="Tanggal" />

                            <_ButtonFilter onClick={() => filter()} />
                            <_ButtonFilter onClick={() => filter()} />
                            <_ButtonFilter onClick={() => filter()} />


                            <ExportExcel column ={headColumn}  dataSet = {dataSet1}  style ={{ marginTop:"4px", marginRight:"5px" }}/>

                            <_Date span={4} label="Tanggal" />

                        </Row> */}
                    </DivCol>
                </Form>
                <div >
                    <Table
                        pagination={{ position: ['bottomCenter'] }}
                        columns={columns}
                        loading={loading}
                        scroll={{ x: 800, y: 800 }}
                        dataSource={data}
                    />
                </div>

            </LayoutAnt>
        </div>
    )
}

export default Dashboard

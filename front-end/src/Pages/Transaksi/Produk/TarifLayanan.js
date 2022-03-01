import React, { useEffect, useState } from 'react'
// import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate, Pagination, Card } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { DivCol, _Button, _Date, _Input, _Select, _Space, _Switch, _TitleBar } from '../../../Services/Forms/Forms';
// import { _grid, _row } from '../../Services/Forms/LayoutBootstrap'
// import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
// import _Api from '../../Services/Api/_Api';

import _Api from '../../../Services/Api/_Api';
import { acakText } from '../../../Services/Crypto';
import LayoutAnt from '../../Layout/LayoutAnt';
import { fitrah, formatNumber } from '../../../Services/Text/GlobalText';
import { Row } from 'react-bootstrap';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'


function TarifLayanan() {
    const [data, setData] = useState([])
    const [selected, setselected] = useState()
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    // const [selected, selected] = useState("")
    const [formProduk] = Form.useForm()
    const [combo, setcombo] = useState([])
    const histori = useHistory()

    const [filterData, setfilterData] = useState({
        "produk": "",
        "idproduk": "",
        "idjenisproduk": "",
        // "status": true,
        "jumlahpage": 10,
        "page": 1,
        "total": ""
    })

    const handeleFilter = (field) => (e) => {
        setfilterData({
            ...filterData,
            [field]: e.target.value
        });
    };

    const handeleFilterSelect = (field) => (e) => {
        setfilterData({
            ...filterData,
            [field]: e
        });
    };

    const changePaginate = async (e, f) => {
        setLoading(true)
        var obj = {
            "produk": filterData.produk,
            "idproduk": filterData.idproduk,
            "idjenisproduk": filterData.idjenisproduk,
            // "status": true,
            "jumlahpage": f,
            "page": e,
            "total": filterData.totalpage,

        }
        _Api.get("produk/get-daftar-produk", {
            params: obj
        }).then(res => {
            setData(res.data.data)
            setLoading(false)
        })
    };

    const LoadData = () => {
        setLoading(true)
        _Api.get("produk/get-daftar-tarif-layanan", {
            params: filterData
        }).then(res => {
            setData(res.data.data)
            setLoading(false)
            setfilterData({ ...filterData, totalpage: res.data.total })
            resetForm()
        })
    }

    const isiCombobox = (id, e) => {
        _Api.get("produk/get-combo-produk").then(res => {
            setcombo(res.data)
        })
    }

    useEffect(() => {
        LoadData();
        isiCombobox();
    }, [])

    const resetForm = () => {
        formProduk.resetFields()
    }




    const verifikasiTindakan = () => {
        // histori.push("VerifikasiTindakan/" + selected.noregistrasi + "/" + selected.norec_pd + "/" + selected.idpenjamin)
    }
    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        // {
        //     title: 'ID',
        //     render: (_, rc) =>
        //         <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}
        //         </div>,
        //     // fixed: 'left',
        //     width: 150
        // },


        {
            title: 'ID',
            width: 100,
            dataIndex: 'idproduk',
            sorter: (a, b) => a.idproduk.length - b.idproduk.length,
        },

        {
            title: 'Produk',
            width: 350,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },


        {
            title: 'Harga Satuan',
            width: 130,
            render: (text, row, index) => (
                < div> Rp,  {row.hargasatuan ? formatNumber(row.hargasatuan) : "0"} </div>
            ),
        },

        {
            title: 'Jenis Pelayanan',
            dataIndex: 'jenispelayanan',
            width: 150,
            sorter: (a, b) => a.jenispelayanan - b.jenispelayanan,
        },

        {
            title: 'Jenis Produk',
            dataIndex: 'jenisproduk',
            width: 100,
            sorter: (a, b) => a.jenisproduk - b.jenisproduk,
        },

    ];

    return (
        <LayoutAnt pl="10px" >
            <_TitleBar label="* TARIF LAYANAN" />
            <DivCol pl="13px">
                <Form layout={"vertical"} onFinish={LoadData} >
                    <Row >
                        <_Input sm={2} label="Produk" onChange={handeleFilter('produk')} />
                        <_Input sm={2} label="ID Produk" onChange={handeleFilter('idproduk')} />
                        <_Select onChange={handeleFilterSelect('idjenisproduk')} sm={2} option={combo.jenisproduk} label="Jenis" val="id" caption="jenisproduk" />
                        <_Button sm={1} icon={<DownloadOutlined />} block primary submit style={{ marginTop: "23px" }} title="Refresh" />
                    </Row>
                </Form>
            </DivCol>
            <br />
            <DivCol >
                <Table
                    rowKey="noregistrasi"
                    // rowSelection={{
                    //     type: "radio",
                    //     ...rowSelection,
                    // }}
                    rowClassName={(record, index) => record == selected && 'bg-orange'}
                    pagination={false}
                    columns={columns}
                    loading={loading}
                    scroll={{ x: 800, y: 400 }}
                    dataSource={data}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setselected(record)

                            }, // click row
                            onDoubleClick: event => { formProduk.setFieldsValue(record) }, // double click row
                        };
                    }}
                />
                <_Space />
                <Pagination onChange={(e, f) => changePaginate(e, f)} total={filterData.totalpage} />
            </DivCol>


            <br />
            <br />
            <br />

        </LayoutAnt>
    )
}

export default TarifLayanan

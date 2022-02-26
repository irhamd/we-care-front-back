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
import { fitrah } from '../../../Services/Text/GlobalText';
import { Row } from 'react-bootstrap';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'
import TarifBaru from './TarifBaru';


function DataProduk() {
    const [data, setData] = useState([])
    const [selected, setselected] = useState([])
    const [loading, setLoading] = useState(true)
    // const [loading, setLoading] = useState(true)
    const [showTarifBaru, setshowTarifBaru] = useState(false)
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
        // let isMoment =   
        let isMoment = e ? e._isAMomentObject : false
        setfilterData({
            ...filterData,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD HH:mm:ss') : e && e.target.value
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

    const LoadData = (val) => {
        console.log(`val`, val)
        setLoading(true)
        _Api.get("produk/get-daftar-produk", {
            params: val
        }).then(res => {
            setData(res.data.data)
            setLoading(false)
            setfilterData({ ...val, totalpage: res.data.total })
            resetForm()
        })
    }

    const simpanProduk = (val) => {
        setLoading(true)
        var obj = {
            ...val,
            "idproduk": ""
        }
        _Api.post("produk/save-produk-baru", obj).then(res => {
            LoadData()
            _Toastr.success(res.data.message)

        })
    }


    const isiCombobox = (id, e) => {
        _Api.get("produk/get-combo-produk").then(res => {
            setcombo(res.data)
            console.log(`combo`, res.data)
        })
    }


    const setstatusProduk = async (id, e) => {
        // alert(e)
        await _Api.post("produk/enable-disable-produk", {
            "idproduk": id,
            "status": e
        })
        LoadData()
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

    const tarifBaru = () => {
        setshowTarifBaru(true)
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
            width: 150,
            dataIndex: 'idproduk',
            sorter: (a, b) => a.idproduk - b.idproduk,
        },

        {
            title: 'Produk',
            width: 350,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },


        {
            title: 'Satuan',
            width: 130,
            dataIndex: 'satuan',
            // sorter: (a, b) => a.satuan.length - b.satuan.length,
        },

        {
            title: 'Jenis Produk',
            dataIndex: 'jenisproduk',
            width: 150,
            // sorter: (a, b) => a.jenisproduk.length - b.jenisproduk.length,
        },
        {
            title: 'Jenis Produk Detail',
            dataIndex: 'jenisprodukdetail',
            width: 150,
            // sorter: (a, b) => a.jenisprodukdetail.length - b.jenisprodukdetail.length,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategoriproduk',
            width: 100,
            // sorter: (a, b) => a.kategoriproduk.length - b.kategoriproduk.length,
        },
        // {
        //     title: 'Status',
        //     width: 100,
        //     render: row => (
        //         <>
        //             <Tag  color={row.status=='AKTIF' ? 'green' : "error"} style={{ fontSize: "13px", paddingBottom: "3px", width: "100%", textAlign: "center" }}>
        //                 {row.status}
        //             </Tag>
        //         </>
        //     ),
        // },
        {
            title: 'Status',
            width: 100,
            render: row => (
                <_Switch titleCheck="*  Enabled " titleUnCheck="  Disabled * "
                    onChange={e => setstatusProduk(row.idproduk, e)}
                    defaultChecked={row.status == 'AKTIF' ? true : false} />
            ),
        },
    ];

    return (
        <LayoutAnt pl="10px" >
            <_TitleBar label="DATA PRODUK" />
            <DivCol pl="13px">
                <Form layout={"vertical"} onFinish={LoadData} >
                    <Row >
                        <_Input sm={2} label="Produk" name="produk" />
                        <_Input sm={2} label="ID Produk" name="idproduk" />
                        <_Select sm={2} option={combo.jenisproduk} name="idjenisproduk" label="Jenis" val="id" caption="jenisproduk" />
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
            <DivCol pl="10px">
                <Row>
                    {/* <_Button sm={2} icon={<AppstoreAddOutlined />} color="orange"
                        primary onClick={verifikasiTindakan} title="Produk Baru" block /> */}

                    <_Button sm={2} icon={<AppstoreAddOutlined />} disabled={selected.length == 0}
                        primary onClick={tarifBaru} title="Set Tarif" block />

                    <TarifBaru combo={combo} data={selected} show={showTarifBaru} close={() => setshowTarifBaru(false)} />

                </Row>
                <br />
                <br />
            </DivCol>
            <Card title="Produk Baru / Update Produk" size="small" style={{ marginLeft: "20px", marginRight: "10px" }}>
                <div style={{ paddingLeft: "20px" }}>
                    <Form layout={"vertical"} onFinish={simpanProduk} form={formProduk} >
                        <Row >
                            <_Input sm={3} required name="produk" label="Produk" />
                            {/* <_Input sm={2} label="ID Produk" /> */}
                            <_Select sm={2} required name="idkategoriproduk" option={combo.kategoriproduk} label="Kategori" val="id" caption="kategoriproduk" />
                            <_Select sm={2} required name="idjenisproduk" option={combo.jenisproduk} label="Jenis Produk" val="id" caption="jenisproduk" />
                            <_Select sm={2} required name="idjenisprodukdetail" option={combo.jenisprodukdetail} label="Detail Jenis Produk" val="id" caption="jenisprodukdetail" />
                            <_Select sm={3} required name="idsatuan" option={combo.satuan} label="Detail Jenis Produk" val="id" caption="satuan" />
                            <_Button sm={1} block primary submit style={{ marginTop: "23px" }} title="Simpan" />
                            <_Button sm={1} block primary danger style={{ marginTop: "23px" }} onClick={resetForm} title="Batal" />
                        </Row>
                    </Form>
                </div>
                <br />
                <br />

            </Card>
            <br />
            <br />
            <br />

        </LayoutAnt>
    )
}

export default DataProduk

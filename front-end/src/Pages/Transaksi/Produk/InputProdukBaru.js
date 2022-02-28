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


function InputProdukBaru() {
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

     
    
    const simpanProduk = (val) => {
        setLoading(true)
        var obj = {
            ...val,
            "idproduk": ""
        }
        _Api.post("produk/save-produk-baru", obj).then(res => {
            _Toastr.success(res.data.message)

        })
    }
 

    

    const resetForm = () => {
        formProduk.resetFields()
    }

    useEffect(() => {
        _Api.get("produk/get-combo-produk").then(res => {
            setcombo(res.data)
        })
    
    }, []);




   

    return (
        <div >
          
            <Card title="Produk Baru" size="small" style={{ marginLeft: "20px", marginRight: "10px" }}>
                <div style={{ paddingLeft: "20px" }}>
                    <Form layout={"vertical"} onFinish={simpanProduk} form={formProduk} >
                        <Row >
                            <_Input sm={3} required name="produk" label="Produk" />
                            {/* <_Input sm={2} label="ID Produk" /> */}
                            <_Select sm={2} required name="idkategoriproduk" option={combo.kategoriproduk} label="Kategori" val="id" caption="kategoriproduk" />
                            <_Select sm={2} required name="idjenisproduk" option={combo.jenisproduk} label="Jenis Produk" val="id" caption="jenisproduk" />
                            <_Select sm={2} required name="idjenisprodukdetail" option={combo.jenisprodukdetail} label="Detail Jenis Produk" val="id" caption="jenisprodukdetail" />
                            <_Select sm={3} required name="idsatuan" option={combo.satuan} label="Satuan" val="id" caption="satuan" />
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

        </div>
    )
}

export default InputProdukBaru

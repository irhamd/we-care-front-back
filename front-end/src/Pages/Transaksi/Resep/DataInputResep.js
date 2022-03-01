import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ubahText } from '../../../Services/Crypto'
import { DivCol, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../../Layout/LayoutAnt'
import DetailPasien from '../../Pasien/DetailPasien'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Popconfirm, Tooltip } from 'antd';
import { CloseCircleOutlined, MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import _Api from '../../../Services/Api/_Api'
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr'

function DataInputResep({ dataResep, LoadData }) {
    const kanan = { marginRight: "-15px", background: "#bdd6e8", fontWeight: "bold" }
    // const [dataResep, setdataResep] = useState({})
    // console.log(pr)

    // const LoadData = () => {
    //     _Api.get(`resep/get-resep-pasien?noregistrasi=${pr.data.noregistrasi}`).then(res => {
    //         setdataResep(res.data)
    //     })
    // }
    // const options =  r.defaultValue && !isubah  ? getDefaultValue : data.map(d => <Option key={d.value}>{d.text}</Option>);


    const hapusObatResep = (item) => {
        _Api.post("resep/delete-item-resep", { "nerec_items_rpd": [item.norec_rpd] }).then(res => {
            _Toastr.success(res.data.message)
            LoadData()


        })
    }

    useEffect(() => {
        // LoadData()
    }, [])


    const renderObat = dataResep.details && dataResep.details.map((item, i) => {
        return (
            <tr key={i}>
                <td width="10" style={{ paddingRight: "4px", textAlign : "center" }}>
                    {i + 1}
                </td>
                {/* <td width="170" style={{ paddingRight: "4px" }}>
                    <_Input mb="0px" style={kanan} value={item.jeniskemasan} />
                </td>
                <td width="100">
                    <_Input mb="0px" style={kanan} value={item.racikanke} />
                </td> */}
                {/* <td width="100" style={{ paddingRight: "4px" }}>
                    <_Input mb="0px" style={kanan} value={item.dosisracikan} />
                </td> */}
                <td width="600" style={{ paddingRight: "4px" }}>
                    <_Input mb="0px" style={kanan} value={item.produk} />
                </td>
                <td width="100">
                    <_Input mb="0px" style={kanan} value={item.jumlah} />
                </td>
                <td width="100">
                    <_Input mb="0px" style={kanan} value={item.signa} />
                </td>
                <td width="200">
                    <_Input mb="0px" style={kanan} value={item.aturanpakai} />
                </td>
                <td width="200">
                    <_Input mb="0px" style={kanan} value={item.caraminum} />
                </td>
                <td>
                    <_Input mb="0px" style={kanan} value={item.keterangan} />
                </td>
              
               
                <td width="100">
                    <_Number format mb="0px" style={kanan} value={item.hargasatuan} />
                </td>
                <td width="150">
                    <_Number format mb="0px" style={kanan} value={item.hargatotal} />
                </td>
                <td width="5">
                    <Popconfirm title={`Hapus Obat dari resep ..?`} okText="Hapus" cancelText="Batal"
                        onConfirm={() => hapusObatResep(item)}
                    >
                        <Tooltip placement="bottom" title={"Hapus"}>
                            <Button block type="primary" danger icon={<CloseCircleOutlined />}>  Hapus </Button>

                        </Tooltip>
                    </Popconfirm>

                    {/* <Button style={{ margin: "3px 0 0 5px" }} danger type="primary"
                        size="small" icon={<StopOutlined />} /> */}
                </td>
            </tr>
        )
    })
    return (
        <>
            {renderObat}

        </>
    )
}

export default DataInputResep

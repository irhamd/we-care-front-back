import React, { useEffect, useState } from 'react'
import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Tag, Image, Badge } from 'antd';
import { DivCol, _ButtonFilter, _Date, _Input, _Number, _Search, _TitleBar, _Button } from '../../Services/Forms/Forms';
import { mainColor } from '../../Services/Color';
import { WarningOutlined, CloseCircleOutlined, DownloadOutlined, FormOutlined, RedoOutlined, CloudUploadOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { _Message } from '../../Services/Toastr/Notify/NotifyToastr';
import _Api from '../../Services/Api/_Api';
import '../../_Assets/react-notifications-component.css'
import { Boot, Grid_, Row_, _grid, _row } from '../../Services/Forms/LayoutBootstrap';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import { acakText, ubahText } from '../../Services/Crypto';
import InputPasienBaru from './InputPasienBaru';
import _Autocomplete from '../../Services/Forms/_Autocomplete';
// import 'react-notifications-component/dist/theme.css'
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import { Cache } from '../../Services/Cache';
import moment from 'moment';
import { fitrah } from '../../Services/Text/GlobalText';
import foto from "../../_Assets/foto/foto.jpg"
import RiwayatPasien from './RiwayatPasien';



function DataPasienLama() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    const [cariPasien, setcariPasien] = useState({})
    const [showRiwayat, setshowRiwayat] = useState(false)
    const [idpasien, setidpasien] = useState("")
    const histori = useHistory()
    const [selected, setselected] = useState()
    const [detail, setdetail] = useState([])

    const initBeforeUnLoad = (showExitPrompt) => {
        window.onbeforeunload = (event) => {
            if (showExitPrompt) {
                const e = event || window.event;
                e.preventDefault();
                if (e) {
                    e.returnValue = ''
                }
                return '';
            }
        };
    };
    window.onload = function () {
        initBeforeUnLoad(true);
    };

    const cekHistory =  async (id) => {
        setshowRiwayat(true)
        await _Api.get("pasien/get-riwayat-pendaftaran-pasien?nocmfk=" + idpasien).then(res => {
            setdetail(res.data)
        })
        setidpasien(id)

    };

    const columns = [
        {
            title: 'No',
            width: 50,
            align: "center",
            render: (text, row, index) => (
                <> {index + 1} </>
            ),
        },
        {
            width: "70px",
            width: 70,
            render: (_, rc) =>
                data.length >= 1 ? (
                    <Image style={{ width: "100%" }} width={40} src={!rc.foto ? foto : rc.foto} />
                ) : null,
        },

        {
            title: 'No. RM',
            width:100,
            dataIndex: 'nocm',
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'Nama Pasien',
            width:300,
            dataIndex: 'namapasien',
            sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        },
        {
            title: 'NIK',
            width:200,
            dataIndex: 'noidentitas',
            sorter: (a, b) => a.noidentitas - b.noidentitas,
        },
        {
            title: 'Tempat Lahir',
            width:200,
            dataIndex: 'tempatlahir',
            sorter: (a, b) => a.tempatlahir - b.tempatlahir,
        },
        {
            title: 'Tgl Lahir',
            width:200,
            sorter: (a, b) => a.tgllahir.length - b.tgllahir.length,
            render: (_, rc) =>
                <div> {moment(rc.tgllahir).format('DD-MM-YYYY')} </div>
        },
        {
            title: 'Umur',
            width:100,

            render: (_, rc) =>
                <div> {fitrah.getUmur(rc.tgllahir)} </div>
        },
        {
            title: 'Jenis Kelamin',
            width:100,
            dataIndex: 'jeniskelamin',
            sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,
        },
        {
            title: 'Alergi',
            width:200,
            dataIndex: 'alergi',
        },
        {
            title: 'Alamat',
            width:300,
            dataIndex: 'alamat',
        },
        {
            width:200,
            title: 'Desa / Kelurahan',
            dataIndex: 'desakelurahan',
        },
        {
            width:100,
            title: 'Action',
            width: "150px",
            render: (_, rc) =>
                data.length >= 1 ? (
                    <div>
                        {/* <Popconfirm title="Hapus Data ?" okText="Hapus" cancelText="Batal" onConfirm={() => _Toastr.success(rc.nocm)}>
                            <Tooltip placement="bottom" title={"Hapus"}>
                                <Button type="primary" danger size="small" icon={<CloseCircleOutlined style={{ paddingTop: "-10px" }} />} />
                            </Tooltip>
                        </Popconfirm> */}

                        <Tooltip placement="bottom" title={"Update"}>
                            <Button type="primary" style={{ background: "orange", borderColor: "orange" }} warning size="small"
                                onClick={() =>
                                    cekHistory(rc.nocmfk)
                                }
                                icon={<FieldTimeOutlined />}> Riwayat
                            </Button>
                        </Tooltip>

                    </div >
                ) : null,
        },


    ];


    const LoadData = (value) => {
        setLoading(true)
        _Api.get("pasien/get-pasien-lama", { params: value }).then(res => {
            setData(res.data.daftar)
            setLoading(false)
        })
    }

    useEffect(() => {
        LoadData();
    }, [])

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <Drawer
                title="INPUT PASIEN BARU"
                placement="top"
                height={950}
                headerStyle={{ background: "#096dd9", color: "white" }}
                onClose={onClose}
                bodyStyle={{ background: "#e3e7ec" }}
                visible={visible}
            >
                <InputPasienBaru onClose={onClose} />
            </Drawer>

            <LayoutAnt  >
                <_TitleBar title="DATA PASIEN" align="center" />
                <DivCol pl="13px" pr="10px">
                    <Form layout={"vertical"} onFinish={LoadData} >
                        <_row >
                            <_grid sm={1}><_Input label="No. RM" name="nocm" style={{ marginRight: "-15px" }} /> </_grid>
                            <_grid sm={2}><_Input label="Nama Pasien" name='namapasien' style={{ marginRight: "-15px" }} /> </_grid>
                            <_grid sm={2}><_Date label="Tanggal Lahir" name='tgllahir' style={{ marginRight: "-15px" }} /> </_grid>
                            <_grid sm={3}>
                                <Button type="primary" htmlType="submit" style={{ marginTop: "23px", paddingTop: "0px" }} icon={<RedoOutlined />}>
                                    Filter
                                </Button> &nbsp;
                                <Button type="primary" icon={<CloudUploadOutlined />} style={{ marginTop: "23px", paddingTop: "0px" }} onClick={showDrawer}>
                                    Input Pasien Baru
                                </Button> &nbsp;
                            </_grid>
                            <_grid sm={{ span: 2, offset: 2 }}>
                                <_Button block style={{ marginTop: "23px" }}
                                    icon={<FormOutlined />}
                                    onClick={() => histori.push(`PasienDaftar/${detailpasien}`)} primary title="Registrasi" color="orange" />
                            </_grid>
                        </_row>
                    </Form>
                </DivCol>
                <br />
                <DivCol>
                    <Table
                        rowKey="nocmfk"
                        // rowSelection={{
                        //     type: "radio",
                        //     ...rowSelection,
                        // }}
                        pagination={{ position: ['bottomCenter'] }}
                        columns={columns}
                        rowClassName={(record, index) => record == selected && 'bg-orange'}
                        loading={loading}
                        scroll={{ x: 800, y: 350 }}
                        dataSource={data}
                        onRow={(rc, i) => {
                            return {
                                onClick: event => {
                                    setselected(rc)
                                    // let detailpasien = JSON.stringify(rc)
                                    setdetailpasien(acakText(JSON.stringify(rc)))
                                },
                                onDoubleClick: event => {
                                    histori.push(`PasienDaftar/${acakText(JSON.stringify(rc))}`)
                                }, // double click row
                            };
                        }}
                    />
                </DivCol>
                <RiwayatPasien detail={detail} show={showRiwayat} close={() => setshowRiwayat(false)} />
            </LayoutAnt>
        </div>
    )
}

export default withRouter(DataPasienLama)

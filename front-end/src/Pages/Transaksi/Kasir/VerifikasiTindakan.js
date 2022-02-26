import React, { useEffect, useState } from 'react'
// import LayoutAnt from '../Layout/LayoutAnt'
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate } from 'antd';
import moment from 'moment';
import { AppstoreAddOutlined, BranchesOutlined, SyncOutlined, DownloadOutlined, DeploymentUnitOutlined, UserOutlined, AntDesignOutlined, FileSearchOutlined, AuditOutlined } from '@ant-design/icons';
import { useHistory, withRouter } from 'react-router-dom';

import { DivCol, _Button, _Date, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms';
// import { _grid, _row } from '../../Services/Forms/LayoutBootstrap'
// import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
// import _Api from '../../Services/Api/_Api';

import _Api from '../../../Services/Api/_Api';
import { acakText } from '../../../Services/Crypto';
import LayoutAnt from '../../Layout/LayoutAnt';
import { fitrah, formatNumber } from '../../../Services/Text/GlobalText';
import { Row } from 'react-bootstrap';
import DetailPasienDaftar from '../../Pasien/DetailPasienDaftar';
import Text from 'antd/lib/typography/Text';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';
const terbilang = require('angka-menjadi-terbilang')




function VerifikasiTindakan(pr) {
    const [data, setData] = useState([])
    const [selected, setselected] = useState()
    const [loading, setLoading] = useState(true)
    const [detailpasien, setdetailpasien] = useState("")
    const [isVerif, setisVerif] = useState(false)
    const [ObjBayar, setObjBayar] = useState({})
    // const [selected, selected] = useState("")

    const [totalB, settotalB] = useState(0)
    const [form] = Form.useForm()
    const [formbayar] = Form.useForm()


    const [combo, setcombo] = useState([])
    const histori = useHistory()

    const tglAwal = moment().format('YYYY-MM-DD') + ' 00:00'
    const tglAkhir = moment().format('YYYY-MM-DD') + " 23:59"
    const [filterData, setfilterData] = useState({
        tglAwal: tglAwal,
        tglAkhir: tglAkhir,
    })

    const LoadData = () => {
        setLoading(true)
        _Api.get("kasir/get-detail-pelayanan-verif-bynoregistrasi?noregistrasi=" + pr.match.params.noregistrasi).then(res => {
            setData(res.data.detail)
            setLoading(false)
        })
    }

    const isiCombobox = () => {
        _Api.get("registrasi/compo-registrasi-pelayanan").then(res => {
            setcombo(res.data)
        })
    }

    useEffect(() => {
        LoadData();
        isiCombobox();
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
            // let aa = JSON.stringify(selectedRows[0])
            setselected(selectedRowKeys)
            var total = 0;
            if (selectedRows.length == 0) {
                settotalB(0)
            } else
                selectedRows.forEach(({ hargatotaljasa }) => {
                    total += hargatotaljasa;
                    settotalB(total)
                    form.setFieldsValue({ totalverif: total, totalharusdibayar: total })
                });

            // setselected(selectedRows)
            // setdetailpasien(acakText(aa))
            // Cache.set("detailpasien", detailpasien)
        },
        getCheckboxProps: (record) => ({
            name: record.row,
        }),
    };

    const verifTindakan = (val) => {
        if (!totalB || totalB == 0) {
            alert('silahkan pilihh ')
            return
        }
        var rout = pr.match.params
        var obj = {
            ...val,
            "norec_pd": rout.norec_pd,
            "idpenjamin": rout.idpenjamin,
            "norec_item_pp": selected,
        }
        setisVerif(true)
        _Api.post("kasir/save-verifikasi-pelayanan", obj).then(res => {
            _Toastr.success('Suksess ...')

        }).catch(err => {
            _Toastr.error("Gagal verifikasi ...")
        })

        // histori.push("PengkajianMedis/" + detailpasien)
    }
    const Bayar = async (val) => {
        if (!val.idcarabayar) return
        var obj = {}
        await _Api.get("kasir/get-daftar-verifikasi-pelayanan?noregistrasi=" + pr.match.params.noregistrasi).then(res => {
            obj = { ...res.data[0], norec_pd: pr.match.params.norec_pd }
        })

        _Api.post("kasir/save-pembayaran-pasien",
            { ...obj, ...val, norec_item_sp: [obj.norec_sp] }
        ).then(res => {
            _Toastr.success('Suksess melakukan pembayaran ...')
            histori.goBack()
        }).catch(err => {
            _Toastr.error("Gagal melakukan pembayaran ...")
        })
        // histori.push("PengkajianMedis/" + detailpasien)
    }
    const cekTotalKlaim = (total) => {
        var totalverif = form.getFieldsValue("totalverif")
        form.setFieldsValue({ totalklaim: totalverif.totalverif - total })
        // histori.push("PengkajianMedis/" + detailpasien)
    }

    const columns = [

        {
            title: 'Tanggal Pelayanan',
            render: (_, rc) =>
                <div> {moment(rc.tglpelayanan).format("DD-MM-YYYY HH:mm")}
                </div>,
            // fixed: 'left',
            width: 150
        },
        {
            title: 'Ruangan',
            width: 150,
            dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
        },
        {
            title: 'Produk',
            width: 350,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Jasa',
            width: 200,
            dataIndex: 'jasa',
            sorter: (a, b) => a.jasa.length - b.jasa.length,
        },


        {
            title: 'jumlah',
            width: 100,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah - b.jumlah,
        },
        {
            width: 150,
            title: 'Harga Satuan',
            render: (_, rc) =>
                <div>
                    Rp, {formatNumber(rc.hargasatuan)}
                </div>
        },
        {
            width: 150,
            title: 'Total Harga',
            render: (_, rc) =>
                <div>
                    Rp, {formatNumber(rc.hargatotaljasa)}
                </div>
        },
    ];


    return (
        <LayoutAnt pl="10px" >
            <_TitleBar color="#ffa50087" label="VERIFIKASI TINDAKANG" />
            <DetailPasienDaftar data={{ noregistrasi: pr.match.params.noregistrasi }} />
            {/* {JSON.stringify(selected)} */}
            <DivCol >
                <Table
                    rowKey="norec_pp"
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowClassName={(record, index) => index == selected && 'bg-orange'}
                    pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                    columns={columns}
                    loading={loading}
                    scroll={{ x: 800, y: 400 }}
                    dataSource={data}
                />
            </DivCol>
            <DivCol pl="10px">
                <Form form={form} layout="vertical" onFinish={verifTindakan} initialValues={{
                    totalverif: 0, totalharusdibayar: 0, totalklaim: 0
                }} >
                    <Row>
                        <_Number required name="totalverif" disabled style={{ fontSize: "18px" }} defaultValue={totalB} format label="Total Tagihan" size="large" sm={3} />
                        <_Number required name="totalharusdibayar" onChange={(e) => cekTotalKlaim(e)} label="Total Bayar" format size="large" sm={3} style={{ fontSize: "18px" }} />
                        <_Number format required name="totalklaim" disabled label="Total Klaim / Diskon" size="large" sm={3} style={{ fontSize: "18px" }} />
                        {!isVerif &&
                            <_Button sm={2} icon={<BranchesOutlined />} color="orange" submit title="Verif" block style={{ marginTop: "30px" }} />
                        }
                    </Row>
                    <br />
                    <Text> <b> ( {terbilang(totalB) + ' rupiah '} )  </b></Text>
                    <br />
                </Form>
            </DivCol>
            {isVerif &&
                <DivCol pl="10px">
                    <Form form={formbayar} layout="vertical" onFinish={Bayar} initialValues={{
                        idcarabayar: 1
                    }} >
                        <Row>
                            <_Select sm={2} name="idcarabayar" option={[
                                { id: 1, carabayar: "Cash / Tunai" }
                            ]} label="Cara Bayar" required val="id" caption="carabayar" />
                            <_Number required name="totalbayar" label="Total Bayar" format sm={3} />
                            <_Button sm={2} icon={<AuditOutlined />} submit primary onClick={Bayar} title="BAYAR" style={{ marginTop: "23px" }} block />
                        </Row>
                        <br />
                    </Form>
                </DivCol>
            }

            <br />
            <br />
            <br />
            <br />
            <br />

        </LayoutAnt>
    )
}

export default withRouter(VerifikasiTindakan)

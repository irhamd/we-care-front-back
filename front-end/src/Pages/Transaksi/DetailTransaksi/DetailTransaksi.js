import { CloseCircleOutlined, PrinterOutlined } from '@ant-design/icons';
import { Descriptions, Popconfirm, Table, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Button, Tooltip } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import _Api from '../../../Services/Api/_Api';
import { DivCol, _Button, _TitleBar } from '../../../Services/Forms/Forms';
import { _Col } from '../../../Services/Forms/LayoutBootstrap';
import { fitrah, formatNumber, formatTgl, formatTglWaktu } from '../../../Services/Text/GlobalText';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';
import LayoutAnt from '../../Layout/LayoutAnt';
import DetailPasien from '../../Pasien/DetailPasien';
import DetailPasienDaftar from '../../Pasien/DetailPasienDaftar';

function DetailTransaksi(pr) {

    const [loading, setLoading] = useState(true)
    const [st, setState] = useState({
        data: {},
        selected: "",
    })
    const [totalB, settotalB] = useState(0)

    const terbilang = require('angka-menjadi-terbilang')

    const loadData = () => {
        // console.log(params)
        setLoading(true)
        _Api.get(`kasir/get-rincian-pelayanan-pasien?noregistrasi=${pr.match.params.noregistrasi}`).then(res => {
            // setdataBarangMasuk(res.data)
            setState({ ...st, data: res.data })
            setLoading(false)
        })
    };

    const columns = [
        {
            title: 'No',
            width: 50,
            render: (text, row, index) => (
                <p style={{ textAlign:"center" }}> {index + 1}. </p>
            ),
        },
        {
            title: 'Jenis',
            width: 100,
            sorter: (a, b) => a.norec_sr - b.norec_sr,
            render: (text, row, index) => (
                <Tag color={row.norec_sr ? 'blue' : 'red'}>
                    {row.norec_sr ? 'Obat' : 'Tindakan'}
                </Tag>
            ),

        },
        {
            title: 'Tanggal Pelayanan',
            width: 200,
            // dataIndex: 'tglpelayanan',
            sorter: (a, b) => a.tglpelayanan - b.tglpelayanan,
            render: (text, row, index) => (
                <b> {formatTglWaktu(row.tglpelayanan)} </b>
            ),
        },
        {
            title: 'Ruangan',
            width: 200,
            dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan - b.ruangan,
        },
        {
            title: 'Nama Tindakan',
            dataIndex: 'produk',
            width: 300,
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Jumlah', width: 100,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah - b.jumlah,
        },
        {
            title: 'Harga Satuan', width: 200,
            align: "center",
            // className: "bg-orange",
            sorter: (a, b) => a.hargasatuan - b.hargasatuan,
            render: (text, row, index) => (
                <b> Rp, {formatNumber(row.hargasatuan)} </b>
            ),
        },
        {
            title: 'Jasa',
            width: 200,
            dataIndex: 'jasa',
            sorter: (a, b) => a.jasa - b.jasa,
        },
        {
            title: 'Total', width: 200,
            align: "center",
            render: (text, row, index) => (
                <b>Rp,  {formatNumber(row.hargatotaljasa)} </b>
            ),
        },
        {
            title: '',
            width: "150px",
            render: (text, row, index) => (
                <div>
                    <Popconfirm title="Hapus ... ?" okText="Hapus" onConfirm={()=>HapusPelayanan(row.norec_pp)} cancelText="Batal"  >
                        <_Button danger title="Hapus" icon={<CloseCircleOutlined />} />

                    </Popconfirm>
                </div>
            ),

        },

    ];

    const HapusPelayanan = (norec_pp) => { 
        _Api.delete("kasir/hapus-pelayanan?norec_pp="+norec_pp).then(res=>{
            var rr = res.data
            if( rr.status == 1 ){
                _Toastr.success(rr.message)
                loadData()
            } else{
                _Toastr.error(rr.message)
            }
            // if( res.data )
        })
     }


    useEffect(() => {
        loadData();
    }, [])

    return (
        <LayoutAnt pl="10px" >
            <_TitleBar label="DETAIL TRANSAKSI" align="center" />
            <DivCol pl="13px">
                {/* <p> {JSON.stringify(st.data)} </p> */}
                <DetailPasienDaftar data={{ noregistrasi: pr.match.params.noregistrasi }} />
                <br />
                <Table
                    rowKey="nocmfk"
                    pagination={false}
                    columns={columns}
                    size="small"
                    rowClassName={(record, index) => record == st.selected && 'bg-orange'}
                    loading={loading}
                    scroll={{ x: 800, y: 800 }}
                    dataSource={st.data.detail}
                    onRow={(rc, i) => {
                        return {
                            onClick: () => {
                                // setselected(rc)
                                setState({ ...st, selected: rc })
                                // setdetailpasien(acakText(JSON.stringify(rc)))
                            },

                        };
                    }}
                    summary={pageData => {
                        let total = 0;
                        pageData.forEach(({ hargatotaljasa }) => {
                            total += hargatotaljasa;
                            settotalB(hargatotaljasa)
                        });
                        return (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={6}> <span style={{ float: "right" }}> <b> Total Tagihan : </b>  </span> </Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2} style={{ background: "orange" }}>
                                    <Tag color="blue" style={{ fontWeight: "bold", fontSize: "16px", padding: "0 20px 0 20px" }}>{'Rp, ' + formatNumber(total)}</Tag>
                                    <br />
                                    <Text> ( {terbilang(total) + ' rupiah '} ) </Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )
                    }}
                />
                <br />
                <Descriptions
                    bordered
                    size={"small"}
                    column={4}
                    contentStyle={{ background: "#faad14", fontWeight: "bold" }}
                    labelStyle={{ textAlign: "right" }}
                >
                    <Descriptions.Item label="Sisa Tagihan : ">{"Rp, 0"}</Descriptions.Item>
                    <Descriptions.Item label="Total Bayar :">{"Rp, 0"}</Descriptions.Item>

                </Descriptions>
                <br />
                <_Col>
                    <_Button icon={<PrinterOutlined />} title="Cetak Billing" />
                </_Col>

            </DivCol>
        </LayoutAnt>
    )
}

export default withRouter(DetailTransaksi)

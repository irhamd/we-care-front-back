import { Button, Descriptions, Image, Popconfirm, Table } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import _Api from '../../../../Services/Api/_Api'
import { Cache } from '../../../../Services/Cache'
import { acakText } from '../../../../Services/Crypto'
import { _Button } from '../../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../../Services/Forms/LayoutBootstrap'
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr'
import foto from '../../../../_Assets/foto/foto.jpg'

function DetailResepObat(pr) {
    const histori = useHistory()

    const inputObatBaru = () => {
        var cc = acakText(JSON.stringify(pr.dataDetail))
        // alert(cc)
        Cache.set("newobat", 'ya')
        histori.push("ProsesResep/" + cc)

    }

    const hapusObat = (norec_pp) => {
        _Api.post(`apotik/delete-pelayanan-obat`, {
            "norec_item_pp": [norec_pp]
        }).then(res => {
            _Toastr.success('Suksess ...!')
            pr.constShowDetail(pr.dataDetail.noregistrasi)
            pr.loadData()
        }).catch(err => {
            _Toastr.error('Gagal hapus obat ..!')

        })
    }


    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        // {
        //     title: 'Tanggal Kirim', width: 200,
        //     render: (row) => (
        //         <> {moment(row.tglkirim).format('DD-MM-YYYY HH:mm')}  </>
        //     ),
        // },
        {
            title: 'No. RM',
            dataIndex: 'produk'
        },
        // {
        //     title: 'Nama Pasien',
        //     dataIndex: 'namapasien'
        // },
        {
            title: 'Tgl Input Resep', width: 230,
            dataIndex: 'tglpelayanan'
        },

        {
            title: 'Jumlah', width: 200,
            dataIndex: 'jumlah'
        },
        {
            title: 'Harga',
            dataIndex: 'hargasatuan'
        },
        {
            title: 'Ruangan', width: 200,
            dataIndex: 'ruangan'
        },
        {
            title: 'Total Harga',
            dataIndex: 'hargatotaljasa'
        },
        {
            title: 'Detail', width: 100,
            render: (row) => (
                <Popconfirm title={`Hapus Tindakan ?`} okText="Hapus" cancelText="Batal"
                    onConfirm={() => hapusObat(row.norec_pp)}>
                    <_Button title="Hapus" danger btnDelete
                    // onClick={() => }
                    />
                </Popconfirm>


            ),
        },
    ];

    const footer = [
        <Button key="submit" type="primary" onClick={inputObatBaru}> Input Obat Baru </Button>,
        <Button key="back" danger type="primary" onClick={() => pr.setshowDetail(false)} > Kembali </Button>,

    ]
    return (
        <div>

            <Modal
                title="Detail Resep Obat"
                centered
                visible={pr.showDetail}
                width={1900}
                footer={footer}
            >
                <_Col>
                    <_Row>
                        {/* <_Col sm={1} style={{ textAlign: "center" }}>
                            <Image width={124} style={{ paddingRight: "20px" }} className="rounded" src={foto} />
                        </_Col> */}
                        <_Col sm={8}>
                            <Descriptions
                                bordered
                                size={"small"}
                                column={2}
                                contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                                labelStyle={{ textAlign: "right" }}
                            >
                                <Descriptions.Item label="No. RM : ">{pr.dataDetail.nocm}</Descriptions.Item>
                                <Descriptions.Item label="Nama Pasien :">{pr.dataDetail.namapasien}</Descriptions.Item>
                                {/* <Descriptions.Item label="Nama Pasien">{pr.dataDetail.namapasien}</Descriptions.Item> */}
                                <Descriptions.Item label="Tanggal Registrasi :">{pr.dataDetail.tglregistrasi}</Descriptions.Item>
                                <Descriptions.Item label="Tanggal Pulang :">{pr.dataDetail.tglpulang}</Descriptions.Item>
                                <Descriptions.Item label="Ruangan Saat Ini :">{pr.dataDetail.ruanganakhir}</Descriptions.Item>
                                <Descriptions.Item label="Jenis Kelamin :">{pr.dataDetail.jeniskelamin}</Descriptions.Item>
                                <Descriptions.Item label="No. Registrasi :">{pr.dataDetail.noregistrasi}</Descriptions.Item>
                            </Descriptions>
                        </_Col>
                    </_Row>
                </_Col>
                <_Col>
                    <br />
                    <Table
                        // loading={Loading}
                        headStyle={{ textAlign: "center" }}
                        // rowClassName={(record, index) => record == selected && 'bg-orange'}
                        columns={columns}
                        rowKey="nokirim"
                        className="components-table-demo-nested"
                        dataSource={pr.dataDetail && pr.dataDetail.detail}
                        onRow={(rc, i) => {
                            return {
                                onClick: event => {
                                    // setselected(rc)
                                    // console.log(rc)
                                },
                                // onDoubleClick: event => { prosesResep() }, // double click row
                            };
                        }}
                    />,
                </_Col>

            </Modal>
        </div>
    )
}

export default DetailResepObat

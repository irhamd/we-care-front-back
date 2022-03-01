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
import DetailPasienDaftar from '../../../Pasien/DetailPasienDaftar'

function DetailResepObat(pr) {
    const histori = useHistory()
    console.log('first 00000000000000000000000', JSON.stringify(pr.dataDetail))


    const inputObatBaru = () => {
        var cc = acakText(JSON.stringify(pr.dataDetail))
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
            title: 'Tgl Input Resep', width: 230,
            dataIndex: 'tglpelayanan'
        },
        {
            title: 'Nama Obat',
            dataIndex: 'produk'
        },
        {
            title: 'Cara Minum',
            dataIndex: 'signa'
        },
        {
            title: 'Aturan Pakai',
            dataIndex: 'aturanpakai',
            
        },


        // {
        //     title: 'Nama Pasien',
        //     dataIndex: 'namapasien'
        // },

        {
            title: 'Jumlah', width: 200,
            // dataIndex: 'jumlah',
            render: (text, row, index) => (
                < div > {row.jumlah} {row.satuan} </div>
            ),
        },
        // {
        //     title: 'Satuan', width: 200,
        //     dataIndex: 'satuan'
        // },
        // {
        //     title: 'Harga',
        //     dataIndex: 'hargasatuan'
        // },
        {
            title: 'Ruangan', width: 200,
            dataIndex: 'ruangan'
        },
        // {
        //     title: 'Total Harga',
        //     dataIndex: 'hargatotaljasa'
        // },
        {
            title: 'Detail', width: 100,
            render: (row) => (
                <Popconfirm title={`Hapus Tindakan ?`} okText="Hapus" cancelText="Batal"
                    onConfirm={() => hapusObat(row.norec_pp)}>
                    <_Button btnDel title="Hapus" danger btnDelete
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
                    <DetailPasienDaftar data={ { noregistrasi : pr.noregistrasi} } />
                </_Col>
                <_Col>
                    <br />
                    <Table
                    size='small'
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

import { Popconfirm, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api';
import { _Button, _Date, _Input, _Number, _Select, _Text } from '../../../Services/Forms/Forms'
import { formatNumber } from '../../../Services/Text/GlobalText';

function ExpandDetailBarang(pr) {
    const [detail, setDetail] = useState([])


    const loadData = () => {
        _Api.get(`penerimaanbarang/get-detail-penerimaan-bynorec?norec_pb=${pr.record.norec_pb}`).then(res => {
            setDetail(res.data)
        })
    };
    const hapusBarang = (norec) => {
        _Api.post(`penerimaanbarang/delete-penerimaan-barang-detail`,
            {
                "keterangandelete": "hapus",
                "norec_items_pbd": [norec]
            }
        ).then(loadData())
    };


    const columns = [
        {
            title: 'Action',
            render: (record) =>
                <Popconfirm
                    title="Hapus Barang ini dari list ..?"
                    onConfirm={() => hapusBarang(record.norec_pbd)}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <_Button danger label="Hapus" btnCancel />
                </Popconfirm>,
            width: 150

            // <a>{JSON.stringify(record)}</a>,
        },
        { title: 'Nama Barang', dataIndex: 'produk', },
        { title: 'Harga Beli', width: 150, render: (row) => 'Rp, ' + formatNumber(row.hargabeli) },
        { title: 'Jumlah', dataIndex: 'jumlah', width: 100 },
        { title: 'Harga Jual', width: 150, render: (row) => 'Rp, ' + formatNumber(row.hargajual) },
        { title: 'Total Harga', width: 200, render: (row) => 'Rp, ' + formatNumber(row.hargatotal) },
        {
            title: 'Tanggal Kedaluarsa', width: 200,
            render: (row) =>moment(row.tglkadaluarsa).format('DD-MM-YYYY')
        },
        // formatNumber

    ];


    // hargabeli: 33
    // hargajual: 22
    // hargatotal: 1089
    // idproduk: 334
    // jumlah: 33
    // norec_pbd: '4bee2240-f1cc-11eb-9c72-db63baf5'
    // produk: 'Ambroksol tablet 30 mg'
    // tglkadaluarsa: '2024-07-18 00:00:00'

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div style={{ paddingLeft: "40px", background: "rgb(113 189 251 / 31%)" }}>
            <Table
                columns={columns}
                rowKey="norec_pbd"
                pagination={false}
                dataSource={detail}
                summary={pageData => {
                    let total = 0;
                    pageData.forEach(({ hargatotal }) => {
                        total += hargatotal;
                    });
                    return (
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={5}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell>
                                <Text type="danger" style={{ fontWeight: "bold" }}>{'Rp, ' + formatNumber(total)}</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    )
                }}
            />
        </div>
    )
}

export default ExpandDetailBarang

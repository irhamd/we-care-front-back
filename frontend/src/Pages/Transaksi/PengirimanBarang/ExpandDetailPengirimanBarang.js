import { SwapOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
// import { css } from 'react-emotion';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api';
import { _Button, _Date, _Input, _Number, _Select, _Text } from '../../../Services/Forms/Forms'
import { formatNumber } from '../../../Services/Text/GlobalText';
import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';
// import { css } from 'react-emotion';

function ExpandDetailPengirimanBarang(pr) {
    const [detail, setDetail] = useState([])
    const [selected, setSelected] = useState([])

    // const header = css({ backgroundColor: 'rgb(100, 108, 140)', color: 'white', margin: '50px' });
    // const body = css({ backgroundColor: 'green' });

    const loadData = () => {
        _Api.get(`kirimbarang/get-detail-kirim-bynokirim?nokirim=${pr.record.nokirim}`).then(res => {
            setDetail(res.data)
        })
    };
    const batalKirim = () => {
        var data = selected.selectedRowKeys
        // console.log(selected.selectedRowKeys)
        if (data) {
            _Api.post(`kirimbarang/batal-kirim-barang`,
                {
                    "keterangandelete": "batal kirim dari menu DaftarPengirimanBarang",
                    "norec_item_kb": data
                }
            ).then(res => {
                loadData()
                _Toastr.success("Suksess ..!")
            }).catch(err => {
                _Toastr.error("Tidak ada data yang di batalkan ...!")

            })
        } else {
            _Toastr.error("Silahkan centang barang yang akan di batalkan ..!")
        }
    };

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        { title: 'Nama Barang', dataIndex: 'produk', width: 800 },
        { title: 'Jumlah', dataIndex: 'jumlah', width: 300 },
        { title: '' },


    ];

    useEffect(() => {
        loadData()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setSelected({ ...selected, selectedRowKeys })
        }
    };

    return (
        <div style={{ paddingLeft: "40px", background: "rgb(113 189 251 / 31%)" }}>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                rowKey="norec_kb"
                pagination={false}
                dataSource={detail}
                summary={pageData => {
                    return (
                        <Table.Summary.Row>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={2}>


                                <div style={{ display: "flex" }}>
                                    <Popconfirm title={`Batal Kirim barang .? ?`} okText="YA" cancelText="Tidak"
                                        onConfirm={batalKirim}
                                    >
                                        <_Button block sm={3} color="orangered" size="small" icon={<SwapOutlined />} title="Batal Kirim" />
                                    </Popconfirm>
                                    {/* <_Button block sm={3} color="red" size="small" title="Hapus" /> */}
                                </div>
                            </Table.Summary.Cell>

                        </Table.Summary.Row>
                    )
                }}
            // className={tableCSS}

            />
        </div>
    )
}

export default ExpandDetailPengirimanBarang

import { ApiOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import _Api from '../../../../Services/Api/_Api'
import { formatNumber } from '../../../../Services/Text/GlobalText';

function DataTIndakan(pr) {
    const [selectTindakan, setselectTindakan] = useState([])
    const [loading, setLoading] = useState(false)
    const [arrTindakan, setarrTindakan] = useState()



    const onSelectChange = row => {
        setselectTindakan(row.selectedRowKeys)
    };

    const hapusTindakan = async () => {
        let obj = { pelayananpasien: selectTindakan }
        setLoading(true)
        _Api.post("tindakan/delete-tindakan-pasien", obj).then(res => {
            pr.LoadData()
            setLoading(false)
            setselectTindakan([])
        })

    }

    const columns = [
        {
            title: 'Tanggal Pelayanan',
            width: 100,
            dataIndex: 'tglpelayanan',
            sorter: (a, b) => a.tglpelayanan.length - b.tglpelayanan.length,
        },
        {
            title: 'Pelaksana',
            width: 200,
            dataIndex: 'pelaksana',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Nama Tindakan',
            width: 300,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Ruangan',
            width: 100,
            dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan.length - b.ruangan.length,
        },
        {
            title: 'Jumlah',
            width: 100,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah.length - b.jumlah.length,
        },
        {
            title: 'Jasa',
            width: 100,
            dataIndex: 'jasa',
            sorter: (a, b) => a.jasa.length - b.jasa.length,
        },
        // {
        //     title: 'Harga Satuan',
        //     width: 100,
        //     dataIndex: 'hargasatuan',
        //     sorter: (a, b) => a.hargasatuan.length - b.hargasatuan.length,
        // },

        {
            width: 100,
            title: 'Harga Satuan',
            sorter: (a, b) => a.hargasatuan - b.hargasatuan,
            render: (_, rc) =>
                <div> {formatNumber(rc.hargasatuan)} </div>
        },
        {
            width: 100,
            title: 'Total Harga',
            sorter: (a, b) => a.hargatotaljasa - b.hargatotaljasa,
            render: (_, rc) =>
                <div> {formatNumber(rc.hargatotaljasa)} </div>
        },


    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            onSelectChange({ ...setselectTindakan, selectedRowKeys })
        }
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
    };
    return (
        <div>
            <Row>
                <Col sm={2}>
                    <Popconfirm title={`Hapus Tindakan ?`} okText="Hapus" cancelText="Batal"
                        onConfirm={hapusTindakan}
                    >
                        <Tooltip placement="bottom" title={"Hapus"}>
                            {selectTindakan.length > 0 && <Button block type="primary"  danger icon={<CloseCircleOutlined />}>  Hapus Tindakan </Button>}

                        </Tooltip>
                    </Popconfirm>


                </Col>
                <br />
                <br />
                <Col sm={12}>
                    <Table
                        rowKey="norec_pp"
                        rowSelection={rowSelection}
                        pagination={{ position: ['bottomCenter'], pageSize: "5" }}
                        columns={columns}
                        loading={pr.loading || loading}
                        scroll={{ x: 800, y: 800 }}
                        dataSource={pr.dataSource}
                    />
                </Col>
            </Row>


            {/* <Button onClick={hapusTindakan}> Hapus </Button> */}
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default DataTIndakan

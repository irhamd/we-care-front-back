import { FundViewOutlined, SwapOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
// import { css } from 'react-emotion';
import React, { useEffect, useState } from 'react'
import _Api from '../../../../Services/Api/_Api';
// import { _Button } from '../../../../Services/Forms/Forms';
import { _Button, _Date, _Input, _Number, _Select, _Text } from '../../../../Services/Forms/Forms';
// import { formatNumber } from '../../../Services/Text/GlobalText';
// import { _Toastr } from '../../../Services/Toastr/Notify/_Toastr';
// import { css } from 'react-emotion';

function ExpandDaftarPasienPelayananLab(pr) {
    const [detail, setDetail] = useState()
    const [selected, setSelected] = useState([])

    // const header = css({ backgroundColor: 'rgb(100, 108, 140)', color: 'white', margin: '50px' });
    // const body = css({ backgroundColor: 'green' });

    const deletePemeriksaan = (norec_pp) => {
        // lab/delete-pelayanan-lab
        _Api.post(`lab/delete-pelayanan-lab`, {
            "norec_item_pp": [norec_pp]
        }).then(res => {
            // setdataBarangMasuk(res.data)
            // setLoading(false)
            loadData()
        })
    };

    const loadData = () => {
        _Api.get(`lab/get-detail-pelayanan-lab?noregistrasi=${pr.record.noregistrasi}`).then(res => {
            setDetail(res.data.detail)
        })
    };

    const columns = [
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        { title: 'No. Blangko', dataIndex: 'nolab', width: 200 },
        { title: 'Tanggal Pelayanan', dataIndex: 'tglpelayanan', width: 300 },
        { title: 'Petugas Pelaksana', dataIndex: 'pegawaipelaksana', width: 300 },
        { title: 'Ruangan Lab', dataIndex: 'depo', width: 200 },
        { title: 'Permintaan', dataIndex: 'produk' },
        { title: 'Harga Satuan', dataIndex: 'hargasatuan', width: 200 },
        { title: 'Jumlah', dataIndex: 'jumlah', width: 100 },
        { title: 'Jasa', dataIndex: 'jasa', width: 200 },
        {
            title: 'Act', width: 100,
            render: (row) => (
                <_Button title="Hapus" danger icon={<FundViewOutlined />} onClick={()=>deletePemeriksaan(row.norec_pp)}   />
            ),
        },
        // { title: '' },


    ];

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div style={{ paddingLeft: "40px", background: "grey" }}>
            <Table
                columns={columns}
                // rowSelection={rowSelection}
                rowKey="norec_kb"
                className="bg-red"

                rowClassName="bg-orange"
                pagination={false}
                dataSource={detail}
            />
            <br />
        </div>
    )
}

export default ExpandDaftarPasienPelayananLab

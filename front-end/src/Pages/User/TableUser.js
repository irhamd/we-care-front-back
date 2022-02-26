import { Button, Modal, Table } from 'antd'
import Form from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import _Api from '../../Services/Api/_Api'
import { DivCol, _Button, _Input, _TitleBar } from '../../Services/Forms/Forms'
import { Boot } from '../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../Layout/LayoutAnt'
import ModalInputUserBaru from './ModalInputUserBaru'


function TableUser(props) {

    const [loading, setLoading] = useState(false)

    const columns = [
        // {
            // title: 'Action',
            // width: "70px",
            // fixed: 'left',
            // render: (_, record) =>
            //     data.length >= 1 ? (
            //         <div>
            //             <Popconfirm title="Hapus Data ?" okText="Hapus" cancelText="Batal" onConfirm={() => deletePasien(record.id)}>
            //                 <Tooltip placement="bottom" title={"Hapus"}>
            //                     <Button type="primary" danger size="small" icon={<CloseCircleOutlined style={{ paddingTop: "-10px" }} />} />
            //                 </Tooltip>
            //             </Popconfirm>

            //             <Tooltip placement="bottom" title={"Update"}>
            //                 <Button type="primary" style={{ background: "orange", borderColor: "orange" }} warning size="small" icon={<WarningOutlined />} />
            //             </Tooltip>

            //         </div>
            //     ) : null,
        // },
        {
            title: 'No',
            dataIndex: 'key',
            width : 100,
            align: 'center',
            sorter: (a, b) => a.key - b.key,
        },
        {
            title: 'Nama Karyawan',
            dataIndex: 'namakaryawan',
            sorter: (a, b) => a.namakaryawan.length - b.namakaryawan.length,
        },
        {
            title: 'Username',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jeniskelamin',
            sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,

        },

    ];


    return (
        <div>
            <Table
                pagination={{ position: ['bottomCenter'] }}
                columns={columns}
                loading={loading}
                scroll={{ x: 800, y: 800 }}
                dataSource={props.dataSource}
            />

        </div>
    )
}

export default TableUser

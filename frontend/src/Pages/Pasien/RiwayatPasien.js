import { Image, Modal, Table, Tag } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import _Api from '../../Services/Api/_Api'
import { fitrah } from '../../Services/Text/GlobalText';
import foto from "../../_Assets/foto/foto.jpg"

function RiwayatPasien(pr) {


    const columns = [
        {
            title: 'No',
            width: 50,
            align: "center",
            render: (text, row, index) => (
                <> {index + 1} </>
            ),
        },


        // {
        //     title: 'No. RM',
        //     dataIndex: 'nocm',
        //     sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        // },

        {
            title: 'Tgl Registrasi',
            sorter: (a, b) => a.tglregistrasi.length - b.tglregistrasi.length,
            render: (_, rc) =>
                <div> {moment(rc.tglregistrasi).format('DD-MM-YYYY')} </div>
        },
        // {
        //     title: 'Nama Pasien',
        //     dataIndex: 'namapasien',
        //     sorter: (a, b) => a.namapasien.length - b.namapasien.length,
        // },
        {
            title: 'Ruangan', width: "100",
            // dataIndex: 'ruangan',
            sorter: (a, b) => a.ruangan - b.ruangan,
            render: (text, row, index) => (
                <Tag color="green"> {row.ruangan}  </Tag>
            ),

        },
       
    
        {
            title: 'Noregistrasi',
            dataIndex: 'noregistrasi',
            sorter: (a, b) => a.noregistrasi - b.noregistrasi,
        },



    ];




    return (
        <Modal title={ pr.detail.length && pr.detail[0].namapasien} visible={pr.show}
            width={1000}
            onOk={pr.close} >
            {/* <p>{JSON.stringify(pr.detail)}</p> */}

            <Table
                rowKey="nocmfk"
                pagination={{ position: ['bottomCenter'] }}
                columns={columns}
                // rowClassName={(record, index) => record == selected && 'bg-orange'}
                // loading={loading}
                scroll={{ x: 800, y: 350 }}
                dataSource={pr.detail}
            />

        </Modal>
    )
}

export default RiwayatPasien

import { Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import _Api from '../../Services/Api/_Api'
import { fitrah, formatTgl } from '../../Services/Text/GlobalText'

function DetailPasienDaftar({ data }) {

    const [datas, setdata] = useState([])
    const LoadData = () => {
        // setLoading(true)
        _Api.get(`registrasi/get-daftar-registrasi?noregistrasi=${data.noregistrasi}`).then(res => {
            setdata(res.data.daftar[0])
            // setLoading(false)
        })
    }

    useEffect(() => {
        LoadData()
    }, [])

    return (
        <Descriptions
            bordered
            size={"small"}
            column={4}
            contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
            labelStyle={{ textAlign: "right" }}
        >
            <Descriptions.Item label="No. RM : ">{datas.nocm}</Descriptions.Item>
            <Descriptions.Item label="Nama Pasien :">{datas.namapasien}</Descriptions.Item>
            <Descriptions.Item label="No. NRP:"> &nbsp;{datas.nrp}</Descriptions.Item>
            {/* <Descriptions.Item label="Nama Pasien">{datas.namapasien}</Descriptions.Item> */}
            <Descriptions.Item label="Penjamin :">{datas.penjamin}</Descriptions.Item>
            <Descriptions.Item label="Tempat Lahir :">{datas.tempatlahir}</Descriptions.Item>
            <Descriptions.Item label="Tgl Lahir :">{ formatTgl(datas.tgllahir) } / {fitrah.getUmur(datas.tgllahir)} </Descriptions.Item>
            <Descriptions.Item label="No. KTP :">{datas.noktp}</Descriptions.Item>
            <Descriptions.Item label="Jenis Kelamin :">{datas.jeniskelamin}</Descriptions.Item>
            <Descriptions.Item label="No. Registrasi :">{datas.noregistrasi}</Descriptions.Item>
            <Descriptions.Item label="Ruangan Saat Ini :">{datas.ruangan}</Descriptions.Item>
            <Descriptions.Item label="Instalasi :">{datas.instalasi}</Descriptions.Item>
        </Descriptions>
    )
}

export default DetailPasienDaftar

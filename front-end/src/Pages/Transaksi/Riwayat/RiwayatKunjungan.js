import { HistoryOutlined } from '@ant-design/icons'
import { Timeline, Button, Tag, Drawer, Tabs, Descriptions, Slider, Table, Empty, Alert, Space } from 'antd'
import Form from 'antd/lib/form/Form'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import _Api from '../../../Services/Api/_Api'
import { _Input, _RadioGroup, _Select, _Text, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import { formatTgl, formatTglWaktu, marksSkalaNyeri } from '../../../Services/Text/GlobalText'

function RiwayatKunjungan(pr) {

    const [showHistori, setshowHistori] = useState(false)
    const [detail, setdetail] = useState(false)
    const [diagnosa, setdiagnosa] = useState(false)
    const [anamnesa, setanamnesa] = useState(false)
    const [pfisik, setpfisik] = useState(false)
    const [pegawai, setpegawai] = useState([])
    const [dataResep, setdataResep] = useState({})
    const [combobox, setcombobox] = useState({})

    const { TabPane } = Tabs;
    const getGetailByNorec = (noreg) => {
        _Api.get(`pasien/get-detail-riwayat-pendaftaran?pasienfk=19`).then(res => {
            setanamnesa(res.data.anamnesa.anamnesa)
            setpfisik(res.data.anamnesa.pemeriksaanfisik)
            setdetail(res.data.anamnesa)
            setdiagnosa(res.data.diagnosa)
            setdataResep(res.data.resep)

        })
        setshowHistori(true)
    }

    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };

    const columns = [
        {
            title: 'No',
            width: 50,
            align: "center",
            render: (text, row, index) => (
                <> {index + 1} </>
            ),
        },
        {
            title: 'Tanggal',
            width: 200,
            dataIndex: 'tgldiagnosa',
            sorter: (a, b) => a.tgldiagnosa - b.tgldiagnosa,
        },

        {
            title: 'Nama Diagnosa',
            width: 300,
            dataIndex: 'diagnosa',
            // sorter: (a, b) => a.diagnosa.length - b.diagnosa.length,
        },
        {
            title: 'Kode Diagnosa',
            width: 100,
            dataIndex: 'kodediagnosa',
            // sorter: (a, b) => a.kodediagnosa.length - b.kodediagnosa.length,
        },
        {
            title: 'Status Penyakit',
            width: 200,
            dataIndex: 'statuskasuspenyakit',
            // sorter: (a, b) => a.statuskasuspenyakit.length - b.statuskasuspenyakit.length,
        },
        {
            title: 'Ruangan',
            width: 150,
            dataIndex: 'ruangan',
            // sorter: (a, b) => a.ruangan.length - b.ruangan.length,
        },

    ];


    const renderRiwayat = pr.data.length > 0 && pr.data.map((item, i) => {
        return (
            <div style={{marginTop:"-18px"}}>
                <Alert
                    message={item.noregistrasi} showIcon
                    icon={<HistoryOutlined />}

                    description={formatTglWaktu(item.tglregistrasi) + " / \r\n " + item.ruangan}
                    type="warning"
                    action={
                        < Button type="primary" onClick={() => getGetailByNorec(item.noregistrasi)} size="small"  >
                            Detail
                        </Button >
                    }
                />
                <div style={{marginBottom : "23px"}}>
                    
                </div>
            </div>
            // <Timeline.Item key={i} color="orange" label={formatTglWaktu(item.tglregistrasi, 'DD-MM-YYYY HH:mm')}>
            //     <Button size="small" type="primary" danger onClick={() => getGetailByNorec(item.noregistrasi)}>  {item.noregistrasi} </Button>
            // </Timeline.Item>
        )
    })

    useEffect(() => {
        _Api.get("tindakan/get-pegawai").then(res => {
            setpegawai(res.data)
            // setSpin(false)
        })

        _Api.get("resep/get-combo-resep").then(res => {
            setcombobox(res.data)
            // setSpin(false)
        })
    }, [])

    const columnsResep = [
        {
            title: 'No',
            width: 50,
            align: "center",
            render: (text, row, index) => (
                <> {index + 1} </>
            ),
        },
        {
            title: 'Jenis Kemasan',
            width: 200,
            dataIndex: 'jeniskemasan',
            sorter: (a, b) => a.jeniskemasan.length - b.jeniskemasan.length,
        },
        {
            title: 'Aturan Pakai',
            width: 200,
            dataIndex: 'aturanpakai',
            sorter: (a, b) => a.aturanpakai.length - b.aturanpakai.length,
        },
        {
            title: 'Produk',
            width: 300,
            dataIndex: 'produk',
            sorter: (a, b) => a.produk.length - b.produk.length,
        },
        {
            title: 'Jumlah',
            width: 300,
            dataIndex: 'jumlah',
            sorter: (a, b) => a.jumlah.length - b.jumlah.length,
        },

        {
            title: 'Signa',
            width: 100,
            dataIndex: 'signa',
            sorter: (a, b) => a.signa.length - b.signa.length,
        },




    ];

    return (
        <div>
            {renderRiwayat}
            {/* <Timeline mode={"right"}  >
            </Timeline> */}



            <Drawer
                title="Detail Riwayat Kunjungan"
                headerStyle={{ background: "rgb(97 182 249)" }}
                placement={"left"}
                width="1400"
                size="small"
                bodyStyle={{ background: "rgb(0 0 0 / 0.07%)" }}
                // closable={false}
                onClose={() => setshowHistori(false)}
                visible={showHistori}
            // key={placement}
            >
                <Tabs defaultActiveKey="3" type="card">
                    <TabPane tab="Anamnesa" key="3">
                        <_TitleBar label="Anamnesa" />
                        <Descriptions
                            bordered
                            size={"small"}
                            column={1}
                            contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                            labelStyle={{ textAlign: "right" }}
                        >
                            <Descriptions.Item label="Pelaksana ">{anamnesa && anamnesa.pegawai}</Descriptions.Item>
                            <Descriptions.Item label="Keluhan Utama ">{anamnesa && anamnesa.keluhanutama}</Descriptions.Item>
                            <Descriptions.Item label="Keluhan Tambahan ">{anamnesa && anamnesa.keluhantambahan}</Descriptions.Item>
                            <Descriptions.Item label="Lama Sakit ">
                                {anamnesa && anamnesa.lamasakit}
                            </Descriptions.Item>

                        </Descriptions>
                        <_TitleBar label="Pemeriksaan Fisik" />

                        <Descriptions
                            bordered size={"small"} column={2} contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                            labelStyle={{ textAlign: "right" }}
                        >
                            <Descriptions.Item label="Kesadaran ">{pfisik && pfisik.kesadaran}</Descriptions.Item>
                            <Descriptions.Item label="Sistole ">{pfisik && pfisik.sistole}</Descriptions.Item>
                            <Descriptions.Item label="Diastole ">{pfisik && pfisik.diastole}</Descriptions.Item>
                            <Descriptions.Item label="Tinggi Badan ">{pfisik && pfisik.tinggibadan}</Descriptions.Item>
                            <Descriptions.Item label="Cara Ukurtb ">{pfisik && pfisik.caraukurtb}</Descriptions.Item>
                            <Descriptions.Item label="Berat Badan ">{pfisik && pfisik.beratbadan}</Descriptions.Item>
                            <Descriptions.Item label="Lingkar Perut ">{pfisik && pfisik.lingkarperut}</Descriptions.Item>
                            <Descriptions.Item label="Imt ">{pfisik && pfisik.imt}</Descriptions.Item>
                            <Descriptions.Item label="Hasil Imt ">{pfisik && pfisik.hasilimt}</Descriptions.Item>
                            <Descriptions.Item label="Detak Dadi ">{pfisik && pfisik.detaknadi}</Descriptions.Item>
                            <Descriptions.Item label="Nafas ">{pfisik && pfisik.nafas}</Descriptions.Item>
                            <Descriptions.Item label="Saturasi ">{pfisik && pfisik.saturasi}</Descriptions.Item>
                            <Descriptions.Item label="Suhu ">{pfisik && pfisik.suhu}</Descriptions.Item>
                            <Descriptions.Item label="Aktifitas Fisik ">{pfisik && pfisik.aktifitasfisik}</Descriptions.Item>
                            <Descriptions.Item label="Status Hamil ">{pfisik && pfisik.statushamil}</Descriptions.Item>
                            <Descriptions.Item label="Detak Jantung ">{pfisik && pfisik.detakjantung}</Descriptions.Item>
                            <Descriptions.Item label="Triage ">{pfisik && pfisik.triage}</Descriptions.Item>
                            <Descriptions.Item label="Keterangan Skala Nyeri ">{pfisik && pfisik.skalanyeri}</Descriptions.Item>
                            {/* <Descriptions.Item label="skalanyeriangka ">{pfisik && pfisik.skalanyeriangka}</Descriptions.Item> */}
                            <Descriptions.Item label="Skala Nyeri ">
                                <div style={style}>
                                    <Slider max={10} vertical marks={marksSkalaNyeri} value={pfisik && pfisik.skalanyeriangka} />
                                </div>
                                <br />
                                <br />
                            </Descriptions.Item>

                        </Descriptions>

                        <_TitleBar label="Riwayat Penyakit" />
                        <Descriptions
                            bordered size={"small"} column={3} contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                            labelStyle={{ textAlign: "right" }}>
                            <Descriptions.Item label="RPS ">{detail.riwayatpenyakit && detail.riwayatpenyakit.rps}</Descriptions.Item>
                            <Descriptions.Item label="RPD ">{detail.riwayatpenyakit && detail.riwayatpenyakit.rpd}</Descriptions.Item>
                            <Descriptions.Item label="RPK ">{detail.riwayatpenyakit && detail.riwayatpenyakit.rpk}</Descriptions.Item>
                        </Descriptions>

                        <_TitleBar label="Alergi" />
                        <Descriptions
                            bordered size={"small"} column={3} contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                            labelStyle={{ textAlign: "right" }}>
                            <Descriptions.Item label="Obat ">{detail.alergipasien && detail.alergipasien.obat}</Descriptions.Item>
                            <Descriptions.Item label="Makanan ">{detail.alergipasien && detail.alergipasien.makanan}</Descriptions.Item>
                            <Descriptions.Item label="Lainnya ">{detail.alergipasien && detail.alergipasien.lainnya}</Descriptions.Item>
                        </Descriptions>

                        <_TitleBar label="Lainnya" />
                        <Descriptions
                            bordered size={"small"} column={3} contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                            labelStyle={{ textAlign: "right" }}>
                            <Descriptions.Item label="Edukasi ">{detail.lainnya && detail.lainnya.edukasi}</Descriptions.Item>
                            <Descriptions.Item label="Terapi ">{detail.lainnya && detail.lainnya.terapi}</Descriptions.Item>
                            <Descriptions.Item label="Rencana ">{detail.lainnya && detail.lainnya.rencana}</Descriptions.Item>
                            <Descriptions.Item label="Deskripsi Askep ">{detail.lainnya && detail.lainnya.deskripsiaskep}</Descriptions.Item>
                            <Descriptions.Item label="Observasi ">{detail.lainnya && detail.lainnya.observasi}</Descriptions.Item>
                            <Descriptions.Item label="Biopsiko Sosial ">{detail.lainnya && detail.lainnya.biopsikososial}</Descriptions.Item>
                            <Descriptions.Item label="Keterangan ">{detail.lainnya && detail.lainnya.keterangan}</Descriptions.Item>
                            <Descriptions.Item label="Merokok ">{detail.lainnya && detail.lainnya.merokok}</Descriptions.Item>
                            <Descriptions.Item label="Konsumsi Alkohol ">{detail.lainnya && detail.lainnya.konsumsialkohol}</Descriptions.Item>
                            <Descriptions.Item label="Kurang Sayur / Buah ">{detail.lainnya && detail.lainnya.kurangsayurbuah}</Descriptions.Item>
                        </Descriptions>



                    </TabPane>

                    <TabPane tab="Diagnosa" key="1">
                        {/* <_TitleBar label="Diagnosa" /> */}

                        <Table
                            rowKey="norec_pp"
                            pagination={{ position: ['bottomCenter'], pageSize: "100" }}
                            columns={columns}
                            // loading={pr.loading || loading}
                            scroll={{ x: 800, y: 800 }}
                            dataSource={diagnosa}
                        />
                    </TabPane>
                    <TabPane tab="Resep / Obat" key="2">
                        {dataResep.length ? dataResep.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <_Row>
                                        <_Col sm={1} />
                                        <_Col sm={{ span: 11 }}>
                                            <_Row>
                                                <_Text sm={3} label="No. Resep" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.noresep} />

                                                <_Text sm={3} label="Penulis Resep" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.penulisresep} />

                                                <_Text sm={3} label="Prioritas" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.statusprioritas} />

                                                <_Text sm={3} label="Tanggal" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.tglresep} />

                                                <_Text sm={3} label="Depo" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.depo} />

                                                <_Text sm={3} label="Alergi Obat" mb="1px" align="right" />
                                                <_Input disabled mb="0px" sm={9} defaultValue={item.alergiobat} />

                                            </_Row>
                                        </_Col>
                                        <_Col>
                                            <p> Data Obat </p>
                                            <Table
                                                size="small"
                                                rowKey="norec_rpd"
                                                pagination={{ position: ['bottomCenter'], pageSize: "5" }}
                                                columns={columnsResep}
                                                scroll={{ x: 800, y: 800 }}
                                                dataSource={item.detail}
                                            />
                                        </_Col>
                                    </_Row>
                                </div>
                            )
                        }) : <Empty description={"tidak ada resep ..."} />}

                    </TabPane>
                </Tabs>
            </Drawer>

        </div>
    )
}

export default RiwayatKunjungan

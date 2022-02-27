import React, { useEffect, useState } from 'react'
// import { ubahText } from '../../../Services/Crypto'
// import { DivCol, _Button, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
// import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
// import DetailPasien from '../../Pasien/DetailPasien'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse } from 'antd';
import { BackwardFilled, CloseCircleOutlined, MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, PrinterFilled, PrinterOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
import { ubahText } from '../../../../../Services/Crypto';
import { DivCol, _Button, _Input, _Number, _RadioGroup, _Select, _Switch, _Text, _TitleBar } from '../../../../../Services/Forms/Forms';
import { _Col, _Row } from '../../../../../Services/Forms/LayoutBootstrap';
import { _Toastr } from '../../../../../Services/Toastr/Notify/_Toastr';
import LayoutAnt from '../../../../Layout/LayoutAnt';


function TempInputPelayananDiLab(pr) {
    const kanan = { marginRight: "-15px" }
    const [detailProduk, setdetailProduk] = useState({})
    const getHarga = (ii, jj, e) => {

        // console.log(e.target.value)
        // alert(detailProduk.hargasatuan)
        let data = pr.formRef.current
        var details = data.getFieldValue("detail")
        var hargasatuan = details[ii].hargasatuan
        // let cek = details.find(x => x.key == ii);
        // console.log(cek)
        // var hargasatuan = detailProduk.hargasatuan
        details[ii] = {
            ...details[ii],
            hargatotal: hargasatuan * e,
        }
        data.setFieldsValue({
            ...details
        });
    }

    const getHargaSatuan = (i, val) => {
        let data = pr.formRef.current
        var details = data.getFieldValue("detail")
        // var obj = pr.produk[5]
        let obj = pr.produk.find(x => x.id == parseInt(val));


        details[i] = {
            ...details[i],
            hargasatuan: obj.hargasatuan,
            jumlah: "",
            hargatotal: "",
            // hargasatuan: hargasatuan
        }
    }
    useEffect(() => {
        const d = pr.produk
    }, [])

    // const obatKosong = pr.produk ? pr.produk : [{
    //     "id": 0,
    //     "produk": "-",
    // },
    // ]

    return (
        < div style={{ background: "#096dd917", padding: "4px" }}>
            <Table borderless size="sm">
                <Form.List name="detail">
                    {(fields, { add, remove }) => (
                        <>
                            <thead style={{ background: "#40a9ffb5" }}>
                                <tr>
                                    <th width="10" style={{ textAlign: "center" }}>No</th>
                                    {/* <th style={{ textAlign: "center" }}>Jenis Kemasan</th> */}
                                    {/* <th>Racikan Ke</th> */}
                                    {/* <th>Dosis</th> */}
                                    <th>Nama Permintaan</th>
                                    <th>Jumlah</th>
                                    <th>Pelaksana</th>
                                    {/* <th>Aturan Pakai</th>
                                    <th>Keterangan</th> */}
                                    <th>Harga</th>
                                    <th></th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* <DataInputResep LoadData={pr.LoadData} dataResep={pr.dataResep} /> */}
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <tr>
                                        <td width="10" style={{ textAlign: "center" }}>
                                            {name + 1}
                                        </td>
                                        <td style={{ paddingRight: "4px" }}>
                                            <_Select option={pr.produk}
                                                name={[name, 'idproduk']} required val="id" fieldKey={[fieldKey, 'idproduk']}
                                                {...restField} caption="produk" mb="0px"
                                                onChange={(e, f) => setdetailProduk(f)}
                                                style={kanan}
                                                onSelect={(e, f) => getHargaSatuan(name, e)}
                                            />
                                        </td>

                                        <td width="50">
                                            <_Number name={[name, 'jumlah']} mb="-10px"
                                                style={kanan} format
                                                onChange={(e) => getHarga(name, restField, e)}
                                                fieldKey={[fieldKey, 'jumlah']}
                                                {...restField} required />
                                        </td>
                                        <td width="300">
                                            <_Select option={pr.pegawai}
                                                name={[name, 'idpelaksana']} fieldKey={[fieldKey, 'idpelaksana']} {...restField}
                                                val="id" caption="namalengkap" mb="0px" style={kanan} required />

                                        </td>
                                        <td width="100">
                                            <_Number name={[name, 'hargasatuan']} mb="-10px" disabled
                                                style={kanan} format value={detailProduk ? detailProduk.hargasatuan : "333"}
                                                // fieldKey={[fieldKey, 'hargasatuan']}
                                                {...restField} required />
                                        </td>
                                        <td width="5">
                                            <_Button color="orange" block icon={<RollbackOutlined />} onClick={() => remove(name)} label="Batal" />
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            <Form.Item>
                                <br />
                                <_Button block type="primary" onClick={() => add()} color="orange" title="Tambah"
                                    icon={<PlusOutlined />} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Table>
            <_Row>
                <_Button title="Simpan Ke Database" submit btnSave />
                {/* <_Button block icon={<PrinterFilled />} sm={2} title="Cetak Resep" />
                <_Button block icon={<BackwardFilled />} sm={1} title="Daftar Resep" /> */}
            </_Row>
            {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                    Simpan Resep
                </Button>
            </Form.Item> */}
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default TempInputPelayananDiLab

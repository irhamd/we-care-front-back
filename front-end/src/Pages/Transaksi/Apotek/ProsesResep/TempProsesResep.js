import React, { useEffect, useState } from 'react'
// import { ubahText } from '../../../Services/Crypto'
// import { DivCol, _Button, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
// import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
// import DetailPasien from '../../Pasien/DetailPasien'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse } from 'antd';
import { BackwardFilled, CloseCircleOutlined, MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, PrinterFilled, PrinterOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
// import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import { _Button, _Input, _Number, _Select } from '../../../../Services/Forms/Forms'
import _Autocomplete from '../../../../Services/Forms/_Autocomplete';
import { _Row } from '../../../../Services/Forms/LayoutBootstrap';

function TempProsesResep(pr) {
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
        console.log(pr.produk)
    }, [])

    // const obatKosong = pr.produk ? pr.produk : [{
    //     "id": 0,
    //     "produk": "-",
    // },
    // ]

    return (
        <>
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
                                    <th>Nama Obat</th>
                                    <th>Jumlah</th>
                                    <th>Signa / Cara Minum</th>
                                    <th>Aturan Pakai</th>
                                    <th>Keterangan</th>
                                    <th>Harga</th>
                                    <th>Total Harga</th>
                                    <th></th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* <DataInputResep LoadData={pr.LoadData} dataResep={pr.dataResep} /> */}
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <tr style={{ marginBottom :"-10px" }}> 


                                        <td width="10" style={{ textAlign: "center" }}>
                                            {/* <_Input name={[name, 'key']} fieldKey={[fieldKey, 'key']}
                                                {...restField} /> */}
                                            {fieldKey + 1}
                                        </td>
                                        {/* <td width="170" style={{ paddingRight: "4px" }}>
                                            <_Select option={pr.combobox.jeniskemasan}
                                                name={[name, 'idjeniskemasan']} required val="id" caption="jeniskemasan" mb="-9px" style={kanan}
                                            />
                                        </td>
                                        <td width="100">
                                            <_Input name={[name, 'racikanke']} mb="-10px" style={kanan}
                                                fieldKey={[fieldKey, 'racikanke']}
                                                {...restField} required />
                                        </td> */}
                                        {/* <td width="50" style={{ paddingRight: "4px" }}>
                                            <_Input name={[name, 'dosisracikan']} mb="-10px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'dosisracikan']}
                                                {...restField} required />
                                        </td> */}
                                        <td width="400" style={{ paddingRight: "4px" }}>
                                            {/* <_Autocomplete mb="-10px"
                                                name={[name, 'idproduk']}
                                                required
                                                {...restField}
                                                style={kanan}
                                                callback={setdetailProduk}
                                                route="resep/get-produk-resep-part"
                                                field="nama"
                                                search="produk"
                                            /> */}
                                            <_Select option={ pr.produk}
                                                name={[name, 'idproduk']} required val="id" fieldKey={[fieldKey, 'idproduk']}
                                                {...restField} caption="produk" mb="0px"
                                                onChange={(e, f) => setdetailProduk(f)}
                                                style={kanan}
                                                onSelect={(e, f) => getHargaSatuan(name, e)}
                                            />


                                        </td>

                                        <td width="100">
                                            <_Number name={[name, 'jumlah']} mb="0px"
                                                style={kanan} format
                                                onChange={(e) => getHarga(name, restField, e)}
                                                fieldKey={[fieldKey, 'jumlah']}
                                                {...restField} required />
                                        </td>
                                        <td width="200">
                                            <_Input name={[name, 'signa']} mb="0px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'signa']}
                                                {...restField} required />
                                        </td>
                                        <td width="300">
                                            <_Select option={pr.combobox.aturanpakai}
                                                name={[name, 'idaturanpakai']} required val="id" fieldKey={[fieldKey, 'signa']} {...restField} caption="aturanpakai" mb="0px"
                                                style={kanan}
                                            />

                                            {/* <_Input name={[name, 'idaturanpakai']} mb="-10px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'idaturanpakai']}
                                                {...restField} required /> */}
                                        </td>
                                        <td>
                                            <_Input name={[name, 'keterangan']} mb="0px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'keterangan']}
                                                {...restField} />
                                        </td>
                                        <td width="200">
                                            <_Number name={[name, 'hargasatuan']} mb="-10px" disabled
                                                style={kanan} format value={detailProduk.hargasatuan}
                                                // fieldKey={[fieldKey, 'hargasatuan']}
                                                {...restField} required />
                                        </td>
                                        <td width="150">
                                            <_Number name={[name, 'hargatotal']} mb="-10px" disabled
                                                style={kanan} format
                                                // fieldKey={[fieldKey, 'hargatotal']}
                                                {...restField} required />
                                        </td>


                                        <td width="5">
                                            <_Button color="orange" block icon={<RollbackOutlined />} onClick={() => remove(name)} label="Batal" />

                                            {/* <Button style={{ margin: "3px 0 0 5px" }} danger type="primary"
                                                onClick={() => remove(name)} size="small" icon={<StopOutlined />} /> */}
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            <Form.Item>
                                <_Button type="primary" onClick={() => add()} label="Tambah" color="green"
                                    icon={<PlusOutlined />}>  Tambah </_Button>
                                <br />
                                <br />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Table>
            <_Row>
                <_Button block sm={2} title="Simpan Ke Database" submit btnSave />
                <_Button block icon={<PrinterFilled />} sm={2} title="Cetak Resep" />
                <_Button block icon={<BackwardFilled />} sm={1} title="Daftar Resep" />
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
        </>
    )
}

export default TempProsesResep

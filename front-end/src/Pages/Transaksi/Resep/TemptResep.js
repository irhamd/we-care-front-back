import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ubahText } from '../../../Services/Crypto'
import { DivCol, _Button, _Input, _Number, _Select, _Switch, _Text, _TitleBar } from '../../../Services/Forms/Forms'
import { _Col, _Row } from '../../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../../Layout/LayoutAnt'
import DetailPasien from '../../Pasien/DetailPasien'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse } from 'antd';
import { CloseCircleOutlined, MinusCircleOutlined, PlayCircleTwoTone, PlusOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
import _Autocomplete from '../../../Services/Forms/_Autocomplete'
import _Api from '../../../Services/Api/_Api'
import DataInputResep from './DataInputResep'

function TemptResep(pr) {
    const kanan = { marginRight: "-15px" }
    const [detailProduk, setdetailProduk] = useState({})
    const getHarga = (ii, jj, e) => {
        let j = (ii - 1)
        // let i = j < 0 ? 0 : j
        let i = j < 0 ? 0 : j

        // console.log(e.target.value)
        // alert(detailProduk.hargasatuan)
        let data = pr.formRef.current
        var details = data.getFieldValue("detail")
        console.log(details)
        var hargasatuan = detailProduk.hargasatuan
        details[ii] = {
            ...details[ii],
            hargatotal: hargasatuan * e,
            hargasatuan: hargasatuan
        }
        data.setFieldsValue({
            ...details
        });
    }

    return (
        <>
            <Table borderless size="sm">
                <Form.List name="detail">
                    {(fields, { add, remove }) => (
                        <>
                            <thead style={{ background: "#40a9ffb5" }}>
                                <tr>
                                    <th width="10" style={{ textAlign: "center" }}>No</th>
                                    {/* <th style={{ textAlign: "center" }}>Jenis Kemasan</th>
                                    <th>Racikan Ke</th> */}
                                    {/* <th>Dosis</th> */}
                                    <th>Nama Obat</th>
                                    <th>Jumlah</th>
                                    <th>Signa</th>
                                    <th>Aturan Pakai</th>
                                    <th>Cara Minum</th>
                                    <th>Keterangan</th>
                                    <th>Harga</th>
                                    <th>Total Harga</th>
                                    <th></th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <DataInputResep LoadData={pr.LoadData} dataResep={pr.dataResep} />
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <tr>
                                        {/* <td> <_Input name={[name, 'key']} defaultValue={key} value={key} fieldKey={[fieldKey, 'key']}
                                            {...restField} />  </td> */}
                                        <td width="10" style={{ textAlign: "center" }}> {name + 1} </td>
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
                                                {...restField} />
                                        </td> */}
                                        <td width="400" style={{ paddingRight: "4px" }}>
                                            <_Autocomplete mb="-10px"
                                                name={[name, 'idproduk']}
                                                required
                                                {...restField}
                                                style={kanan}
                                                callback={setdetailProduk}
                                                route="resep/get-produk-resep-part"
                                                field="nama"
                                                search="produk"
                                            />
                                        </td>

                                        <td width="100">
                                            <_Number name={[name, 'jumlah']} mb="-10px"
                                                style={kanan} format
                                                onChange={(e) => getHarga(name, restField, e)}
                                                fieldKey={[fieldKey, 'jumlah']}
                                                {...restField} required />
                                        </td>
                                        <td width="100">
                                            <_Input name={[name, 'signa']} mb="-10px"
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
                                            <_Input name={[name, 'caraminum']} mb="-10px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'caraminum']}
                                                {...restField} />
                                        </td>
                                        <td>
                                            <_Input name={[name, 'keterangan']} mb="-10px"
                                                style={kanan}
                                                fieldKey={[fieldKey, 'keterangan']}
                                                {...restField} />
                                        </td>
                                        <td width="100">
                                            <_Number name={[name, 'hargasatuan']} mb="-10px" // disabled
                                                style={kanan} format value={detailProduk.hargasatuan}
                                                // fieldKey={[fieldKey, 'hargasatuan']}
                                                {...restField} required />
                                        </td>
                                        <td width="150">
                                            <_Number name={[name, 'hargatotal']} mb="-10px" // disabled
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
                                <br />
                                <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                    Tambah
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Table>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Simpan Resep
                </Button>
                {/* <_Switch titleCheck="Ya" titleUnCheck="Tidak" onChange={(e, f) => console.log(f.target.firstChild.data)} /> */}
            </Form.Item>
            <br />
            <br />
            <br />
            <br />
        </>
    )
}

export default TemptResep

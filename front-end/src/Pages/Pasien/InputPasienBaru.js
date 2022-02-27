import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Row, Card, Spin, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DivCol, _Input, _Input1, _Search, _Select, _TitleBar, _Date, _Label, _Switch, _Button, _RadioGroup } from '../../Services/Forms/Forms';
import LayoutAnt from '../Layout/LayoutAnt';
import { Col } from 'react-bootstrap';
import _Api from '../../Services/Api/_Api';
import moment from 'moment';
import _Autocomplete from '../../Services/Forms/_Autocomplete';
import { MaskedInput } from 'antd-mask-input';
import _AutocompleteRev from '../../Services/Forms/_AutocompleteRev';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import ShowWebcam from '../../Services/Webcam/ShowWebcam';

function InputPasienBaru(pr) {
    const [agama, setagama] = useState([])
    const [kelompokPasien, setkelompokPasien] = useState([])
    const [pendidikan, setpendidikan] = useState([])
    const [statusperkawinan, setstatusperkawinan] = useState([])
    const [golongandarah, setgolongandarah] = useState([])
    const [penjamin, setpenjamin] = useState([])
    const [jenispasien, setjenispasien] = useState([])
    const [warganegara, setwarganegara] = useState([])
    const [pangkat, setpangkat] = useState([])
    const [bodyPasien, setbodyPasien] = useState({})
    const [bodyAlamat, setbodyAlamat] = useState({})
    const [dataKecamatan, setdataKecamatan] = useState([])
    const [bodyDomisili, setbodyDomisili] = useState({})
    const [pekerjaan, setpekerjaan] = useState({})
    const [fotoPasien, setFotoPasien] = useState("")
    const [obj, setObj] = useState(null)
    const [wni, setwni] = useState(1)

    const [loading, setloading] = useState(false)

    const [jeniskelamin] = useState([
        {
            "id": 1,
            "jeniskelamin": "L"
        },
        {
            "id": 2,
            "jeniskelamin": "P"
        },
    ])

    const comboBox = () => {
        _Api.get("pasien/compo-registrasi-pasien").then(res => {
            // console.log(res.data)
            setpekerjaan(res.data.pekerjaan)
            setpangkat(res.data.pangkat)
            setagama(res.data.agama)
            setpendidikan(res.data.pendidikan)
            setstatusperkawinan(res.data.statusperkawinan)
            setgolongandarah(res.data.golongandarah)
            // setjeniskelamin(res.data.jeniskelamin)
            setkelompokPasien(res.data.kelompokpasien)
            setpenjamin(res.data.penjamin)
            setjenispasien(res.data.jenispasien)
        })
    }

    useEffect(async () => {
        await comboBox()
    }, [])

    const setFoto = (src) => {
        setFotoPasien(src)
    }

    const handleChange = (field) => (e) => {
        let isMoment = e._isAMomentObject && e._isAMomentObject
        setbodyPasien({
            ...bodyPasien,
            "rt" : "0",
            "rw" : "0",
            "instansipekerjaan": "Rumah Sakit Kota Mataram",
            "idpasien": "",
            "statuskeluarga": {
                "id": 3,
                "statuskeluarga": "Kepala Keluarga"
            },
            "pekerjaan": {
                "id": 1,
                "pekerjaan": "Tidak Bekerja"
            },

            "kebangsaan": {
                "id": wni,
                "kebangsaan": "WNI"
            },
            [field]: isMoment ? moment(e).format('YYYY-MM-DD') : e.target.value
        });
    };
    const changeSwitch = (e) => {
        setwni(wni ? 1 : 2)
    };

    const handleChangeAlamat = (field) => (e) => {
        let isMoment = e._isAMomentObject && e._isAMomentObject
        setbodyAlamat({
            ...bodyAlamat,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD') : e.target.value
        });
    };

 

    const changeSelect = (field, obj) => (e) => {
        setbodyPasien({
            ...bodyPasien,
            [field]: obj[e]
        });
    };

 

    const changeAutocompleteAlamat = (field, id, row) => (e, f) => {
        setbodyAlamat({
            ...bodyAlamat,
            [field]: {
                [id]: f && f.value, [row]: f && f.children
            }
        });
    };

 
 

    const savePasien = () => {
        setloading(true)
        const object = {
            "pasien": bodyPasien,
            "alamat": bodyAlamat,
            "domisili": bodyAlamat,
            "fotoPasien": fotoPasien
        }
        _Api.post("/pasien/save-pasien-baru", object).then(res => {
            setloading(false)
            _Toastr.success(res.data.message)
            pr.onClose()
        }).catch(err => {
            _Toastr.error(err.response.data.error)
            setloading(false)

        })


    }
    return (
        <Form layout="vertical" onFinish={savePasien} style={{ marginBottom: "10%" }}>
            {/* <p> {bodyPasien.foto} </p> */}
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm>
                            <_Search required onChange={handleChange('noidentitas')} label="NIK" />
                        </Col>
                        <Col sm>
                            {/* <_Input label="Jenis Pasien" onChange={handleChange('id_jenispasien')} /> */}
                            <_Select option={jenispasien} label="Jenis Pasien" val="id" caption="jenispasien"
                                    onChange={changeSelect("id_jenispasien", jenispasien)}
                                />

                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <_Select option={penjamin} label="Penjamin" val="id" caption="penjamin"
                                onChange={changeSelect("penjamin", penjamin)}
                            />
                        </Col>
                        <Col>
                            <_Input onChange={handleChange('nopenjamin')} label="Nomor Penjamin" />
                        </Col>
                        <Col>
                            <_Input onChange={handleChange('nokartu')} label="Nomor Kartu" />
                        </Col>

                    </Row> */}
                    <Row>
                        <Col>
                            <_Input label="No. NRP" onChange={handleChange('nrp')} />
                        </Col>
                        <Col >
                            <_Input onChange={handleChange('tempatlahir')} required label="Tempat Lahir" />
                        </Col>
                        <Col sm={4}>
                            <_Date onChange={handleChange('tgllahir')} label="Tanggal Lahir ( dd-mm-yyyy )" format="DD-MM-YYYY" />
                            {/* <MaskedInput mask="1111-11-11" placeholder="YYY" name="card" size="20"  /> */}
                        </Col>
                    </Row>
                    <Col >
                        <_Input onChange={handleChange('namapasien')} label="Nama Lengkap" />
                    </Col>

                    <Row>
                        {/* <_Label label="Identitas Lainnya" /> */}
                        {/* <Col sm={3}>
                            <_Input onChange={handleChange('nocmlama')} label="No. RM Lama" />
                        </Col> */}
                        <Col sm={4}>
                            <_Input onChange={handleChange('nohp')} label="Nomor HP" />
                        </Col>
                        <Col>
                            <_Select option={pangkat} label="Pangkat" val="id" caption="pangkat"
                                onChange={changeSelect("pangkat", pangkat)}
                                />
                            </Col>

                        <Col>
                            <_Input onChange={handleChange('nip')} label="NIP" />
                        </Col>

                        <Col sm={12}>
                            <_Label label={"Alamat Sesuai KTP"} />
                        </Col>
                        <Col sm={12}>
                            <_Input multiline label="Alamat Lengkap *" onChange={handleChangeAlamat('alamat')} />
                        </Col>
                        <Row>
                            <Col sm={8}>
                                <_Input label="Dusun *" onChange={handleChangeAlamat('dusun')} />
                            </Col>
                            <Col sm={2}>
                                <_Input label="RT *" onChange={handleChangeAlamat('rt')} defaultValue="0" />
                            </Col>
                            <Col sm={2}>
                                <_Input label="RW" onChange={handleChangeAlamat('rw')} defaultValue="0" />
                            </Col>
                        </Row>
                        <Col sm={12}>
                            <_AutocompleteRev
                                route="pasien/get-desakelurahan"
                                label="Desa / Kelurahan"
                                field="nama"
                                name="desakelurahan"
                                search="desakelurahan"
                                onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                            />
                        </Col>
                        <Col>
                            <_Autocomplete route="pasien/get-kecamatan"
                                label="Kecamatan"
                                field="nama"
                                name="kecamatan"
                                callback={setdataKecamatan}
                                search="kecamatan"
                                onChange={changeAutocompleteAlamat('kecamatan', 'id', 'kecamatan')}
                            />
                        </Col>
                        <Col>
                            <_AutocompleteRev route="pasien/get-kotakabupaten"
                                label="Kabupaten / Kota"
                                field="nama"
                                name="kotakabupaten"
                                search="kotakabupaten"
                                onChange={changeAutocompleteAlamat('kotakabupaten', 'id', 'kotakabupaten')}
                            />
                        </Col>
                        <Col sm={10}>
                            <_AutocompleteRev route="pasien/get-propinsi"
                                label="Propinsi"
                                field="nama"
                                name="propinsi"
                                search="propinsi"
                                onChange={changeAutocompleteAlamat('propinsi', 'id', 'propinsi')}
                            />
                        </Col>

 
                        <Col sm={2}>
                            <_Switch label="WNI" defaultChecked onChange={changeSwitch} />
                        </Col>
                        <Col sm={6} style={{ marginBottom:"200px" }}/>
                        <_Button label="Simpan Ke Database" submit btnSave sm={6} block />

                        {/* <Col sm={7}>
                            <_Input onChange={handleChange('namaayah')} label="Nama Ayah" />
                        </Col>
                        <Col sm={6}>
                            <_Input onChange={handleChange('namaibu')} label="Nama Ibu" />
                        </Col> */}
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <Col>
                                <_Select option={jeniskelamin} label="Jenis Kelamin" val="id" caption="jeniskelamin"
                                    onChange={(e, f) => setbodyPasien({
                                        ...bodyPasien,
                                        jeniskelamin: f.children[1]
                                    })}
                                />
                            </Col>
                            <Col>
                                <_Select option={golongandarah} label="Golongan Darah" val="id" caption="golongandarah"
                                    onChange={changeSelect("golongandarah", golongandarah)}
                                />
                            </Col>
                            <Col>
                                <_Select option={statusperkawinan} label="Status Perkawinan" val="id" caption="statusperkawinan"
                                    onChange={changeSelect("statusperkawinan", statusperkawinan)}
                                />
                            </Col>
                            <Col>
                                <_Select option={pendidikan} label="Pendidikan" val="id" caption="pendidikan"
                                    onChange={changeSelect("pendidikan", pendidikan)}
                                />
                            </Col>
                            <Col>
                                <_Select option={agama} label="Agama" val="id" caption="agama"
                                    onChange={changeSelect("agama", agama)}
                                />
                            </Col>
                        </Col>
                        <Col >
                            <ShowWebcam setFoto={setFoto} />
                        </Col>

                    </Row>
                </Col>
                <br/>
         

                {/* <Col sm={6}>
                    <Col sm={12}>
                        <_Label label={"Alamat Domisili "} />
                    </Col>
                    <Col sm={6}>
                        <_Switch defaultChecked label="Alamat KTP = Domisili" ></_Switch>
                    </Col>
                    <Col sm={12}>
                        <_Input onChange={handleChangeDomisili('alamat')} multiline label="Alamat Lengkap" />
                    </Col>
                    <Row>
                        <Col sm={8}>
                            <_Input label="Dusun" onChange={handleChangeDomisili('dusun')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RT" onChange={handleChangeDomisili('rt')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RW" onChange={handleChangeDomisili('rw')} />
                        </Col>
                    </Row>
                    <Col sm={9}>
                        <_Select option={pendidikan} label="Kelurahan" val="id" caption="pendidikan"
                            onChange={changeSelect("pendidikan", pendidikan)}
                        />
                    </Col>
                    <Col sm={7}>
                        <_Select option={pendidikan} label="Kecamatan" val="id" caption="pendidikan"
                            onChange={changeSelect("pendidikan", pendidikan)}
                        />
                    </Col>
                    <Col sm={11}>
                        <_Select option={pendidikan} label="Kabupaten / Kota" val="id" caption="pendidikan"
                            onChange={changeSelect("pendidikan", pendidikan)}
                        />
                    </Col>
                    <Row>
                        <Col sm={10}>
                            <_Select option={pendidikan} label="Propinsi / Kota" val="id" caption="pendidikan"
                                onChange={changeSelect("pendidikan", pendidikan)}
                            />
                        </Col>
                        <Col sm={2}>
                            <_Switch label="WNI" defaultChecked  ></_Switch>

                        </Col>
                    </Row>
                </Col> */}
                {/* <Button type="primary" htmlType="submit" style={{ marginTop: "23px", marginBottom: "150px", paddingTop: "0px" }} loading={loading} >
                    Simpan Data
                </Button> &nbsp; */}
 
            </Row>
        </Form>
    )
}

export default InputPasienBaru

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Row, Card, Spin, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DivCol, _Input, _Input1, _Search, _Select, _TitleBar, _Date, _Label, _Switch } from '../../Services/Forms/Forms';
import LayoutAnt from '../Layout/LayoutAnt';
import { Col } from 'react-bootstrap';
import _Api from '../../Services/Api/_Api';
import moment from 'moment';
import _Autocomplete from '../../Services/Forms/_Autocomplete';
import { MaskedInput } from 'antd-mask-input';
import _AutocompleteRev from '../../Services/Forms/_AutocompleteRev';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';

function InputPasienBaru() {
    const [agama, setagama] = useState([])
    const [kelompokPasien, setkelompokPasien] = useState([])
    const [pendidikan, setpendidikan] = useState([])
    const [statusperkawinan, setstatusperkawinan] = useState([])
    const [golongandarah, setgolongandarah] = useState([])
    const [penjamin, setpenjamin] = useState([])
    const [warganegara, setwarganegara] = useState([])
    const [bodyPasien, setbodyPasien] = useState({})
    const [bodyAlamat, setbodyAlamat] = useState({})
    const [bodyDomisili, setbodyDomisili] = useState({})
    const [pekerjaan, setpekerjaan] = useState({})
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
            setagama(res.data.agama)
            setpendidikan(res.data.pendidikan)
            setstatusperkawinan(res.data.statusperkawinan)
            setgolongandarah(res.data.golongandarah)
            // setjeniskelamin(res.data.jeniskelamin)
            setkelompokPasien(res.data.kelompokpasien)
            setpenjamin(res.data.penjamin)
        })
    }

    useEffect(async () => {
        await comboBox()
    }, [])

    const handleChange = (field) => (e) => {
        let isMoment = e._isAMomentObject && e._isAMomentObject
        setbodyPasien({
            ...bodyPasien,
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

    const handleChangeDomisili = (field) => (e) => {
        let isMoment = e._isAMomentObject && e._isAMomentObject
        setbodyDomisili({
            ...bodyDomisili,
            [field]: isMoment ? moment(e).format('YYYY-MM-DD') : e.target.value
        });
    };

    const changeSelect = (field, obj) => (e) => {
        setbodyPasien({
            ...bodyPasien,
            [field]: obj[e]
        });
    };

    const changeSelectAlamat = (field, obj) => (e) => {
        setbodyAlamat({
            ...bodyAlamat,
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

    const changeSelectDomisili = (field, obj) => (e) => {
        setbodyDomisili({
            ...bodyDomisili,
            [field]: obj[e]
        });
    };

    const handleChangeDate = field => (e, f) => {
        // console.log(e)
        // console.log(f)
        //   setbodyPasien({
        //     ...bodyPasien,
        //     [field]: tgl
        // });
    };

    const savePasien = () => {
        setloading(true)
        const object = {
            "pasien": bodyPasien,
            "alamat": bodyAlamat,
            "domisili": bodyAlamat,
        }
        _Api.post("/pasien/save-pasien-baru", object).then(res => {
            setloading(false)
            _Toastr.success(res.data.message)
        }).catch(err => {
            _Toastr.error(err.response.data.error)
            setloading(false)

        })


    }
    return (
        <Form layout="vertical" onFinish={savePasien} style={{ marginBottom: "10%" }}>
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col sm>
                            <_Search name={['pasien','noktp']} label="NIK" />
                        </Col>
                        <Col sm>
                            <_Input label="No. KK" name={['pasien','nokk']} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <_Select option={penjamin} label="Penjamin" val="id" caption="penjamin"
                                // onChange={changeSelect("penjamin", penjamin)} 
                                name={['pasien','nokk']}
                            />
                        </Col>
                        <Col>
                            <_Input onChange={handleChange('nopenjamin')} label="Nomor Penjamin" />
                        </Col>
                        <Col>
                            <_Input label="NRP" onChange={handleChange('nrp')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <_Input onChange={handleChange('tempatlahir')} label="Tempat Lahir" />
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
                        <_Label label="Identitas Lainnya" />
                        {/* <Col sm={3}>
                            <_Input onChange={handleChange('nocmlama')} label="No. RM Lama" />
                        </Col> */}
                        <Col sm={4}>
                            <_Input onChange={handleChange('nohp')} label="Nomor HP" />
                        </Col>
                        <Col sm={5}>
                            <_Input onChange={handleChange('email')} label="Email" />
                        </Col>
                        <Col sm={7}>
                            <_Input onChange={handleChange('namaayah')} label="Nama Ayah" />
                        </Col>
                        <Col sm={6}>
                            <_Input onChange={handleChange('namaibu')} label="Nama Ibu" />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <Col>
                                <_Select option={jeniskelamin} label="Jenis Kelamin" val="id" caption="jeniskelamin"
                                    onChange={changeSelect("jeniskelamin", jeniskelamin)}
                                    // onChange={handleChange('jeniskelaminfk')}
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
                        <Col md={{ span: 4, offset: 1 }} style={{ background: "#bfbfbf", marginRight: "-20px" }}>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Col sm={12}>
                        <_Label label={"Alamat Sesuai KTP"} />
                    </Col>
                    <Col sm={12}>
                        <_Input multiline label="Alamat Lengkap" onChange={handleChangeAlamat('alamat')} />
                    </Col>
                    <Row>
                        <Col sm={8}>
                            <_Input label="Dusun" onChange={handleChangeAlamat('dusun')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RT" onChange={handleChangeAlamat('rt')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RW" onChange={handleChangeAlamat('rw')} />
                        </Col>
                    </Row>
                    <Col sm={9}>
                        <_AutocompleteRev
                            route="pasien/get-desakelurahan"
                            label="Desa / Kelurahan"
                            field="nama"
                            search="desakelurahan"
                            onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                        />
                    </Col>
                    <Col sm={7}>
                        <_AutocompleteRev route="pasien/get-kecamatan"
                            label="Kecamatan"
                            field="nama"
                            search="kecamatan"
                            onChange={changeAutocompleteAlamat('kecamatan', 'id', 'kecamatan')}
                        />
                    </Col>
                    <Col sm={11}>
                        <_AutocompleteRev route="pasien/get-kotakabupaten"
                            label="Kabupaten / Kota"
                            field="nama"
                            search="kotakabupaten"
                            onChange={changeAutocompleteAlamat('kotakabupaten', 'id', 'kotakabupaten')}
                        />
                    </Col>
                    <Row>
                        <Col sm={10}>
                            <_AutocompleteRev route="pasien/get-propinsi"
                                label="Propinsi"
                                field="nama"
                                search="propinsi"
                                onChange={changeAutocompleteAlamat('propinsi', 'id', 'propinsi')}
                            />
                        </Col>
                        <Col sm={2}>
                            <_Switch label="WNI" defaultChecked onChange={changeSwitch} />
                        </Col>
                    </Row>

                </Col>
                <Col sm={6}>
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
                </Col>
                <Button type="primary" htmlType="submit" style={{ marginTop: "23px", paddingTop: "0px" }} loading={loading} >
                    Simpan Data
                </Button> &nbsp;
            </Row>
        </Form>
    )
}

export default InputPasienBaru

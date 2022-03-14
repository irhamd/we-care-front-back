import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Row, Card, Spin, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DivCol, _Input, _Input1, _Search, _Select, _TitleBar, _Date, _Label, _Switch, _Button, _RadioGroup, _BR } from '../../Services/Forms/Forms';
import LayoutAnt from '../Layout/LayoutAnt';
import { Col } from 'react-bootstrap';
import _Api from '../../Services/Api/_Api';
import moment from 'moment';
import _Autocomplete from '../../Services/Forms/_Autocomplete';
import { MaskedInput } from 'antd-mask-input';
import _AutocompleteRev from '../../Services/Forms/_AutocompleteRev';
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr';
import ShowWebcam from '../../Services/Webcam/ShowWebcam';
import { _Col, _Row } from '../../Services/Forms/LayoutBootstrap';

function EditDataPasien(pr) {
    const [agama, setagama] = useState([])
    const [kelompokPasien, setkelompokPasien] = useState([])
    const [pendidikan, setpendidikan] = useState([])
    const [statusperkawinan, setstatusperkawinan] = useState([])
    const [golongandarah, setgolongandarah] = useState([])
    const [penjamin, setpenjamin] = useState([])
    const [editDataPasien, seteditDataPasien] = useState({})
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

    const [formPasien] = Form.useForm();
    const [formAlamat] = Form.useForm();

    const [loading, setloading] = useState(false)

    const [jeniskelamin] = useState([
        {
            "id": "L",
            "jeniskelamin": "L"
        },
        {
            "id": "P",
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

    // =================================================================================================================================================
    const loadDataPasien = () => {
        if (pr.datapasien){
            _Api.get("pasien/get-data-pasien/"+pr.datapasien.nocmfk).then(res => {
                formPasien.setFieldsValue({
                    ...res.data,
                    tgllahir: moment(res.data.tgllahir)
                })
            })
        }
    }

    useEffect(() => {
        loadDataPasien()
        comboBox()
    }, [pr.datapasien])

    // =================================================================================================================================================


    const setFoto = (src) => {
        setFotoPasien(src)
    }

   
    const changeSwitch = (e) => {
        setwni(wni ? 1 : 2)
    };
 




    const savePasien = () => {
        // formAlamat.submit()
        formPasien.submit() 
        // var alamat = formAlamat.getFieldsValue()
        var pasien = formPasien.getFieldsValue()
        // console.log('alamat', alamat)
        console.log('pasien', pasien)
       

        setloading(true)
        const object = {
            "pasien": { id_pasien : '', ...pasien, tgllahir : moment(pasien.tgllahir).format('YYYY-MM-DD')},
            // "alamat": alamat
            // "domisili": alamat,
            // "fotoPasien": fotoPasien
        }

        console.log(object)
        _Api.post("/pasien/save-pasien-baru-rev", object).then(res => {
            setloading(false)
            _Toastr.success(res.data.message)
            pr.onClose()
            pr.loadData()
            formPasien.resetFields() 

            // window.location.reload();
        }).catch(err => {
            // _Toastr.error(err.response.data.error)
            setloading(false)

        })


    }
    return (
        <Form.Provider>
            <Form name='pasien' layout="vertical"   form={formPasien}>
                {/* <p> {bodyPasien.foto} </p> */}
                <_Row>
                    <_Col sm={7}>
                        <_Row>
                            <_Search maxLength={16} required name='noidentitas' label="NIK" sm={6} />
                            <_Select option={jenispasien} label="Jenis Pasien" val="id" caption="jenispasien" sm={6} name="id_jenispasien" />
                        </_Row>
                        <_Row>
                            <_Select option={pangkat} label="Pangkat" val="id" sm={5} caption="pangkat" name="pangkatfk" />
                            <_Input label="No. NRP" name="nrp" sm={7} />

                        </_Row>
                        <_Row>
                            <_Input name='tempatlahir' required label="Tempat Lahir" sm={8} />
                            <_Date name="tgllahir" label="Tanggal Lahir ( dd-mm-yyyy )" format={"DD-MM-YYYY"} sm={4} />
                        </_Row>
                        <_Input name="namapasien" label="Nama Lengkap" />
                        <_Row>
                            <_Select option={agama} label="Agama" val="agama" caption="agama" name="agama" sm={7} />
                            <_Input maxLength={13} name='nobpjs' label="No. BPJS" sm={5} />
                        </_Row>
                        <_Row>
                            <_Input sm={6} name='nohp' label="Nomor HP" maxLength={13} />
                            <_Input name='nip' label="NIP" sm={6} />
                        </_Row>
                        <_Row>
                            <_Select option={jeniskelamin} label="Jenis Kelamin" val="jeniskelamin" caption="jeniskelamin" name="jeniskelamin" sm={3} />
                            <_Select option={golongandarah} label="Golongan Darah" val="golongandarah" caption="golongandarah" name="golongandarah" sm={3} />
                            <_Select option={statusperkawinan} label="Status Perkawinan" val="statusperkawinan" caption="statusperkawinan" name="statusperkawinan" sm={3} />
                            <_Select option={pendidikan} label="Pendidikan" val="pendidikan" caption="pendidikan" name="pendidikan" sm={3} />
                        </_Row>
                    </_Col>
                    <_Col sm={4}>
                    <ShowWebcam setFoto={setFoto} />
                    
                    </_Col>

                </_Row>
            </Form>
            <Form name='alamat' form={ formAlamat } layout='vertical' >
                <_Row>
                        <_Label label={"Alamat Sesuai KTP"} />
                        <_Input multiline label="Alamat Lengkap *" name ='alamat' />
                        <Col sm={4}>
                            <_Input label="Dusun *" name='dusun' />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RT *"  name='rt'   defaultValue="0" />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RW" name='rw' defaultValue="0"  />
                        </Col>
                        <Col sm={4}>
                        <_AutocompleteRev
                            route="pasien/get-desakelurahan"
                            label="Desa / Kelurahan"
                            field="nama"
                            name="desakelurahan"
                            search="desakelurahan"
                            // onChange={changeAutocompleteAlamat('desakelurahan', 'id', 'desakelurahan')}
                        />
                    </Col>
                   
                    <Col sm={3}>
                        <_Autocomplete route="pasien/get-kecamatan"
                            label="Kecamatan"
                            field="nama"
                            name="kecamatan"
                            callback={setdataKecamatan}
                            search="kecamatan"
                            // onChange={changeAutocompleteAlamat('kecamatan', 'id', 'kecamatan')}
                        />
                    </Col>
                    <Col sm={4}>
                        <_AutocompleteRev route="pasien/get-kotakabupaten"
                            label="Kabupaten / Kota"
                            field="nama"
                            name="kotakabupaten"
                            search="kotakabupaten"
                            // onChange={changeAutocompleteAlamat('kotakabupaten', 'id', 'kotakabupaten')}
                        />
                    </Col>
                    <Col sm={4}>
                        <_AutocompleteRev route="pasien/get-propinsi"
                            label="Propinsi"
                            field="nama"
                            name="propinsi"
                            search="propinsi"
                            // onChange={changeAutocompleteAlamat('propinsi', 'id', 'propinsi')}
                        />
                    </Col>


                    <Col sm={1}>
                        <_Switch label="WNI" defaultChecked onChange={changeSwitch} />
                    </Col>
                   <_BR/>
                    <Col  style={{ paddingBottom: "300px" }}> <br/> </Col>
                    <_Button label="Simpan Ke Database" submit onClick={savePasien} sm={3} block />

                    {/* <Col sm={7}>
                            <_Input onChange={handleChange('namaayah')} label="Nama Ayah" />
                        </Col>
                        <Col sm={6}>
                            <_Input onChange={handleChange('namaibu')} label="Nama Ibu" />
                        </Col> */}
                </_Row>




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
                    <_Row>
                        <Col sm={8}>
                            <_Input label="Dusun" onChange={handleChangeDomisili('dusun')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RT" onChange={handleChangeDomisili('rt')} />
                        </Col>
                        <Col sm={2}>
                            <_Input label="RW" onChange={handleChangeDomisili('rw')} />
                        </Col>
                   </_Row>
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
                    <_Row>
                        <Col sm={10}>
                            <_Select option={pendidikan} label="Propinsi / Kota" val="id" caption="pendidikan"
                                onChange={changeSelect("pendidikan", pendidikan)}
                            />
                        </Col>
                        <Col sm={2}>
                            <_Switch label="WNI" defaultChecked  ></_Switch>

                        </Col>
                   </_Row>
                </Col> */}
                {/* <Button type="primary" htmlType="submit" style={{ marginTop: "23px", marginBottom: "150px", paddingTop: "0px" }} loading={loading} >
                    Simpan Data
                </Button> &nbsp; */}
            </Form>
        </Form.Provider>
    )
}

export default EditDataPasien

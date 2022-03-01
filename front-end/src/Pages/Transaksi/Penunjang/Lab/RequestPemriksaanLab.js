import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, Transfer, Form } from 'antd';
import _Api from '../../../../Services/Api/_Api';
import LayoutAnt from '../../../Layout/LayoutAnt';
import { DivCol, _Button, _Checkbox, _Input, _RadioGroup, _Switch, _Text, _TitleBar } from '../../../../Services/Forms/Forms';
import DetailPasien from '../../../Pasien/DetailPasien';
import { Col, Row } from 'react-bootstrap';
import { Cache } from '../../../../Services/Cache';
import { ubahText } from '../../../../Services/Crypto';
import DetailPasienDaftar from '../../../Pasien/DetailPasienDaftar';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../../../../Services/Route/ProtectedRoute';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { _Toastr } from '../../../../Services/Toastr/Notify/_Toastr';

// const mockData = [];
// for (let i = 0; i < 20; i++) {
//     mockData.push({
//         key: i.toString(),
//         title: `content${i + 1}`,
//         description: `description of content${i + 1}`,
//     });
// }

// const  = mockData.filter(item => +item.key > 10).map(item => item.key);

function RequestPemriksaanLab(pr) {
    const [dataLab, setdataLab] = useState({})
    const [st, setState] = useState({
        // initialData : []
    })
    const [targetKeys, setTargetKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [loading, setloading] = useState(true);

    const histori = useHistory()
    const [form] = Form.useForm();

    var data = Cache.get('pasien_pd')
    try {
        data = JSON.parse(ubahText(data))
    } catch (error) {
        histori.goBack()
    }

    const loadData = async () => {
        // lab/get-produk-blanko-lab
        _Api.get("lab/get-blanko-lab?noregistrasi=" + data.noregistrasi).then(res => {
            setdataLab(res.data)
            form.setFieldsValue(res.data)
            var arr = []
            res.data.details.map(item => {
                arr.push(item.idproduk)
            })
            setTargetKeys(arr)
            setloading(false)
        }).catch(err => {
            // setTargetKeys([])
            form.setFieldsValue({
                idpegawai: userLogin.id,
                norec_apd: data.norec_apd,
                statusprioritas: "Tidak",
            })
            setloading(false)
        })
    }



    useEffect(() => {
        // getproduk
        _Api.get("lab/get-produk-blanko-lab").then(res => {
            setState({ dataProduk: res.data, ...st })
        })
        loadData()


    }, [])


    // const useform = Form.useForm()


    const onChange = (list, direction, moveKeys) => {
        // console.log('targetKeys:', list);
        // console.log('direction:', direction);
        // console.log('moveKeys:', moveKeys);
        setTargetKeys(list);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // console.log('sourceSelectedKeys:', sourceSelectedKeys);
        // console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction, e) => {
        // console.log('direction:', direction);
        // console.log('target:', e.target);
    };
    const onFinish = (val) => {
        var detail = []
        targetKeys.map(item => {
            detail.push({
                "norec_bld": "",
                "idproduk": item,
                "jumlah": 1,
                "hargasatuan": 0,
                "hargatotal": 0
            })
        })

        let obj = { ...val, ...{ detail: detail } }
        _Api.post("lab/save-blanko-lab", obj).then(res => {
            _Toastr.success(res.data.message)
        }).catch(err => {
            _Toastr.success(err.response.data.message)

        })


    };

    return (
        <LayoutAnt>
            <DivCol pl="5px" style={{ marginLeft: "35px" }}>
                <Row>
                    <Col sm={2}>
                        <DetailPasien norm={data.nocm} />
                    </Col>

                    <Col sm={10} style={{ paddingLeft: "5px" }}>
                        {/* <_TitleBar title="Request Pemeriksaan Labolaturium" align="center" /> */}
                        <Card title={" Request Pemeriksaan Labolaturium"} size="small">

                            <DetailPasienDaftar data={data && data} />
                            <br />
                            <Form onFinish={onFinish}
                                form={form}
                            // initialValues={!dataLab && {
                            //     idpegawai: userLogin.id,
                            //     norec_apd: data.norec_apd,
                            //     statusprioritas: "Tidak",
                            // }}
                            >
                                <_Input name="idpegawai" hidden />
                                <_Input name="norec_bl" hidden />
                                <_Input name="norec_apd" hidden />
                                <Row>
                                    <Col sm={6} style={{ paddingLeft: "25px" }}>
                                        <Spin spinning={loading} >
                                            <Transfer
                                                rowKey={record => record.id}
                                                rowTitle={record => record.label}
                                                dataSource={st.dataProduk}
                                                showSearch
                                                oneWay
                                                titles={['List Permintaan', 'Rencana  Permintaan']}
                                                targetKeys={targetKeys}
                                                selectedKeys={selectedKeys}
                                                onChange={onChange}
                                                operations={['Tambah', 'Batal']}
                                                onSelectChange={onSelectChange}
                                                onScroll={onScroll}
                                                render={item => item.produk}
                                                listStyle={{ height: "500px", fontSize: "56", width: "400px", marginBottom: "40px", background: "white" }}
                                            />
                                        </Spin>
                                    </Col>
                                    <Col sm={5} style={{ paddingLeft: "25px" }}>
                                        <Card title="_ Kesimpulan / Saran" size="small">
                                            <_RadioGroup name='statusprioritas' options={[
                                                { value: "Ya", label: "Ya" },
                                                { value: "Tidak", label: "Tidak" },
                                            ]} label="Status Prioritas" sm={8} />

                                            <_Text label="Saran" mb="-10px" />
                                            <_Input multiline name="saran" />

                                        </Card>

                                        <br />
                                        <Row>

                                            <_Button sm={{ span: 4, offset: 5 }} block btnSave title="Simpan" submit />
                                            <_Button sm={3} danger block btnCancel onClick={() => histori.goBack()} title="Kembali" />
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>


                </Row>
            </DivCol>
        </LayoutAnt>
    );
}

export default RequestPemriksaanLab

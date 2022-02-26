import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { cekSession, LogOut } from '.'
import _Api from '../../Services/Api/_Api'
import { acakText } from '../../Services/Crypto'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'
import { Col, Menu, Radio, Row } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { AppstoreOutlined, KeyOutlined, MailOutlined, PoweroffOutlined, UnlockOutlined, IdcardTwoTone, SmileTwoTone, BulbTwoTone, UnlockTwoTone, UserOutlined, HighlightFilled, ImportOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Notifikasi_Error } from '../../Services/Toastr/Notify/NotifyToastr'
import { CacheHelper } from '../../Services/Cache'
import { Link } from 'react-router-dom'

import "../../_Assets/AssetLogin.css"
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'

import logoLogin from '../../_Assets/logos/logo-hitam.png'
import { _Toastr } from '../../Services/Toastr/Notify/_Toastr'
import { globalText } from '../../Services/Text/GlobalText'
// import LinearProgress from '@smui/linear-progress';
// import {LinearProgress} from '@smui/linear-progress';


function AttemptAuth() {


    const histori = useHistory();
    const [obj, setobj] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)



    const changeObj = (e) => {
        setobj({
            ...obj, [e.target.name]: e.target.value
        })
    }



    useEffect(() => {
        LogOut()
    }, [])

    const attemptLogin = () => {
        setLoading(true)
        _Api.get("/sign-in", { params: obj }).then(res => {
            const data = res.data.metadata;

            if (data.code == 200) {

                let user = JSON.stringify(res.data.response.userData);
                let token = res.data.response.X_TOKEN

                sessionStorage.setItem(globalText.x_auth_resu, acakText(user))
                sessionStorage.setItem(globalText.x_auth_user, user)
                sessionStorage.setItem(globalText.y_auth_fhdev, token)
                sessionStorage.setItem("Authorization", acakText(token))
                sessionStorage.setItem(globalText.x_auth_pegawai, res.data.tokenx)
                window.location.href = "/home";
            } else {
                _Toastr.error("Akses di tolak ...")
                setLoading(false)
                return
            }
            setError(false)
        }).catch(err => {
            setLoading(false)
            setError(true)
            _Toastr.error("Gagal terhubung ke server, Periksa jaringan anda ...")

        })
    }

    return (

        <div style={{ background: "linear-gradient(#ffffff 10%, rgb(102, 198, 236))", height: "100vh", overflow: "auto" }} >
            <h1 style={{ textAlign: "center", marginTop: "8%" }}></h1>
            <div style={{ textAlign: "center" }}>
                <p><img width="300" src={logoLogin} alt="" /></p>
                <p style={{ textAlign: "center", fontWeight: "bolder" }}> <span style={{ color: "#258fe6f7" }}> KLINIK </span> PERMATA ARTHA MEDIKA </p>

                {/* <b> Silahkan Login </b> */}
            </div>
            <Layout style={{ alignItems: "center", background: "rgb(147 215 241)", paddingTop: "30px" }}>

                <Content style={{ marginLeft: "15px" }}>
                    {/* <LinearProgress indeterminate /> */}
                    <Form onFinish={attemptLogin}
                        layout={"inline"}
                        style={{ color: "white" }}
                    >
                        <Form.Item label="Username ::" >
                            <Input style={{ width: "300px" }} prefix={<BulbTwoTone />} name="username" onChange={changeObj} />
                        </Form.Item>
                        <Form.Item label="Password ::">
                            <Input.Password style={{ width: "300px" }} prefix={<UnlockTwoTone />} name="password" onChange={changeObj} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ImportOutlined />}
                                loading={loading}

                            > Login </Button>
                        </Form.Item>
                    </Form>
                    <br />
                </Content>
            </Layout>
            <br />
            <p style={{ textAlign: "center" }}> Copyright ©2021 FHDev@team.com All Rights Reserved </p>

        </div>


    )
}

export default AttemptAuth

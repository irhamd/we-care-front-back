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
import { Col, Menu, Row } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { AppstoreOutlined, MailOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Notifikasi_Error } from '../../Services/Toastr/Notify/NotifyToastr'
import { CacheHelper } from '../../Services/Cache/Cache'
import { Link } from 'react-router-dom'

import "../../_Assets/AssetLogin.css"
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'


function AttemptAuth() {


    const handleClick = e => {
        console.log('click ', e);
    };

    const { SubMenu } = Menu;

    const histori = useHistory();
    const [obj, setobj] = useState()
    const [error, setError] = useState(false)



    const changeObj = (e) => {
        setobj({
            ...obj, [e.target.name]: e.target.value
        })
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = () => {
    };

    const onFinishFailed = () => {
    };
    useEffect(() => {
        LogOut()
    }, [])

    const attemptLogin = () => {
        _Api.post("/login", obj).then(res => {
            let user = JSON.stringify(res.data.user);
            console.log(res)
            sessionStorage.setItem('x-auth-resu', acakText(user))
            sessionStorage.setItem('x-auth-user', user)
            sessionStorage.setItem('y-auth-fhdev0012', res.data.token)
            setError(false)
            histori.push("/dashboard")
        }).catch(err => {
            setError(true)
            CacheHelper.setItem("hafizd", "wwwww")
            // CacheHelper.get("ddd")
            // CacheHelper.get("bbb")
            // CacheHelper.get("uuu")

        })
    }




    return (

        <div style={{ background: "rgb(24 144 255 / 58%)", height: "100vh", overflow: "hidden" }} >
            <h1 style={{ textAlign: "center", marginTop: "15%" }}> <b> LOGIN </b> </h1>
            <Layout style={{ background: "#001529", color: "rgb(24, 144, 255)", paddingTop: "30px" }}>

                <Content>


                    <Row >
                        <Col span={4} />
                        <Col span={2} style={{ textAlign: "right", paddingTop: "3px" }}>Username &nbsp;</Col>
                        <Col span={4}>
                            <Form>
                                <Form.Item
                                    name="username">
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Col>

                        <Col span={2} style={{ textAlign: "right", paddingTop: "3px" }}>Password &nbsp;</Col>
                        <Col span={4}>
                            <Form>
                                <Form.Item
                                    name="username">
                                    <Input.Password />
                                </Form.Item>
                            </Form>
                        </Col>

                        <Col span={1}> </Col>
                        <Col span={4}>

                            <Button
                                type="primary"
                                icon={<PoweroffOutlined />}
                                loading={true}
                            // onClick={() => this.enterLoading(1)}
                            > Login </Button>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <p style={{ textAlign: "center"}}> Copyright ©2021 FHDev@team.com All Rights Reserved </p>

        </div>


    )
}

export default AttemptAuth

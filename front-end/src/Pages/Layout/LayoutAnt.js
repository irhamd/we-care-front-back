import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, BackTop, Button, Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SyncOutlined, UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons';
import _Api from '../../Services/Api/_Api';
import _Header from './_Header';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Col, Row } from 'react-bootstrap';
import logo from "../../_Assets/logos/logohome.png"
import { Cache } from '../../Services/Cache';
function LayoutAnt(pr) {


    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;

    var profile = JSON.parse(Cache.get("profile"));

    return (
        <div>
            {/* <Row style={{background:"linear-gradient(white 40%, #66c6ec)", display: pr.hidetop && "none"}}>
                <Col style={{textAlign:"center"}}>
                    <div style={{ fontFamily: "BrothersCircus", fontSize: "28px"}}> <span style={{color:"orangered"}}> PUSKESMAS </span> <span style={{color:"rgb(0, 21, 41)"}}> DASAN AGUNG </span> </div>
                    <div style={{marginTop:"-10px", fontWeight:"bold", fontSize:"10px"}}> Jl. Gn. Lawu No.289, Dasan Agung Baru, Kec. Selaparang, Kota Mataram, Nusa Tenggara Bar. 83114 </div>
                    <hr/>
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <_Header />

                    <Layout style={{ height: "98vh", overflowX: "auto", background: "#d0dce5" }}>
                    {/* <p style={{ textAlign: "center", fontWeight: "bolder" }}> <span style={{ color: "#258fe6f7" }}> BALAI KESEHATAN </span> PANGKALAN TNI AL MATARAM </p> */}

                        <Content >
                            <Col style={{ textAlign: "center", paddingBottom:"5px", background:"rgb(102 198 236 / 18%)" }}>
                                <div style={{ fontFamily: "BrothersCircus", fontSize: "28px" }}> <span style={{ color: "orangered" }}>{profile.jenispraktek}  </span> <span style={{ color: "rgb(0, 21, 41)" }}>{profile.nama} </span> </div>
                                <div style={{ marginTop: "-5px", fontWeight: "bold", fontSize: "10px" }}> {profile.alamat} </div>
                            </Col>
                            {/* <div><Button> Atas </Button></div> */}
                            {/* <LinearProgress color="secondary" /> */}
                            {pr.children}
                        </Content>

                    </Layout>
                </Col>
            </Row>


        </div>
    )
}

export default LayoutAnt

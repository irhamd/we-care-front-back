
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button, Drawer } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import {
    UserOutlined, LaptopOutlined, PlayCircleOutlined, NotificationOutlined, DownloadOutlined, SyncOutlined, UserSwitchOutlined,
    LogoutOutlined, SettingFilled, DribbbleSquareOutlined, SendOutlined, ShareAltOutlined, ThunderboltOutlined, TransactionOutlined,
    MenuUnfoldOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, AppstoreOutlined, SettingOutlined
}
    from '@ant-design/icons';
import _Api from '../../Services/Api/_Api';

// import "../../_Assets/header/menu.css";

import { Link } from 'react-router-dom';
import { css } from '../../_Assets/custom-css';
import Avatar from 'antd/lib/avatar/avatar';
import { mainColor } from '../../Services/Color';
import { ubahText } from '../../Services/Crypto';
import { dataUser } from '../../Services/Cache/Auth';
import MenuUtama from './MenuUtama';


function _Header() {

    const [menu, setMenu] = useState([])
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;

    // const getMenu = () => {
    //     _Api.get("/getMenu").then(res => {
    //         setMenu(res.data.data)
    //     })
    // }

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const renderMenu = menu.map((item, index) => {
        return (
            <Menu.Item key={index} icon={<MenuUnfoldOutlined />} style={{ borderBottom: "1px solid #aacae421", width: "300px" }}>
                <Link to={item.url ? item.url : "/"} />
                {item.menu}
            </Menu.Item>

        )
    })
    useEffect(() => {
        // getMenu()
        let datas = dataUser;
    }, [])




    return (
        <div>
            {/* <Drawer
                title="Menu Utama"
                icon={<PlayCircleOutlined />}
                bodyStyle={css.bodyStyle}
                headerStyle={css.headerStyle}
                placement="top"
                closable={true}
                onClose={onClose}
                height="100"
                visible={visible}
            >
                <MenuUtama onClose={onClose} />
            </Drawer> */}

            <MenuUtama onClose={onClose} />
            {/* <Header className="header" style={{ height: "44px", paddingTop: "-10px"}}>
            </Header> */}
        </div>
    )
}

export default _Header

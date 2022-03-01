import { Button, Modal, Table } from 'antd'
import Form from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import _Api from '../../Services/Api/_Api'
import { DivCol, _Button, _Input, _TitleBar } from '../../Services/Forms/Forms'
import { Boot } from '../../Services/Forms/LayoutBootstrap'
import LayoutAnt from '../Layout/LayoutAnt'
import ModalInputUserBaru from './ModalInputUserBaru'
import TableUser from './TableUser'

function DataUser() {
    const [userBaru, setuserBaru] = useState(false)
    const [listUser, setListUser] = useState([])

    const handleModal = () => {
        setuserBaru(!userBaru)
    }



    useEffect(() => {
        _Api.get("/listDataUser").then(res => {
            setListUser(res.data.data)
        })
    }, [])
    return (
        <div>
            <LayoutAnt>
                <_TitleBar title="DATA USER" align="center" />
                <DivCol>
                    <Boot.Row>
                        <Boot.Col sm={1}>
                            <_Button title="User Baru" onClick={handleModal} />
                        </Boot.Col>
                    </Boot.Row>
                    <ModalInputUserBaru handleModal={handleModal} visible={userBaru} />
                </DivCol>
                <TableUser dataSource={listUser} />
            </LayoutAnt>

        </div>
    )
}

export default DataUser

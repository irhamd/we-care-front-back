import { Button, Modal, AutoComplete, Select  } from 'antd'
import Form from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { DivCol, _Button, _Input, _TitleBar, _Select } from '../../Services/Forms/Forms'
import { Boot } from '../../Services/Forms/LayoutBootstrap'


function ModalInputUserBaru(props) {

    const options = [
        { value: 'Burns Bay Road' },
        { value: 'Downing Street' },
        { value: 'Wall Street' },
    ];

    const onChange = (data) => {
        console.log(data);
    };
    const { Option } = Select;

    return (
        <div>
            <Modal
                visible={props.visible}
                title="Input User Baru"
                onOk={props.handleModal}
                onCancel={props.handleModal}
                footer={[
                    <Button key="back" danger type="primary" onClick={props.handleModal} >
                        Batal
                    </Button>,
                    <Button key="submit" type="primary" onSubmit={props.handleModal}>
                        Simpan
                    </Button>,
                ]}
            >
                <DivCol>
                    <Form layout="vertical" >
                        <Boot.Row>
                            <Boot.Col sm={12}> <_Input label="Username" /> </Boot.Col>
                            <Boot.Col sm={12}> <_Input password label="Password" /> </Boot.Col>
                            <Boot.Col sm={12}> <_Input password label="Password Lagi" /> </Boot.Col>
                            <Boot.Col sm={12}>
                                <_Select label= "Jenis Kelamin" onChange={onChange} >
                                    <Option value="Laki - laki">Laki - Laki</Option>
                                    <Option value="Perampuan">Perampuan</Option>
                                </_Select>
                            </Boot.Col>
                        </Boot.Row>
                    </Form>
                </DivCol>
            </Modal>
        </div>
    )
}

export default ModalInputUserBaru

import React, { useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import LayoutAnt from '../Layout/LayoutAnt';
import { DivCol, _Input, _Select, _TitleBar } from '../../Services/Forms/Forms';

function Contact(props) {

    useEffect(() => {
      console.log(props);
      alert(props.match.params.id)
    }, [])

    return (
        <div>
            <LayoutAnt>
                <_TitleBar title="Contact" align="center" />
                <DivCol kiri>
                    <Form layout="vertical" >

                        <_Input label="No. RM" onChange={(e) => alert(e.target.value)} />

                        <Form.Item label="Form Size" name="size">
                            <Radio.Group>
                                <Radio value="small">Small</Radio>
                                <Radio value="default">Default</Radio>
                                <Radio value="large">Large</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Input">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Select" >
                            <Select onChange={(val) => alert(val)} style={{background:"orange"}}>
                                <Select.Option  style={{borderColor:"orange"}} value="1111">Demo1</Select.Option>
                                <Select.Option value="2222">Demo2</Select.Option>
                            </Select>
                        </Form.Item>

                        <_Select label="Jenis Kelamin">
                            <Select.Option value="1111">Demo1</Select.Option>
                            <Select.Option value="2222">Demo2</Select.Option>
                        </_Select>
                        <Form.Item label="TreeSelect">
                            <TreeSelect
                                treeData={[
                                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Cascader">
                            <Cascader
                                options={[
                                    {
                                        value: 'zhejiang',
                                        label: 'Zhejiang',
                                        children: [
                                            {
                                                value: 'hangzhou',
                                                label: 'Hangzhou',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="InputNumber">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Switch">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button>Button</Button>
                        </Form.Item>
                    </Form>
                </DivCol>

            </LayoutAnt>
        </div>
    )
}

export default Contact

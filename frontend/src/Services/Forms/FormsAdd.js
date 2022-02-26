import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Mentions, Radio, Row, Select, Slider, Switch } from "antd"
import { Col as ColB } from 'react-bootstrap';


export const _Slider = (r) => {

    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : 'Harus diisi.' }]}
            >
                <div style={r.vertical && style}>
                    <Slider marks={r.marks} defaultValue={r.defaultValue} step={r.step} vertical={r.vertical}
                        max={r.max} min={r.min} onChange={r.onChange}
                    />
                </div>
            </Form.Item>
        </ColB>
    )
}

export const _CheckBox = (r) => {

    const style = {
        display: 'inline-block',
        height: 300,
        marginLeft: 70,
    };

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : 'Harus diisi.' }]}
            >
                <Checkbox onChange={r.onChange}  >{r.caption} </Checkbox>
            </Form.Item>
        </ColB>
    )
}

export const formItemLayout =
{
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
}


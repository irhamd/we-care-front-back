import { CloseCircleOutlined, CloudDownloadOutlined, DeleteRowOutlined, DeliveredProcedureOutlined, DownloadOutlined, EditOutlined, FilterOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Form, Input, InputNumber, Mentions, Radio, Row, Select, Switch } from "antd"
import { mainColor } from "../Color"
import { Col as ColB } from 'react-bootstrap';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { TextArea } = Input;
const _margintTop = "-20px"
const _allPadding = "0px 0px 0px 0px"
const { Search } = Input;

// const errMessage = 'Harus di isi .'
const errMessage = '`'


export const _Space = (r) => {
    return (
        <div style={{ height: `${r.t ? r.t : 10}px` }}></div>
    )
}

export const _Input = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12} >
            <Form.Item name={r.name} label={r.label} style={{ ...r.style, marginBottom: r.mb ? r.mb : "10px" }}
                name={r.name} hidden={r.hidden}
                fieldKey={r.fieldKey} shouldUpdate
                restField={r.restField}

                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                {r.password ?
                    <Input.Password
                        // name={r.name}
                        onChange={r.onChange}
                        disabled={r.disabled}
                        defaultValue={r.defaultValue}
                        value={r.value}
                        style={{ ...r.style }}

                    /> :
                    r.multiline ?
                        <TextArea showCount disabled={r.disabled} maxLength={r.maxLength}
                            onChange={r.onChange}
                            // name={r.name}
                            disabled={r.disabled}
                            value={r.value}
                            rows={r.rows} size={r.size}
                            style={{ ...r.style }}
                            defaultValue={r.defaultValue} /> :
                        <Input
                            value={r.value}
                            // bordered={false}
                            suffix={r.suffix} size={r.size}
                            disabled={r.disabled}
                            onChange={r.onChange}
                            addonAfter={r.addonAfter}
                            maxLength={r.maxLength}
                            addonBefore={r.addonBefore}
                            style={{ ...r.style, width:"100%" }}
                            defaultValue={r.defaultValue}
                        />
                }
            </Form.Item>
        </ColB>
    )
}

export const _Number = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item label={r.label} style={{ ...r.style, marginBottom: r.mb ? r.mb : "10px" }}
                name={r.name} hidden={r.hidden}
                fieldKey={r.fieldKey}
                restField={r.restField}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <InputNumber min={!r.min && 0} max={r.max}
                    onChange={r.onChange}
                    value={r.value}
                    disabled={r.disabled} size={r.size}
                    formatter={value => r.format && !r.number && `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => r.format && !r.number ? value.replace(/\$\s?|(,*)/g, '') : value}

                    style={{ ...r.style, width: "100%" }}
                    defaultValue={r.defaultValue} />
            </Form.Item>
        </ColB>
    )
}



// export const _Number = (r) => {
//     return (
//         <ColB sm={r.sm ? r.sm : 12}>
//             <Form.Item name={r.name} label={r.label} style={{ marginBottom: "10px" }} required={r.required}
//                 rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
//             >
//                 <InputNumber min={!r.min && 0} max={r.max}
//                     onChange={r.onChange}
//                     value={r.value}
//                     style={{ width: "100%" }}
//                     defaultValue={r.defaultValue} />
//             </Form.Item>
//         </ColB>
//     )
// }

export const _Text = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12} style={{ textAlign: r.align, width: "100%" }} >
            <Form.Item name={r.name} label={r.label} style={{ marginBottom: r.mb ? r.mb : "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <Text> {r.children}  </Text>
            </Form.Item>
        </ColB>
    )
}

export const _Switch = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label ? r.label : ""} style={{ marginBottom: r.mb ? r.mb : "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <Switch checkedChildren={!r.titleCheck ? <CheckOutlined /> : r.titleCheck}
                    onChange={r.onChange}
                    disabled={r.disabled}
                    size={r.size}
                    // onClick={r.onClick}
                    unCheckedChildren={!r.titleUnCheck ? <CloseOutlined /> : r.titleUnCheck}
                    defaultChecked={r.defaultChecked}
                // checkedChildren={ !r.titleCheck && <CheckOutlined />}
                // unCheckedChildren={r.titleUnCheck && <CloseOutlined />}
                />

            </Form.Item>
        </ColB>
    )
}

export const _Checkbox = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label ? r.label : ""} style={{ marginBottom: r.mb ? r.mb : "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <Checkbox options={['Ya', 'Tidak']} value={['Ya', 'Tidak']}>{r.children}</Checkbox>

            </Form.Item>
        </ColB>
    )
}

export const _RadioGroup = (r) => {

    let data = !r.options ? [] : r.options
    const render = data.map((item, i) => {
        return (
            <Radio.Button value={item[r.val ? r.val : 'value']}>{item[r.caption ? r.caption : 'label']}</Radio.Button>
            // <option key={i} value={r.withJeson ? JSON.stringify(item) : item[r.val]} > {item[r.caption]} </option>
        )
    })

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label ? r.label : ""} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]} >
                {/* <Radio.Group
                    defaultValue={r.defaultValue}
                    value={r.value}
                    options={r.options}
                    optionType={!r.radio && "button"}
                    buttonStyle={"solid"}
                    size={r.size}
                /> */}

                <Radio.Group buttonStyle="solid" defaultValue={r.defaultValue} onChange={e => console.log(e)}>
                    {render}
                </Radio.Group>

            </Form.Item>
        </ColB>
    )
}
export const _Label = ({ span, label, onChange, defaultValue, number, max, min, sm, name }) => {
    return (
        <ColB sm={sm ? sm : 12}>
            <Form.Item name={name} label={" "} style={{ marginBottom: "10px" }}>
                <Input
                    style={{ background: "#4eaef2", color: "black", fontWeight: "bolder" }}
                    disabled
                    defaultValue={label}
                />
            </Form.Item>
        </ColB>
    )
}

export const _Search = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label ? r.label : " "} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <Search placeholder={r.placeholder} maxLength={r.maxLength} onChange={r.onChange} onSearch={r.onSearch} enterButton loading={r.loading} />
            </Form.Item>
        </ColB>
    )
}

export const _Date = (r) => {
    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label ? r.label : ""} style={{ ...r.style, marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}
            >
                <DatePicker
                    showTime={r.showTime}
                    id={r.id}
                    picker={r.picker}
                    placeholder={r.placeholder ? r.placeholder : "--Pilih Tanggal"}
                    showToday
                    disabled={r.disabled}
                    style={{ width: "100%" }}
                    defaultValue={r.defaultValue}
                    format={!r.format ? 'DD-MM-YYYY HH:mm' : r.format}
                    onChange={r.onChange}
                />
            </Form.Item>
        </ColB>
    )
}

export const _TitleBar = ({ title, align, sm, label, color }) => {
    return (
        <div>
            <Row>
                <Col style={{ background: color ? color : "rgb(95 116 134 / 61%)", padding: "5px 10px 0px 10px", fontWeight: "bold", textAlign: align }} span={24}>
                    {title ?
                        <h5> <b> {title} </b> </h5> :
                        <div style={{ fontSize: "14px", fontWeight: "bold", paddingLeft: "17px", paddingBottom: "5px" }}>
                            {label}
                        </div>
                    }
                </Col>
            </Row>
            {/* <br /> */}
        </div>
    )
}

export const DivCol = (r) => {
    return (
        <div style={{
            ...r.style, margin: "10px 13px 5px 25px", width:"100%",
            paddingLeft: r.pl,
            paddingRight: r.pr,
            paddingTop: r.pt,
            paddingBottom: r.pb,
            background: r.bg
        }}>
            {r.children}
        </div>
    )
}
export const _Select = (r) => {
    let data = !r.option ? [] : r.option
    const render = data.map((item, i) => {
        return (
            <option key={i} value={r.withJeson ? JSON.stringify(item) : item[r.val]} > {item[r.caption]} </option>
        )
    })

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={r.label} hasFeedback required={r.required}
                style={{ ...r.style, marginBottom: r.mb ? r.mb : "10px" }}
                fieldKey={r.fieldKey}
                restField={r.restField}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}>
                <Select onChange={r.onChange} showSearch allowClear name={r.name} disabled={r.disabled}
                    optionFilterProp="children"
                    onSelect={r.onSelect}
                >
                    {render}
                </Select>
            </Form.Item>
        </ColB>
    )
}

export const _Mentions = (r) => {
    let data = !r.list ? [] : r.list
    const render = data.map((item, i) => {
        return (
            <option key={i} value={item[!r.val && "value"]} > {item[!r.caption && "caption"]} </option>
        )
    })

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name} label={!r.label && " "} style={{ marginBottom: "10px" }}
                rules={[{ required: r.required, message: r.message ? r.message : errMessage }]}>

                <Mentions
                    style={{ width: '100%' }}
                    onChange={r.onChange}
                    onSelect={r.onSelect}
                    value={r.value}
                    prefix={[',']}
                    rows={3} placeholder={r.placeholder}
                >
                    {render}
                </Mentions>
            </Form.Item>
        </ColB>
    )
}
export const _ButtonFilter = (props) => {
    return (
        <Col style={{ marginTop: _margintTop }}>
            <Form.Item label={" "}>
                <Button onClick={props.onClick} style={{ width: "100%", height: "30px", padding: "0px" }} type="primary" icon={props.icon}> Filter </Button>
            </Form.Item>
        </Col>
    )
}
export const _Button = (r) => {

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <Button className={r.className}
                onClick={r.onClick}
                block={r.block}
                loading={r.loading}
                shape={r.shape}
                disabled={r.disabled}
                danger={r.danger}
                style={{ ...r.style, background: r.color, borderColor: r.color, marginBottom:"10px" }}
                htmlType={r.submit ? "submit" : r.submit}
                size={r.size}
                type={"primary"}

                icon={r.btnSave ? <DownloadOutlined /> : r.btnFind ? <SearchOutlined /> : r.btnCancel ? <CloseCircleOutlined />  
                : r.btnDel ?  <DeleteRowOutlined /> :  r.btnEdit ?  <EditOutlined /> : r.icon}>
                {r.title} {r.label}
            </Button>
        </ColB>
    )
}
export const _BR = (r) => {

    return (
        <ColB sm={r.sm ? r.sm : 12}>
            <br/>
        </ColB>
    )
}

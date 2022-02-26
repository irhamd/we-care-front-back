import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';

import { Select, Spin } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import _Api from '../../Services/Api/_Api';

const { Option } = Select;

let timeout;
let currentValue;

function fetchData(api,value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const getApi=()=> {
        // console.log(`getMasterTindakan?namatindakan=${value}`)
        _Api.get(`pasien/get-kotakabupaten?nama=${value}`)
            // .then(response => response.json())
            .then(d => {
                if (currentValue == value) {
                    const result = d.data;
                    const data = [];
                    result.map(item => {
                        data.push({
                            value: item.id,
                            text: item.kotakabupaten,
                        });
                    })
                    callback(data);
                }
            });
    }

    timeout = setTimeout(getApi, 200);
}

export default function _MainMenu(R) {
    const [data, setdata] = useState([])
    const [value, setvalue] = useState(undefined)


    const handleSearch = value => {
        if (value) {
            fetchData('', value, data => setdata(data));
        } else {
            setdata([])
        }
    };

    const onSelect = opt => {
        console.log(opt)
    };

    const handleChange = (value, opt) => {
        console.log("value " , opt)
        setvalue({ value });
    };
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);

    return (
        <div style={{ marginLeft: "200px" }}>
            <Select style={{ width: "200px" }}
                showSearch
                // value={value.value}
                // placeholder={this.props.placeholder}
                // style={this.props.style}
                // defaultActiveFirstOption={false}
                // showArrow={false}
                onSelect={onSelect}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={<Spin size="small" />}
            >
                {options}
            </Select>
        </div>

    )
}

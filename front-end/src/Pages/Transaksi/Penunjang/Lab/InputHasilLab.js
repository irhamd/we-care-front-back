import React, { useState } from 'react'
import { AutoComplete, Checkbox, Divider } from 'antd';
import LayoutAnt from '../../../Layout/LayoutAnt';
import { DivCol } from '../../../../Services/Forms/Forms';

const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const plainOptions = [
    { label: 'Apple', value: '1' },
    { label: 'Pear', value: '2' },
    { label: 'Orange', value: '3' },
];


function InputHasilLab() {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = list => {
        console.log(list)
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };



    return (
        <LayoutAnt>
            <DivCol>

                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <Divider />
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                <hr />


            </DivCol>
        </LayoutAnt>
    );
}

export default InputHasilLab

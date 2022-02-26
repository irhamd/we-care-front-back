import React from 'react'
import ReactExport from "react-data-export";
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

function ExportExcel(props) {


    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


    const renderColumn = props.column.map(item => {
        return (
            <ExcelColumn label={item.label} value={item.field} />
        )
    })

    return (
        <div>
            <ExcelFile element={<Button type="primary" style= {props.style} icon={<DownloadOutlined />}> Export </Button>}>
                <ExcelSheet data={props.dataSet} name="Employees">
                    {renderColumn}
                </ExcelSheet>

            </ExcelFile>
        </div>
    )
}

export default ExportExcel

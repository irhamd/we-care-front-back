import { BarChartOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import _Api from '../../../Services/Api/_Api'
import { DivCol, _TitleBar } from '../../../Services/Forms/Forms'
import LayoutAnt from '../../Layout/LayoutAnt'
import DataPenerimaanBarang from './DataPenerimaanBarang'
import InputBarangMasuk from './InputBarangMasuk'
import KartuStok from './KartuStok'

function PenerimaaanBarang(pr) {



    const [Combo, setCombo] = useState([])
    const [Loading, setLoading] = useState([])
    const [state, setState] = useState({})
    const [activeKey, setactiveKey] = useState("1")
    const { TabPane } = Tabs;

    const LoadCombo = () => {
        setLoading(true)
        _Api.get("penerimaanbarang/get-combo-penerimaan-barang").then(res => {
            setCombo(res.data)
            setLoading(false)
        })
    }

    function callback(key) {
        console.log(key);
    }
    useEffect(() => {
        LoadCombo()
        // console.log(pr.match.params.key.toString())
    }, [])

    return (
        <LayoutAnt>
            <_TitleBar title="Penerimaan Barang" align="Center" />
            <DivCol style={{ marginTop: "-25px" }}>
                <Tabs tabPosition="left"
                    type="editable-card"
                    tabBarStyle={{ background: "#4eaef238", width: "200px", textAlign: "center" }} centered
                    moreIcon={<BarChartOutlined />}
                    defaultActiveKey={pr.match.params.key.toString()} onChange={callback}>

                    <TabPane tab="Input Barang Masuk" key="1">
                        <InputBarangMasuk Combo={Combo} />
                    </TabPane>
                    <TabPane tab="Daftar Penerimaan" key="2">
                        <DataPenerimaanBarang setactiveKey={setactiveKey} Combo={Combo} />
                    </TabPane>
                    <TabPane tab="Kartu Stok" key="3">
                        {/* <h4> Kartu Stok </h4> */}
                        <KartuStok setactiveKey={setactiveKey} Combo={Combo} />
                    </TabPane>

                </Tabs>
            </DivCol>

        </LayoutAnt>
    )
}

export default withRouter(PenerimaaanBarang)

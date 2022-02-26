import { useEffect, useState } from "react"
import _Api from "../Api/_Api"




export const comboBox = {
    pegawai() {
        var n = ""
        _Api.get("registrasi/compo-registrasi-pelayanan").then(res => {
            n= res.data
        })

        return n
    }
}



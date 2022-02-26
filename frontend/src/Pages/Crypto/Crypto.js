import React, { useEffect, useState } from 'react'
import { acakText, ubahText } from '../../Services/Crypto';

// npm install cryptr


function Crypto() {
    // const CryptoJS = require("crypto-js");


    const [obj, setobj] = useState("")
    const [teks, setteks] = useState("")
    const [teks1, setteks1] = useState("")
    const [token, settoken] = useState()
    const [username, setusername] = useState()
    const [cekToken, setcekToken] = useState()

    const setLogin = () => {
        var tokenx = acakText(username)
        sessionStorage.setItem('x-j0', tokenx)
    }

    p
    const cekLoginUser = () => {
        let token = sessionStorage.getItem('x-j0')
        setcekToken(ubahText(token))
    }

    return (
        <div>

            <p>
                <label> Username </label>
                <input type="text" onChange={(e) => setusername(e.target.value)} />
            </p>
            <p> <button onClick={setLogin}> Login </button> </p>
            <p> <button onClick={cekLoginUser} > Cek </button> </p>
            <p> {cekToken} </p>
        </div>
    )
}

export default Crypto

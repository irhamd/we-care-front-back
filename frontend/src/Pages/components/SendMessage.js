import React, { useState } from 'react'
// import { db, auth } from '../firebase'
import firebase from 'firebase'
import { Input } from '@material-ui/core'
import { db , auth} from '../../Services/firebase/firebase'
import '../../_Assets/chat.css'
import { Button } from 'antd'

const st = {
    input: { width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' },
    tombol: { width: '18%', fontSize: '15px', background :"#ffe4c4" , fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' },
}



function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const [sedangKirim, setsedangKirim] = useState(false)

    async function sendMessage(e) {
        setsedangKirim(true)
        e.preventDefault()
        const { uid, photoURL, email } = auth.currentUser
        console.log("iniiii autthhh", auth)

        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email: email
        })
        setMsg('')
        setsedangKirim(false)
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }



    const updateTyping = async (e) => {

        setMsg(e.target.value)
        await db.collection("typing").doc("BJ").update({
            typing: true
        })

        setTimeout(function () {
            db.collection("typing").doc("BJ").update({
                typing: false
            })
        }, 100);
    }



    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input onChange={(e) => updateTyping(e)} value={msg} style={st.input} placeholder='Isi pesan ...' type="text" />
                    <Button style={st.tombol} htmlType="submit" loading ={sedangKirim}>Kirim</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage


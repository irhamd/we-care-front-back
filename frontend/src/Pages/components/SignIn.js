import React from 'react'
import firebase from 'firebase'
import { Button, Radio } from 'antd';
// import { auth } from '../firebase.js'
import { auth } from '../../Services/firebase/firebase'
import { _Button } from '../../Services/Forms/Forms';
import { GoogleCircleFilled, GooglePlusOutlined, GooglePlusSquareFilled } from '@ant-design/icons';

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <Button icon={<GoogleCircleFilled/>} onClick={signInWithGoogle} > Login menggunakan google </Button>
            
            {/* <Button style={{ padding: '30px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }} onClick={signInWithGoogle}>Sign In With Google</Button> */}
        </div>
    )
}

export default SignIn


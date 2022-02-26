import React from 'react'
import CryptoJS from 'crypto-js';


    const secrateText = '~!@#$%^&*()_+|}{:"?><';
    export const acakText = (text) => {
        return CryptoJS.AES.encrypt(text, secrateText).toString();
    }


    export const ubahText = (text) => {
        const bytes = CryptoJS.AES.decrypt(text, secrateText);
        return bytes.toString(CryptoJS.enc.Utf8);


    }

 

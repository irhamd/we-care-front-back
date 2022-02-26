import { CameraOutlined, RollbackOutlined } from '@ant-design/icons';
import React, { useRef, useState, useCallback } from 'react'
import Webcam from "react-webcam";
import { _Button } from '../Forms/Forms';

function ShowWebcam(pr) {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);



    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "user"
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot(videoConstraints);
        pr.setFoto(imageSrc)
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const ulang = () => {
        pr.setFoto(null)
        setImgSrc(null)
    }




    return (
        <div>
            {imgSrc ? (
                <img
                    src={imgSrc}
                />
            ) : <Webcam
                audio={false}
                ref={webcamRef}
                // style={{ borderWidth:"6px" }}

                imageSmoothing
                // width={1280}
                videoConstraints={videoConstraints}
                screenshotFormat="image/jpeg"
            />}

            {
                !imgSrc ? <_Button onClick={capture} title="Ambil Gambar" icon={<CameraOutlined />} /> :
                    <_Button onClick={ulang} title="Ulang" block danger icon={<RollbackOutlined />} />
            }
            {/* {imgSrc} */}
        </div>
    );

}

export default ShowWebcam

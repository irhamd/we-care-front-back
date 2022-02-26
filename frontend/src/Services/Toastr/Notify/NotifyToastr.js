// import './ReactToastify.css';
import { toast } from 'react-toastify';

const obj = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

// export const Notifikasi_Error = (msg) => {
//     toast.error(`☣️ error , ${msg} `, obj);
// };
// export const Notifikasi_Success = (msg) => {
//     toast.success(`✅ Suksess : ${msg} `, obj);
// };
// export const Notifikasi_Warning = (msg) => {
//     toast.success(`⚠️ Perhatian : ${msg} `, obj);
// };


export const _Message = {
   error (msg){
    toast.error(`${msg} `, obj);
   },
   success (msg){
    toast.success(`${msg} `, obj);
   },
   warning (msg){
    toast.warning(`${msg} `, obj);
   },
};
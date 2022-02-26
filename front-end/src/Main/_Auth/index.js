export const LogOut = () =>{
    sessionStorage.removeItem('x-auth-user');
    sessionStorage.removeItem('y-auth-fhdev0012');
    sessionStorage.removeItem('x-auth-resu');
    sessionStorage.removeItem('x-auth-iawagep');
    sessionStorage.removeItem('x-auth-pegawai');
    sessionStorage.removeItem('Authorization');
}

export const cekSession = () =>{
    try {
       if (sessionStorage.getItem('x-auth-user')){
           alert("ada")
       } else alert("tidak ada")
        // sessionStorage.getItem('y-auth-fhdev0012');
        // sessionStorage.getItem('x-auth-resu');
        // sessionStorage.getItem('x-auth-iawagep');
        // sessionStorage.getItem('x-auth-pegawai');
        // alert("oke")
    } catch (error) {
        alert("gagal")
        
    }

}


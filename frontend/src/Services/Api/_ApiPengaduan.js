import Axios from 'axios'
import { globalText } from '../Text/GlobalText';
// export const baseURL = process.env.REACT_APP_BASE_URL_229
export const baseURL = process.env.REACT_APP_BASE_URL_PENGADUAN_PUBLIC


  const _ApiPengaduan = () => {
    let auth = sessionStorage.getItem(globalText.y_auth_fhdev);
  
      const defaultOptions = {
        baseURL:baseURL,
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN' :'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpcmhhbSJ9.ZtWcByY7pMfszjKL6mAOD158WqsSrQOezlPC2Twady8524cObaawrOce5e3n68gluh2aFo2r4TZr6mG4fT_wlQ',
          // 'X-CSRF-Token' : sessionStorage.getItem('tokencrsf')
        },
      };
    
      let instance = Axios.create(defaultOptions)  
      instance.interceptors.request.use(function (config) {
        // const token =  auth ? auth : 'unAuthorization';
        // const token = 'Authorization';
        // config.headers.Authorization =  token;
        return config;
      });
    
      return instance;
    };

    export default _ApiPengaduan()


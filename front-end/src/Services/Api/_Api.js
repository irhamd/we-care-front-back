import Axios from 'axios'
import { globalText } from '../Text/GlobalText';
// export const baseURL = process.env.REACT_APP_BASE_URL_229

// REACT_APP_BASE_URL_LOCAL=http://127.0.0.1:8000/api/
// REACT_APP_BASE_URL_1=http://192.168.43.218:8000/api/
// REACT_APP_BASE_URL_229=http://172.16.75.229:2939/api/
// REACT_APP_BASE_URL_229_PUBLIC=http://103.229.236.58:2939/api/

export const baseURL = "http://127.0.0.1:4000/api/"

const _Api = () => {
  let auth = sessionStorage.getItem(globalText.y_auth_fhdev);

    const defaultOptions = {
      baseURL:baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-TOKEN' :auth,
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
  export default _Api();

import axios from 'axios';
import Cookies from "js-cookie";
axios.defaults.baseURL = 'http://localhost:8000';

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post["Authorization"]= `JWT ${Cookies.get("accessToken")}`
console.log({localStorage:Cookies.get("accessToken")})
const api = axios.create();
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    console.log({accessToken})
    const language = localStorage.getItem('language') || 'en';
    if (accessToken) {
      config.headers['Authorization'] = `JWT ${accessToken}`;
    }
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

  export default api;
import axios from 'axios'
let apiUrl;
if (process.env.REACT_APP_API_URL) {
  apiUrl = process.env.REACT_APP_API_URL;
  console.log('✅ 使用环境变量设置的API地址:', apiUrl);
} else {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    apiUrl = 'http://localhost:3000';
    console.log('🏠 检测到本地环境，使用本地API:', apiUrl);
  } else {
    apiUrl = 'https://rsyfaexhi7.execute-api.us-east-1.amazonaws.com/dev';
    console.log('🌐 检测到部署环境，使用线上API:', apiUrl);
  }
}
console.log(111111111,apiUrl)

const api = axios.create({
  baseURL: apiUrl, 
});
export default api;
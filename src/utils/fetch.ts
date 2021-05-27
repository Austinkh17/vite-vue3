import axios from './axios';
import qs from 'qs';
import {getJwtToken, setJwtToken} from './index';

export const fetchData = async (url:any, method:any, params = null) => {
    let config:any = {
        url,
        method,
        paramsSerializer: (data:any) => qs.stringify(data, { indices: false })  // 序列化 处理数组
    }
    config.headers = {
        'Content-type': 'application/json;charset=utf-8'
    };
    config.headers['jwt-token'] = getJwtToken() ? getJwtToken() : 'NULL';
    if(method === 'get'){
        config.params = params || null;
    }else{
        config.data = params || null;
    }
    try {
        let res = await axios(config);
        return res.data;
    } catch(err) {
        return err;
    }
}
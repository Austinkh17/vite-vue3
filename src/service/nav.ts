import {fetchData} from '../utils/fetch';

let api:any = {};

//  获取视图库拓扑信息
api.getWebIconApi = (params:any) => {
	return fetchData('https://www.duwanyu.com/spider/getIconAndTitle', 'post', params);
	// return fetchData('http://localhost:8085/mock/cloud-ops-front/getTopo.json', 'get', params);
};

export default api;
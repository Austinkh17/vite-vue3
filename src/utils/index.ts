function formatTimeNumber(n :Number) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}
/*
* 返回一个格式为 {date: "2019-11-13",time: "09:57:29",week: 3} 的当前时间
* */
export function currentTime() {
	let tmpDate = new Date();
	let tmpWeek = tmpDate.getDay();
	let year = tmpDate.getFullYear();
	let month = tmpDate.getMonth() + 1;
	let day = tmpDate.getDate();
	let hour = tmpDate.getHours();
	let min = tmpDate.getMinutes();
	let sec = tmpDate.getSeconds();
	let date = year + '-' + formatTimeNumber(month) + '-' + formatTimeNumber(day);
	let time = formatTimeNumber(hour) + ':' + formatTimeNumber(min) + ':' + formatTimeNumber(sec);
	let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][tmpWeek];
	return {date, time, week};
}

export function getJwtToken() {
	return localStorage.getItem('jwtToken');
}

export function setJwtToken(data) {
	localStorage.setItem('jwtToken', data);
}
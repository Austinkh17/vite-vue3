export function getJwtToken() {
	return localStorage.getItem('jwtToken');
}

export function setJwtToken(data:any) {
	localStorage.setItem('jwtToken', data);
}
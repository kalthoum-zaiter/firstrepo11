import axios from 'axios';

const baseURL = 'http://localhost:1010';



const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
	(response) => {
		var sss = "http://localhost:1010"
		console.log(sss.toString())
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		//if (typeof error.response === 'undefined') {
		//	alert(
		//		'A server/network error occurred. ' +
		///			'Looks like CORS might be the problem. ' +
		//			'Sorry about this - we will get it fixed shortly.'
		//	);
		//	return Promise.reject(error);
		//}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + '/refresh/token'
		) {
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
            const acessToken = localStorage.getItem('access_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/refresh/token', { RefreshToken: refreshToken,AcessToken: acessToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.AccessToken);
							localStorage.setItem('refresh_token', response.data.RefreshToken);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/LoginForm';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/LoginForm';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);


export default axiosInstance;
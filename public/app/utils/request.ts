import axios from 'axios';

const baseURL = 'http://127.0.0.1/api/';
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // CORS with cookies
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.data) {
            config.data = {};
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);
// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (response.status === 200) {
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    },
    (error) => {
        console.log(`error：${error}`);
        return Promise.reject(error);
    },
);

function* asyncGenFn(self: any, key: string, responseHandler: () => {}) {
    let response;
    try {
        self.loadWatcher.set(key, true);
        response = yield responseHandler();
    } catch (error) {
        console.error(error);
        !response && (response = Promise.reject(error));
    } finally {
        self.loadWatcher.set(key, false);
        return response;
    }
}

export { axiosInstance as request, asyncGenFn };

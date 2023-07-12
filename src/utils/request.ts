import {message} from 'antd'

interface RequestOptions extends RequestInit {
    responseType?:
        | 'TEXT'
        | 'JSON'
        | 'BLOB'
        | 'ARRAYBUFFER'
        | 'text'
        | 'json'
        | 'blob'
        | 'arraybuffer';
    body?: any;
}

function getApiUrl(originUrl: string): string{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return baseUrl + originUrl;
}

// 发送数据请求
const request = async (url: string, config?: RequestOptions) => {
    const finalUrl: string = getApiUrl(url);
    const inital: RequestOptions = {
        method: 'GET',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : ''
        },
        credentials: 'include',
        cache: 'no-cache',
        mode: 'cors',
        responseType: 'JSON'
    };

    const configs: RequestOptions = {
        ...inital,
        ...config
    };
    if (config && config.headers)
        configs.headers = {
            ...inital.headers,
            Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '',
            ...config.headers
        };

    // body
    if (
        configs.body &&
        /^(POST|PUT|PATCH)$/i.test(configs.method?.toUpperCase() || '') &&
        configs.responseType &&
        configs.responseType.toUpperCase() === 'JSON'
    ) {
        configs.body = JSON.stringify({ ...configs.body });
    }

    // 基于fetch请求数据
    const finalConfig: RequestInit = {
        method: configs.method?.toUpperCase(),
        credentials: configs.credentials,
        mode: configs.mode,
        cache: configs.cache,
        headers: configs.headers,
        body: configs.body
    };

    return fetch(`${finalUrl}`, finalConfig)
        .then((response: Response) => {
            // 走到这边不一定是成功的：
            // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
            const { status } = response;

            if (status >= 200 && status < 400) {
                // 真正成功获取数据
                let result: any;
                switch (configs.responseType && configs.responseType.toUpperCase()) {
                    case 'TEXT':
                        result = response.text();
                        break;
                    case 'JSON':
                        result = response.json();
                        break;
                    case 'BLOB':
                        result = response.blob();
                        break;
                    case 'ARRAYBUFFER':
                        result = response.arrayBuffer();
                        break;
                    default:
                        result = response.json();
                }
                return result;
            }
            // 失败的处理
            return Promise.reject(response);
        })
        .catch((reason: any) => {
            // @2:断网
            if (typeof window !== 'undefined' && navigator && !navigator.onLine) {
                message.error('Your network is break!');
            }
            // @1:状态码失败
            if (reason && reason.status) {
                switch (reason.status) {
                    case 400:
                        message.error('Please verify your info!');
                        break;
                    case 401:
                        localStorage.removeItem('token');
                        localStorage.removeItem('address');
                        message.error('Please Login!', );
                        break;
                    case 403:
                        message.error('You have no access to this',);
                        break;
                    case 500:
                        message.error("Oops, there's something wrong!");
                        break;
                    case 504:
                        message.error("Oops, there's something wrong!");
                        break;
                    default:
                }
            } else {
                // @3:处理返回数据格式失败
                message.error("Oops, there's something wrong!");
            }

            return Promise.reject(reason);
        });
};

export default request;

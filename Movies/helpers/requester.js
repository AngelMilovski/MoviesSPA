const requester = (function name() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_r1E2s-YQr';
    const appSecret = 'ae761e4d907e46bfba799774dc40a162';

    const makeUrl = function (endpoint, module) {
        return (endpoint) ?
            `${baseUrl}/${module}/${appKey}/${endpoint}` :
            `${baseUrl}/${module}/${appKey}`;
    };

    const makeAuth = function (type) {
        return (type === 'Basic') ?
            `Basic ${btoa(appKey + ':' + appSecret)}` :
            `Kinvey ${sessionStorage.getItem('authtoken')}`;
    };

    const makeHeaders = function (type, httpMethod, data) {
        const headers = {
            method: httpMethod,
            headers: {
                Authorization: makeAuth(type),
                'Content-Type': 'application/json',
            },
        };

        if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
            headers.body = JSON.stringify(data);
        }

        return headers;
    };

    const makeRequest = function (url, headers) {
        return fetch(url, headers);
    };

    const get = function (endpoint, module, type) {
        const headers = makeHeaders(type, 'GET');
        const url = makeUrl(endpoint, module);
        return makeRequest(url, headers);
    };

    const post = function (endpoint, module, type, data) {
        const headers = makeHeaders(type, 'POST', data);
        const url = makeUrl(endpoint, module);
        return makeRequest(url, headers);
    };

    const put = function (endpoint, module, type, data) {
        const headers = makeHeaders(type, 'PUT', data);
        const url = makeUrl(endpoint, module);
        return makeRequest(url, headers);
    };

    const del = function (endpoint, module, type) {
        const headers = makeHeaders(type, 'DELETE');
        const url = makeUrl(endpoint, module);
        return makeRequest(url, headers);
    };

    const patch = function (endpoint, module, type, data) {
        const headers = makeHeaders(type, 'PATCH', data);
        const url = makeUrl(endpoint, module);
        return makeRequest(url, headers);
    };

    return {
        get,
        post,
        put,
        del,
        patch,
    };
})();
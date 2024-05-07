import config from '../config'

const fetcher = async (endpoint, params = {}) => {
    console.log("Params: ", params)
    return await fetch(config.baseUrl + endpoint, {
        method: params.method || 'GET',
        ...(Boolean(params.body) && {
            body: JSON.stringify(params.body),
        }),
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
            'Access-Control-Allow-Credentials': true,
            ...params.headers,
        },
    }).then(data => {
        return data.json()
    }).catch(error => {
        console.log('Fetch Error: ', error)
    })
};

export default fetcher;

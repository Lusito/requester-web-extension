import { RequesterConfig, StringMap } from './types';

export async function performRequest(config: RequesterConfig, inputData: StringMap) {
    let body: FormData | string;
    let headers: HeadersInit | undefined;
    let url: string;
    if (typeof config.url === 'string') {
        url = config.url;
    } else {
        url = (inputData[config.url.name] || '').trim();
        if (!url)
            throw new Error(`${config.url.label || config.url.name} is required`);
        delete inputData[config.url.name];
    }
    const data: { [s: string]: string } = {};
    for (const param of config.params) {
        let value = inputData[param.name] || '';
        switch (param.type) {
            case 'hidden':
                data[param.name] = param.value;
                break;
            case 'required':
                if (!value)
                    throw new Error(`${param.label || param.name} is required`);
                data[param.name] = value;
                break;
            case 'allow-empty':
                data[param.name] = value;
                break;
            case 'omit-empty':
                if (value)
                    data[param.name] = value;
                break;
        }
    }
    if (config.type === 'form-data') {
        body = new FormData();
        for (const key of Object.keys(data))
            body.append(key, data[key]);
    } else {
        body = Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    });
    if (config.resultAttribute) {
        const json = await response.json();
        const result = json[config.resultAttribute];
        if (typeof result === 'string')
            return result;
        return JSON.stringify(result);
    }
    return await response.text();
}

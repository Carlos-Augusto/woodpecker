import fetch from 'node-fetch';

export default async (request) => {
    const resp = await fetch(request.url, request.details);

    if (resp.status > 299) {
        const message = await resp.text()
        throw new Error("response_message=" + message + " response_status=" + resp.status);
    }

    return resp;
};



import fetch from 'node-fetch';

export default async (request) => {
    const resp = await fetch(request.url, request.details);

    if (resp.status > 299) {
        throw Error("response_status=" + resp.status);
    }

    return resp;
};



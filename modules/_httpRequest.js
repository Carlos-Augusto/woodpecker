import fetch from 'node-fetch';

const call = async (request) => {
    const resp = await fetch(request.url, request.details);

    if (resp.status > 299) {
        throw Error("response_status=" + resp.status);
    }

    return resp;
};

const get = async (request) => {
    request.details.method = {};
    request.details.method = "get";

    return call(request);
};

const post = async (request) => {
    request.details.method = {};
    request.details.method = "post";

    return call(request);
};

export default {
    get, post
};



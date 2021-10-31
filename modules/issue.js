import httpCertify from "./__httpCertify.js";

export default async (stage, body, headers, pfxFile, passphrase) => {
    const path = "/api/certify/v2/issue/hash"
    const resp = await httpCertify(stage, path, "post", body, headers, pfxFile, passphrase)

    return resp.buffer();
};


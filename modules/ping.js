import httpCertify from "./_httpCertify.js";

export default async (stage, pfxFile, passphrase) => {
    const resp = await httpCertify(stage, "", "get", null, {}, pfxFile, passphrase);

    return resp.buffer();
};

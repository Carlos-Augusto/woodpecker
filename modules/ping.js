import httpCertify from "./__httpCertify.js";

export default async (stage, pfxFile, passphrase) => {

    const resp =  await httpCertify(stage, "", "get", null, {}, pfxFile, passphrase)

    return resp.buffer();
};


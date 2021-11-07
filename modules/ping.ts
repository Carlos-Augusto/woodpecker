import httpCertify, {HttpCredential, Stage} from "./_httpCertify.js";

export interface Ping extends HttpCredential {
    stage: Stage
}

export default async (ping: Ping) => {
    const resp = await httpCertify({
        stage: ping.stage,
        path: "",
        method: "get",
        body: null,
        headers: {},
        pfxFile: ping.pfxFile,
        passphrase: ping.passphrase
    });
    return resp.buffer();
};

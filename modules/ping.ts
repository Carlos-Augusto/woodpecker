import httpCertify, {Stage} from "./_httpCertify.js";

type Ping = {
    stage: Stage,
    pfxFile: Buffer,
    passphrase: string
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

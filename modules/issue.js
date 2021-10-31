import httpClient from './_httpRequest.js';
import https from "https";

export default async (stage, body, headers, pfxFile, passphrase) => {
    if (stage === "") {
        throw new Error("Stage can't be empty.")
    }

    const url = "https://api.certify." + stage + ".ubirch.com/api/certify/v2/issue/hash"

    const httpsAgent = new https.Agent({
        keepAlive: true,
        pfx: pfxFile,
        passphrase: passphrase
    });

    const resp = await httpClient.post({
        url: url,
        details:  {
            body: body,
            headers: headers,
            agent: httpsAgent
        }
    });

    return resp.buffer();
};


import httpClient from './_httpRequest.js';
import https from "https";

export default async (stage, pfxFile, passphrase) => {
    if (stage === "") {
        throw new Error("Stage can't be empty.")
    }

    const url = "https://api.certify." + stage + ".ubirch.com"

    const httpsAgent = new https.Agent({
        keepAlive: true,
        pfx: pfxFile,
        passphrase: passphrase
    });

    const resp = await httpClient.get({
        url: url,
        details:  {
            agent: httpsAgent
        }
    });

    return resp.buffer();
};


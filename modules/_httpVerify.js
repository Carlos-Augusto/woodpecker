import httpClient from './_httpRequest.js';
import https from "https";

export default async (stage, path, method, body, headers, pfxFile, passphrase) => {
    if (stage === "") {
        throw new Error("Stage can't be empty.")
    }

    let url = "https://api.uve." + stage + ".ubirch.com" + path;
    if (stage === "prod") {
        url = "https://api.uve.ubirch.com" + path;
    }

    const httpsAgent = new https.Agent({
        keepAlive: true,
        pfx: pfxFile,
        passphrase: passphrase
    });

    return await httpClient({
        url: url,
        details: {
            body: body,
            method: method,
            headers: headers,
            agent: httpsAgent
        }
    });
};


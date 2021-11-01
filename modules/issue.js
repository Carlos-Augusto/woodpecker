import httpCertify from "./_httpCertify.js";

export default async (stage, body, dccType, locId, txId, pfxFile, passphrase) => {
    const path = "/api/certify/v2/issue/hash";
    const _headers = {
        "x-ubirch-dcctype": dccType,
        "x-location-id": locId,
        "x-transaction-id": txId,
        "Content-Type": "text/plain"
    };

    const resp = await httpCertify(stage, path, "post", body, _headers, pfxFile, passphrase);

    return resp.buffer();
};


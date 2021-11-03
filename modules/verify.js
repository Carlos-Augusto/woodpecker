import httpVerify from "./_httpVerify.js";

export const verify = async (stage, data, txId, txTag, verifyFor, pfxFile, passphrase) => {
    const path = "/api/uve/v1/verify";
    const headers = {
        "X-Transaction-Id": txId,
        "X-Transaction-Tag": txTag,
        "X-Verify-For": verifyFor,
        "Content-Type": "text/plain"
    };
    const resp = await httpVerify(stage, path, "post", data, headers, pfxFile, passphrase);

    return await resp.text();
};


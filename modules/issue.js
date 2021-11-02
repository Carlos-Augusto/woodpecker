import httpCertify from "./_httpCertify.js";
import {addDays, unixTime} from "./_addDays.js";

import cbor from "cbor";
import crypto from "crypto";
import util from "util";
import zlib from "zlib";
import base45 from "base45";

const deflatePromise = util.promisify(zlib.deflate);

const issue = async (stage, data, headers, pfxFile, passphrase) => {
    const now = new Date();

    let p = new cbor.Map();
    p.set(1, data);

    let _payload = new cbor.Map();
    _payload.set(1, "DE"); // issuer
    _payload.set(6, unixTime(now.getTime())); // issued time
    _payload.set(4, unixTime(addDays(now, 2).getTime())); // exp
    _payload.set(-260, p);

    let payload = cbor.encodeCanonical(_payload);

    const sigStructureEncoded = cbor.encodeCanonical([
        'Signature1',
        Buffer.from([0xA1, 0x01, 0x26]),
        Buffer.from([]),
        payload
    ]);

    const hash = crypto.createHash('sha256').update(sigStructureEncoded).digest('base64');

    const path = "/api/certify/v2/issue/hash";
    const resp = await httpCertify(stage, path, "post", hash, headers, pfxFile, passphrase);
    const cert = await resp.buffer();

    const decodedCert = await cbor.decodeAll(cert);
    decodedCert[0].value[2] = payload; //payload replacement

    const encodedCert = cbor.encodeCanonical(decodedCert[0]);
    const compressedCert = await deflatePromise(encodedCert);

    return "HC1:" + base45.encode(compressedCert);
}

const fromLoc = (stage, data, dccType, locId, txId, pfxFile, passphrase) => {
    const headers = {
        "x-ubirch-dcctype": dccType,
        "x-location-id": locId,
        "x-transaction-id": txId,
        "Content-Type": "text/plain"
    };

    return issue(stage, data, headers, pfxFile, passphrase);
}

export default {
    fromLoc
};


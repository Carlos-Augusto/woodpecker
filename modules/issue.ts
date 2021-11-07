import httpCertify, {Stage} from "./_httpCertify.js";
import {addDays, unixTime} from "./_addDays.js";

import cbor from "cbor";
import crypto from "crypto";
import util from "util";
import zlib from "zlib";
// @ts-ignore
import base45 from "base45";
import {HeadersInit} from "node-fetch";

const deflatePromise = util.promisify(zlib.deflate);

type Issue<V> = {
    stage: Stage,
    data: V,
    headers: HeadersInit,
    pfxFile: Buffer,
    passphrase: string
}

const issue = async (issue: Issue<any>): Promise<string> => {
    const now = new Date();

    let p = new cbor.Map();
    p.set(1, issue.data);

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
    const resp = await httpCertify({
        stage: issue.stage,
        path: path,
        method: "post",
        body: hash,
        headers: issue.headers,
        pfxFile: issue.pfxFile,
        passphrase: issue.passphrase
    });
    const cert = await resp.buffer();

    const decodedCert = await cbor.decodeAll(cert);
    decodedCert[0].value[2] = payload; //payload replacement

    const encodedCert = cbor.encodeCanonical(decodedCert[0]);
    const compressedCert = await deflatePromise(encodedCert);

    return "HC1:" + base45.encode(compressedCert);
}

//stage, data, dccType, locId, txId, pfxFile, passphrase
type IssueLoc<V> = {
    stage: Stage,
    data: V,
    dccType: string,
    locId: string,
    txId: string,
    pfxFile: Buffer,
    passphrase: string
}

const fromLoc = (issueLoc: IssueLoc<any>): Promise<string> => {
    const headers = {
        "x-ubirch-dcctype": issueLoc.dccType,
        "x-location-id": issueLoc.locId,
        "x-transaction-id": issueLoc.txId,
        "Content-Type": "text/plain"
    };

    return issue({
        stage: issueLoc.stage,
        data: issueLoc.data,
        headers: headers,
        pfxFile: issueLoc.pfxFile,
        passphrase: issueLoc.passphrase
    });
}

export default {
    fromLoc
};


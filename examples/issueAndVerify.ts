import woodpecker from "../modules/woodpecker.js";
import {config} from "../modules/_getConfig.js";

const run = async () => {
    const data = {id: 123456789};
    const dccType = "V";
    const locId = "9bc7d6c873080af8c39453157a3937d32c779c909e78b0d8547dd20648994f1f";
    const txId = "aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647";

    const issued = await woodpecker.issue.fromLoc({
        stage: config.stage,
        data: data,
        expireAfterDays: 1,
        dccType: dccType,
        locId: locId,
        txId: txId,
        pfxFile: config.pfx,
        passphrase: config.passphrase
    });

    console.log("Certificate: " + Buffer.from(issued).toString('utf8'));

    const dataToVerify = Buffer.from(issued).toString('utf8');
    const txTag = "Market-Tomato";
    const verifyFor = "EU";

    const verified = await woodpecker.verify({
        stage: config.stage,
        data: dataToVerify,
        txId: txId,
        txTag: txTag,
        verifyFor: verifyFor,
        pfxFile: config.pfx,
        passphrase: config.passphrase
    });

    console.log("Validation: " + Buffer.from(verified).toString('utf8'));

    return true;
};

run().then(r => r);


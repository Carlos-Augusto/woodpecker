import woodpecker from "../modules/woodpecker.js";
import fs from "fs";
import dotenv from "dotenv";
import {Stage} from "../modules/_httpCertify.js";

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const config = {
    pfx: fs.readFileSync(process.env.PFX_FILE_PATH || ''),
    passphrase: process.env.PFX_FILE_PASSPHRASE || '',
    stage: Stage[(process.env.STAGE || '').toUpperCase() as keyof typeof Stage]
}

const run = async () => {
    const data = {id: 123456789};
    const dccType = "V";
    const locId = "9bc7d6c873080af8c39453157a3937d32c779c909e78b0d8547dd20648994f1f";
    const txId = "aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647";

    const issued = await woodpecker.issue.fromLoc({
        stage: config.stage,
        data: data,
        dccType: dccType,
        locId: locId,
        txId: txId,
        pfxFile: config.pfx,
        passphrase: config.passphrase
    });

    console.log(Buffer.from(issued).toString('utf8'));

    return true;
};

run().then(r => r);


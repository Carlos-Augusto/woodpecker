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
    const pinged = await woodpecker.ping({
        stage: config.stage,
        pfxFile: config.pfx,
        passphrase: config.passphrase
    });
    console.log(Buffer.from(pinged).toString('utf8'));

    return true;
};

run().then(r => r);


import woodpecker from "../modules/woodpecker.js";
import fs from "fs";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const config = {
    pfx: process.env.PFX_FILE_PATH || '',
    passphrase: process.env.PFX_FILE_PASSPHRASE || '',
    stage: process.env.STAGE || ''
}

const pfx = fs.readFileSync(config.pfx);

const run = async () => {
    const pinged = await woodpecker.ping({stage:config.stage, pfxFile: pfx, passphrase: config.passphrase});
    console.log(Buffer.from(pinged).toString('utf8'));

    return true;
};

run().then(r => r);


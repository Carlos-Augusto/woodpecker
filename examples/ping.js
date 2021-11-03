import woodpecker from "../modules/woodpecker.js";
import fs from "fs";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const pfx = fs.readFileSync(process.env.PFX_FILE_PATH);
const passphrase = process.env.PFX_FILE_PASSPHRASE;
const stage = process.env.STAGE;

const run = async () => {
    const pinged = await woodpecker.ping(stage, pfx, passphrase);
    console.log(Buffer.from(pinged).toString('utf8'));

    return true;
};

run().then(r => r);


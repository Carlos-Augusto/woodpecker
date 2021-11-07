import woodpecker from "../modules/woodpecker.js";
import {config} from "../modules/_getConfig.js";

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


import woodpecker from "../modules/woodpecker.js";
import {config} from "../modules/_getConfig.js";

const run = async () => {
    const data = "HC1:6BFC80430FFWJWG.FKY*4GO0*+TAV7GVC5M5E6B0XK1JCSW83F30+GPGL3F30PGVHLY50.FK4IKPED3D3BRBJV2Y88*/ADDDA5COWVACEXZAUHK49AL.F1XGSSSQVK FIJIT+9UN7QDDB35EDFADRAELU8DJ.N6C+H*FQRN5*I3F5QM%E47RW70BKE-84I1";
    const txId = "aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647";
    const txTag = "Market-Tomato";
    const verifyFor = "EU";

    const verified = await woodpecker.verify({
        stage: config.stage,
        data: data,
        txId: txId,
        txTag: txTag,
        verifyFor: verifyFor,
        pfxFile: config.pfx,
        passphrase: config.passphrase
    });

    console.log(Buffer.from(verified).toString('utf8'));

    return true;
};

run().then(r => r);


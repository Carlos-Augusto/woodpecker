import {ServerOptions} from "https";
import fs from "fs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export const options: ServerOptions = {
    key: fs.readFileSync('tests/modules/fixtures/key.pem'),
    cert: fs.readFileSync('tests/modules/fixtures/cert.pem')
}

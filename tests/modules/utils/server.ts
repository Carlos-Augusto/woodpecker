import * as http from "http";
import {IncomingMessage, RequestListener, Server, ServerResponse} from "http";
import {once} from 'events';

//Inspired in https://github.com/node-fetch/node-fetch/blob/main/test/utils/server.js

export default class TestServer {
    server: Server
    hostname: string
    requestListener?: RequestListener

    constructor(hostname: string) {
        this.hostname = hostname || 'localhost'
        this.server = http.createServer(this.router)
        this.server.on('error', err => {
            console.log(err.stack)
        })
        this.server.on('connection', socket => {
            socket.setTimeout(1500)
        })
    }

    async start() {
        let host = this.hostname

        if (host.startsWith('[')) {
            // If we're trying to listen on an IPv6 literal hostname, strip the
            // square brackets before binding to the IPv6 address
            host = host.slice(1, -1)
        }

        this.server.listen(0, host)
        return once(this.server, 'listening')
    }

    async stop() {
        this.server.close()
        return once(this.server, 'close');
    }

    get port(): number {
        // @ts-ignore
        return this.server.address().port
    }

    mock(this: TestServer, requestListener?: RequestListener): string {
        //This is made so that the request listener can be "accessed"
        //properly on runtime.
        //see router
        // @ts-ignore
        this.server.requestListener  = requestListener;
        return `http://${this.hostname}:${this.port}`
    }

    router(req: IncomingMessage, res: ServerResponse) {
        //this this is not of the TestServer but of the Server.
        if (this.requestListener) {
            this.requestListener(req, res)
            this.requestListener = undefined
        } else {
            throw new Error('No mocked request listener. Use ’TestServer.mock()’.')
        }
    }

}
import { after, before, describe, it } from 'mocha'
import TestServer from './utils/serverHttps.js'
import assert from 'node:assert'
import { IncomingMessage, ServerResponse } from 'http'
import { options } from './utils/_serverOptions.js'
import woodpecker from '../../modules/woodpecker.js'
import { Buffer } from 'buffer'
import { Hint } from '../../modules/_httpCertify.js'

describe('ping', () => {
  const local = new TestServer('localhost', options)

  before(async () => {
    await local.start()
  })

  after(() => {
    return local.stop()
  })

  it('ping - pong', async () => {
    const expected = { version: '1.0', ok: true, data: 'Hallo, Hola, こんにちは, Hello, Salut, Hej, this is the Ubirch Certify Service.' }
    local.mock((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(expected))
    })

    const verified = await woodpecker.ping({
      stage: {
        hint: Hint.LOCAL,
        port: local.port.toString()
      },
      pfxFile: Buffer.from([]),
      passphrase: ''
    })

    assert(Buffer.from(verified).toString('utf8') === JSON.stringify(expected))
  })
})

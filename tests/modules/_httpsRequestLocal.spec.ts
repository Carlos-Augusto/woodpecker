import { describe, it, before, after } from 'mocha'
import TestServer from './utils/serverHttps.js'
import httpClient from '../../modules/_httpClient.js'
import assert from 'node:assert'
import { IncomingMessage, ServerResponse } from 'http'
import { options } from './utils/_serverOptions.js'

describe('_httpsRequest', () => {
  const local = new TestServer('localhost', options)
  let base: string

  before(async () => {
    await local.start()
    base = `https://${local.hostname}:${local.port}/`
  })

  after(() => {
    return local.stop()
  })

  it('be able to ready start request and read response', async () => {
    local.mock((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('hello world from https')
    })

    const res = await httpClient({
      url: base,
      details: {
        method: 'get'
      }
    })

    const body = await res.text()
    assert(body === 'hello world from https')
  })
})

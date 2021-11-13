import { describe, it, before, after } from 'mocha'
import TestServer from './utils/server.js'
import httpClient from '../../modules/_httpRequest.js'
import assert from 'node:assert'
import { IncomingMessage, ServerResponse } from 'http'

describe('_httpRequest', () => {
  const local = new TestServer('localhost')
  let base: string

  before(async () => {
    await local.start()
    base = `http://${local.hostname}:${local.port}/`
  })

  after(() => {
    return local.stop()
  })

  it('be able to ready start request and read response', async () => {
    local.mock((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('hello world')
    })

    const res = await httpClient({
      url: base,
      details: {
        method: 'get'
      }
    })

    const body = await res.text()
    assert(body === 'hello world')
  })
})

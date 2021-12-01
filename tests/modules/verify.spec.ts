import { after, before, describe, it } from 'mocha'
import TestServer from './utils/serverHttps.js'
import assert from 'node:assert'
import { IncomingMessage, ServerResponse } from 'http'
import { options } from './utils/_serverOptions.js'
import woodpecker from '../../modules/woodpecker.js'
import { Hint } from '../../modules/_httpCertify.js'

describe('v1.verify', () => {
  const local = new TestServer('localhost', options)

  before(async () => {
    await local.start()
  })

  after(() => {
    return local.stop()
  })

  it('generate certificate', async () => {
    local.mock((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ id: 123456789 }))
    })

    const data = 'HC1:6BFC80430FFWJWG.FKY*4GO0*+TAV7GVC5M5E6B0XK1JCSW83F38IHLFU3F329HRUOY50.FK4IKPED3D3BRBJV2-78%UH9LHVPD1*TKYHH%K2F5 ATOW7FN41CA$8W/%9-3G.EH/6JJR5DMGU23%XFA-8VJ6TBKX.4EUIQ:L+ CGLH76WZ48*/N8DAU6B$2'
    const txId = 'aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647'
    const txTag = 'Market-Tomato'
    const verifyFor = 'EU'

    const verified = await woodpecker.verify({
      stage: {
        hint: Hint.LOCAL,
        port: local.port.toString()
      },
      data: data,
      txId: txId,
      txTag: txTag,
      verifyFor: verifyFor
    })

    assert(verified === '{"id":123456789}')
  })
})

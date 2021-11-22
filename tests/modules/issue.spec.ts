import { after, before, describe, it } from 'mocha'
import TestServer from './utils/serverHttps.js'
import assert from 'node:assert'
import { IncomingMessage, ServerResponse } from 'http'
import { options } from './utils/_serverOptions.js'
import woodpecker from '../../modules/woodpecker.js'
import { Hint } from '../../modules/_httpCertify.js'

describe('issue', () => {
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
      res.setHeader('Content-Type', 'application/octet-stream')
      res.end(Buffer.from('0oRDoQEmoQRIdCE8ku79N/JYIGHCXbjLbeVYqf6tZr7TJ7PBsJFvxk1AbfBZfochQ29HWEDMuIvKQPn5FeCJze/+2f5lcQvrDMBXBnQEXU+wYRaiU6nLZP4NTh7gP2NcJgUWfPc0OzxCSmVg6YWIH9RhUYY8', 'base64'))
    })

    const data = { id: 123456789 }
    const dccType = 'V'
    const locId = '9bc7d6c873080af8c39453157a3937d32c779c909e78b0d8547dd20648994f1f'
    const txId = 'aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647'

    const issued = await woodpecker.issue.fromLoc({
      stage: {
        hint: Hint.LOCAL,
        port: local.port.toString()
      },
      data: data,
      issuer: 'DE',
      expireAfterDays: 1,
      dccType: dccType,
      locId: locId,
      txId: txId,
      pfxFile: Buffer.from([]),
      passphrase: ''
    })
    assert(issued !== '')
  })
})

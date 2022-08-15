import woodpecker from '../modules/woodpecker.js'
import { config } from '../modules/_getConfig.js'
import { Buffer } from 'buffer'

const run = async () => {
  const data = { id: 123456789 }

  const issued = await woodpecker.issue.fromIdentityId({
    stage: {
      hint: config.stage
    },
    data: JSON.stringify(data),
    identity: '776d1279-bb02-55e7-9da1-e2d01a14a758',
    credentials: {
      pfxFile: config.pfx,
      passphrase: config.passphrase
    }
  })

  console.log(Buffer.from(issued).toString('utf8'))

  return true
}

run().then(r => r)

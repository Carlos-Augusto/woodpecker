import woodpecker from '../modules/woodpecker.js'
import { config } from '../modules/_getConfig.js'
import { Buffer } from 'buffer'

const run = async () => {
  const data = 'HC1:6BFC80430FFWJWG.FKY*4GO0*+TAV7GVC5M5E6B0XK1JCSW83F38IHLFU3F329HRUOY50.FK4IKPED3D3BRBJV2-78%UH9LHVPD1*TKYHH%K2F5 ATOW7FN41CA$8W/%9-3G.EH/6JJR5DMGU23%XFA-8VJ6TBKX.4EUIQ:L+ CGLH76WZ48*/N8DAU6B$2'
  const txId = 'aaf72587a67951c1c446b7032288162239dbcfdda1414cf7bb015b01260f1647'
  const txTag = 'Market-Tomato'
  const verifyFor = 'EU'

  const verified = await woodpecker.verify({
    stage: {
      hint: config.stage
    },
    data: data,
    txId: txId,
    txTag: txTag,
    verifyFor: verifyFor,
    pfxFile: config.pfx,
    passphrase: config.passphrase
  })

  console.log(Buffer.from(verified).toString('utf8'))

  return true
}

run().then(r => r)

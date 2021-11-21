import httpClient from './_httpClient.js'
import https from 'https'
import { BodyInit, HeadersInit } from 'node-fetch'
import { HttpCredential, Stage, Hint } from './_httpCertify.js'
import { URL } from 'url'

interface VerifyRequest extends HttpCredential {
    stage: Stage,
    path: string,
    method: string,
    body: BodyInit | null,
    headers: HeadersInit
}

export default async (verifyRequest: VerifyRequest) => {
  if (verifyRequest.stage === undefined) {
    throw new Error("Stage can't be empty.")
  }

  let httpsAgent = new https.Agent({
    keepAlive: true,
    pfx: verifyRequest.pfxFile,
    passphrase: verifyRequest.passphrase
  })

  const url = new URL(verifyRequest.path, 'https://api.uve.' + verifyRequest.stage.hint + '.ubirch.com')
  if (verifyRequest.stage.port) {
    url.port = verifyRequest.stage.port
  }
  if (verifyRequest.stage.hint === Hint.PROD) {
    url.host = 'api.uve.ubirch.com'
  }
  if (verifyRequest.stage.hint === Hint.LOCAL) {
    url.host = 'localhost'
    httpsAgent = new https.Agent({})
  }

  return await httpClient({
    url: url.toString(),
    details: {
      body: verifyRequest.body,
      method: verifyRequest.method,
      headers: verifyRequest.headers,
      agent: httpsAgent
    }
  })
}

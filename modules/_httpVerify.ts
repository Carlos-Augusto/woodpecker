import httpClient from './_httpRequest.js'
import https from 'https'
import { BodyInit, HeadersInit } from 'node-fetch'
import { HttpCredential, Stage } from './_httpCertify.js'

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

  let url = 'https://api.uve.' + verifyRequest.stage + '.ubirch.com' + verifyRequest.path
  if (verifyRequest.stage === Stage.PROD) {
    url = 'https://api.uve.ubirch.com' + verifyRequest.path
  }

  const httpsAgent = new https.Agent({
    keepAlive: true,
    pfx: verifyRequest.pfxFile,
    passphrase: verifyRequest.passphrase
  })

  return await httpClient({
    url: url,
    details: {
      body: verifyRequest.body,
      method: verifyRequest.method,
      headers: verifyRequest.headers,
      agent: httpsAgent
    }
  })
}

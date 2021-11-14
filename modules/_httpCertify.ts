import httpClient from './_httpRequest.js'
import https from 'https'
import { BodyInit, HeadersInit, Response } from 'node-fetch'
import { Buffer } from 'buffer'
import * as Path from 'path'

export enum Stage {
    DEV = 'dev',
    DEMO = 'demo',
    QA = 'qa',
    PROD = 'prod'
}

export interface HttpCredential {
    pfxFile: Buffer,
    passphrase: string
}

export interface CertifyRequest extends HttpCredential {
    stage: Stage,
    path: string,
    method: string,
    body: BodyInit | null,
    headers: HeadersInit
}

export default async (certifyRequest: CertifyRequest): Promise<Response> => {
  if (certifyRequest.stage === undefined) {
    throw new Error("Stage can't be empty.")
  }

  let url = Path.join('https://api.certify.' + certifyRequest.stage + '.ubirch.com', certifyRequest.path)
  if (certifyRequest.stage === Stage.PROD) {
    url = Path.join('https://api.certify.ubirch.com', certifyRequest.path)
  }

  const httpsAgent = new https.Agent({
    keepAlive: true,
    pfx: certifyRequest.pfxFile,
    passphrase: certifyRequest.passphrase
  })

  return await httpClient({
    url: url,
    details: {
      body: certifyRequest.body,
      method: certifyRequest.method,
      headers: certifyRequest.headers,
      agent: httpsAgent
    }
  })
}

import httpVerify from './_httpVerify.js'
import { HttpCredential, Stage } from './_httpCertify.js'
import { HeadersInit } from 'node-fetch'

export interface Verify<V> extends HttpCredential {
    stage: Stage,
    data: V,
    txId: string,
    txTag: string,
    verifyFor: string,
    validateFor?: string
}

export const verify = async (verify: Verify<any>): Promise<string> => {
  let path = '/api/uve/v1/verify'
  const headers: HeadersInit = {
    'X-Transaction-Id': verify.txId,
    'X-Transaction-Tag': verify.txTag,
    'X-Verify-For': verify.verifyFor,
    'Content-Type': 'text/plain'
  }

  // This validation only applies for health DCCs
  if (verify.validateFor) {
    path = '/api/uve/v2/verify'
    headers['X-Validate-For'] = verify.validateFor
  }

  const resp = await httpVerify({
    stage: verify.stage,
    path: path,
    method: 'post',
    body: verify.data,
    headers: headers,
    pfxFile: verify.pfxFile,
    passphrase: verify.passphrase
  })

  return await resp.text()
}

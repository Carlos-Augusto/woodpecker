import httpVerify from './_httpVerify.js'
import { HttpCredential, Stage } from './_httpCertify.js'

export interface Verify<V> extends HttpCredential {
    stage: Stage,
    data: V,
    txId: string,
    txTag: string,
    verifyFor: string
}

export const verify = async (verify: Verify<any>): Promise<string> => {
  const path = '/api/uve/v1/verify'
  const headers = {
    'X-Transaction-Id': verify.txId,
    'X-Transaction-Tag': verify.txTag,
    'X-Verify-For': verify.verifyFor,
    'Content-Type': 'text/plain'
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

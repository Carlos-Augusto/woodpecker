import httpVerify from './_httpVerify.js'
import { HttpCredential, Stage } from './_httpCertify.js'
import { HeadersInit } from 'node-fetch'

/**
 * Represents a Verification, that's to say, a verifying event.
 */
export interface Verify<V> extends HttpCredential {
    stage: Stage,
    data: V,
    txId: string,
    txTag: string,
    verifyFor: string,
    validateFor?: string,
    dateToCheck?: string,
    verbose?: boolean
}

/**
 * Core function for verification of certificates.
 * It supports versions V1 and V2 of the verification API.
 * The V2 is activated by using X-Validate-For or X-Date-To-Check
 * @param verify Verification data
 */
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

  if (verify.dateToCheck) {
    path = '/api/uve/v2/verify'
    headers['X-Date-To-Check'] = verify.dateToCheck
  }

  if (verify.verbose) {
    path = '/api/uve/v2/verify?verbose=true'
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

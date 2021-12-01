import dotenv from 'dotenv'
import fs from 'fs'
import process from 'process'

import { getStageHint } from './_getStage.js'

// Makes sure that the config is properly read
const result = dotenv.config()
if (result.error) {
  throw result.error
}

/**
 * A simple configuration object that represents
 * the client certificate in pfx format, its password, and its stage.
 */
export const config = {
  pfx: fs.readFileSync(process.env.PFX_FILE_PATH || ''),
  passphrase: process.env.PFX_FILE_PASSPHRASE || '',
  stage: getStageHint(process.env.STAGE || '')
}

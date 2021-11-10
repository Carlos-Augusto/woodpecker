import dotenv from 'dotenv'
import fs from 'fs'
import process from 'process'

import { getStage } from '../modules/_getStage.js'

const result = dotenv.config()
if (result.error) {
  throw result.error
}

export const config = {
  pfx: fs.readFileSync(process.env.PFX_FILE_PATH || ''),
  passphrase: process.env.PFX_FILE_PASSPHRASE || '',
  stage: getStage(process.env.STAGE || '')
}

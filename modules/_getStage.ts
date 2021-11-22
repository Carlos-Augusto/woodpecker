import { Hint } from './_httpCertify.js'

export const getStageHint = (stage: string) => {
  return Hint[stage.toUpperCase() as keyof typeof Hint]
}

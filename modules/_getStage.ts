import { Stage } from './_httpCertify.js'

export const getStage = (stage: string) => {
  return Stage[stage.toUpperCase() as keyof typeof Stage]
}

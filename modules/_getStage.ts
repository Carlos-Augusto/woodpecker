import { Hint } from './_httpCertify.js'

/**
 * Helper function that transforms stage/hint from string into Hint.
 * @param stage stage in string, see Hint for more reference.
 */
export const getStageHint = (stage: string) => {
  return Hint[stage.toUpperCase() as keyof typeof Hint]
}

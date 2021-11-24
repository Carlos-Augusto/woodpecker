import ping from './ping.js'
import issue from './issue.js'
import { verify } from './verify.js'

/**
 * Principal wrapper or access point for the API.
 * It offers, a ping, issue, and verify functions.
 */
export default { ping, issue, verify }

import assert from 'node:assert'
import { getStage } from '../../modules/_getStage.js'
import { describe, it } from 'mocha'
import { Stage } from '../../modules/_httpCertify.js'

describe('_getStage', () => {
  it('get DEV Stage from dev string', () => {
    const stage = getStage('dev')
    assert(stage === Stage.DEV)
  })
  it('get DEMO Stage from demo string', () => {
    const stage = getStage('demo')
    assert(stage === Stage.DEMO)
  })
  it('get QA Stage from qa string', () => {
    const stage = getStage('qa')
    assert(stage === Stage.QA)
  })
  it('get PROD Stage from prod string', () => {
    const stage = getStage('prod')
    assert(stage === Stage.PROD)
  })
  it('get DEV Stage from DEV string', () => {
    const stage = getStage('DEV')
    assert(stage === Stage.DEV)
  })
  it('get DEMO Stage from DEMI string', () => {
    const stage = getStage('DEMO')
    assert(stage === Stage.DEMO)
  })
  it('get QA Stage from QA string', () => {
    const stage = getStage('QA')
    assert(stage === Stage.QA)
  })
  it('get PROD Stage from PROD string', () => {
    const stage = getStage('PROD')
    assert(stage === Stage.PROD)
  })
  it('undefined from unknown UNK string', () => {
    const stage = getStage('other')
    assert(stage === undefined)
  })
})

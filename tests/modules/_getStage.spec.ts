import assert from 'node:assert'
import { getStageHint } from '../../modules/_getStage.js'
import { describe, it } from 'mocha'
import { Hint } from '../../modules/_httpCertify.js'

describe('_getStage', () => {
  it('get DEV Stage from dev string', () => {
    const stage = getStageHint('dev')
    assert(stage === Hint.DEV)
  })
  it('get DEMO Stage from demo string', () => {
    const stage = getStageHint('demo')
    assert(stage === Hint.DEMO)
  })
  it('get QA Stage from qa string', () => {
    const stage = getStageHint('qa')
    assert(stage === Hint.QA)
  })
  it('get PROD Stage from prod string', () => {
    const stage = getStageHint('prod')
    assert(stage === Hint.PROD)
  })
  it('get DEV Stage from DEV string', () => {
    const stage = getStageHint('DEV')
    assert(stage === Hint.DEV)
  })
  it('get DEMO Stage from DEMI string', () => {
    const stage = getStageHint('DEMO')
    assert(stage === Hint.DEMO)
  })
  it('get QA Stage from QA string', () => {
    const stage = getStageHint('QA')
    assert(stage === Hint.QA)
  })
  it('get PROD Stage from PROD string', () => {
    const stage = getStageHint('PROD')
    assert(stage === Hint.PROD)
  })
  it('undefined from unknown UNK string', () => {
    const stage = getStageHint('other')
    assert(stage === undefined)
  })
})

import { getArgs } from '../lib/utils.js'
import { fork } from 'node:child_process'
import fs from 'node:fs/promises'

const [target] = getArgs()

try {
  await import('./cp.js')

  await fs.access(target, fs.constants.F_OK)

  await import('./rm.js')
} catch (err) {
  console.log(`Error deleting file ${err.path}, ${err.code}`)
}

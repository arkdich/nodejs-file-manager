import { getArgs } from '../lib/utils.js'
import { fork } from 'node:child_process'
import fs from 'node:fs/promises'

export const [target] = getArgs()

try {
  await fs.unlink(target)

  console.log(`Successfully deleted file ${target}`)
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log(`Error, file ${err.path} doesn't exist\n`)
  } else {
    throw err
  }
}

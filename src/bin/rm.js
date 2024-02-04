import { getArgs } from '../lib/utils.js'
import { fork } from 'node:child_process'
import fs from 'node:fs/promises'

const [target] = getArgs()

if (!target) {
  console.log(`Invalid input, you must provide target path`)
  process.exit(1)
}

try {
  await fs.unlink(target)

  console.log(`Successfully deleted file ${target}`)
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
}

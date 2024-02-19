import { rename } from 'node:fs/promises'
import { getArgs, paintText } from '../lib/utils.js'

const [target, dest] = getArgs()

if (!target || !dest) {
  console.log(`Invalid input, you must provide target and destination paths`)
  process.exit(1)
}

try {
  await rename(target, dest)

  console.log(`Successfully renamed ${paintText(target)} to ${dest}`)
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
  process.exitCode = 1
}

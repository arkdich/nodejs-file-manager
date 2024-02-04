import { constants, createReadStream, createWriteStream } from 'node:fs'
import { access, copyFile, cp, rename } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { getArgs } from '../lib/utils.js'

const [target, dest] = getArgs()

if (!target || !dest) {
  console.log(`Invalid input, you must provide target and destination paths`)
  process.exit(1)
}

try {
  await access(target, constants.F_OK)

  const readStream = createReadStream(target)
  const writeStream = createWriteStream(dest, {
    flags: 'wx',
  })

  await pipeline(readStream, writeStream)

  console.log(`Successfully copied contents of ${target} into ${dest}`)
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
}

import { createBrotliDecompress } from 'node:zlib'
import { getArgs, paintText } from '../lib/utils.js'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { access, constants } from 'node:fs/promises'

const [target, dest] = getArgs()

if (!target || !dest) {
  console.log(`Invalid input, you must provide target and destination paths`)
  process.exit(1)
}

try {
  await access(target, constants.R_OK)

  const readStream = createReadStream(target)
  const writeStream = createWriteStream(dest, { flags: 'wx' })
  const compressStream = createBrotliDecompress()

  await pipeline(readStream, compressStream, writeStream)

  console.log(
    `Successfully decompressed ${paintText(target)} into ${paintText(dest)}`
  )
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
  process.exitCode = 1
}

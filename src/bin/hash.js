import { createHash } from 'crypto'
import { createReadStream } from 'fs'
import { getArgs, paintText } from '../lib/utils.js'

const [file] = getArgs()
const hashAlgorithm = 'sha1'

if (!file) {
  console.error(`Invalid input, please provide file path`)
  process.exit(1)
}

const hash = createHash(hashAlgorithm, { encoding: 'utf-8' })
const readStream = createReadStream(file, { encoding: 'utf-8' })

readStream.on('data', (data) => {
  hash.update(data)
})

readStream.on('end', () => {
  console.log(
    `${paintText(hashAlgorithm)} hash for file ${paintText(
      file
    )} is ${paintText(hash.digest('hex'))}`
  )
})

readStream.on('error', (err) => {
  console.log(`Operation failed, ${err.message}`)
})

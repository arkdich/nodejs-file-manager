import { constants, createReadStream, createWriteStream } from 'node:fs'
import { access, copyFile, cp, rename } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { getArgs } from '../lib/utils.js'

const [target, destination] = getArgs()

try {
  await access(target, constants.F_OK)

  const readStream = createReadStream(target)
  const writeStream = createWriteStream(destination, {
    flags: 'wx',
  })

  await pipeline(readStream, writeStream)

  console.log(`Successfully copied contents of ${target} into ${destination}`)
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log(`Error, file ${err.path} doesn't exist\n`)
  } else if (err.code === 'EEXIST') {
    console.log(`Error, file ${err.path} already exists\n`)
  } else {
    throw err
  }
}

import { rename } from 'node:fs/promises'
import { getArgs } from '../lib/utils.js'

const [target, destination] = getArgs()

try {
  await rename(target, destination)

  console.log(`Successfully renamed ${target} to ${destination}`)
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log(`Error, file ${err.path} doesn't exist`)
  } else {
    throw err
  }
}

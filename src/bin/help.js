import { rename } from 'node:fs/promises'
import { AVAILABLE_COMMANDS } from '../lib/constants.js'

console.log('\nSupported commands: ')
AVAILABLE_COMMANDS.forEach((command) => {
  console.log('* \x1b[32m%s\x1b[0m - %s', command.name, command.desc)
})

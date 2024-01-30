import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'
import { parseArgs } from './lib/parse-args.js'
import { shutdown } from './lib/utils/shutdown.js'
import { printWorkingDirectory } from './lib/utils/print-utils.js'
import {
  changeDirectory,
  goUpInFileSystem,
  listDirectory,
} from './lib/navigation.js'

global.inputArgs = parseArgs(process.argv)
process.chdir(os.homedir())

if (global.inputArgs.username) {
  process.stdout.write(
    `Welcome to the File Manager, ${global.inputArgs.username}!\n`
  )
}

printWorkingDirectory()

process.stdin.setEncoding('utf-8').on('data', async (input) => {
  const parsedInput = input.trim().split(' ')

  const command = parsedInput[0]
  const args = parsedInput.slice(1)

  switch (command) {
    case '.exit':
      shutdown()
      break
    case 'up':
      goUpInFileSystem()
      break
    case 'cd':
      changeDirectory(args[0])
      break
    case 'ls':
      await listDirectory(args[0])
      break
    default:
      process.stdout.write('Invalid input\n')
      break
  }

  printWorkingDirectory()
})

process.on('SIGINT', shutdown)

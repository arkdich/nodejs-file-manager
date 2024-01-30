import { parseArgs } from './lib/parse-args.js'
import path from 'node:path'
import fs from 'node:fs/promises'
import { shutdown } from './lib/utils/shutdown.js'
import { printWorkingDirectory } from './lib/utils/print-utils.js'
import os from 'node:os'

global.inputArgs = parseArgs(process.argv)
process.chdir(os.homedir())

if (global.inputArgs.username) {
  process.stdout.write(
    `Welcome to the File Manager, ${global.inputArgs.username}!\n`
  )
}

printWorkingDirectory()

process.stdin.setEncoding('utf-8').on('data', (input) => {
  const parsedInput = input.trim()

  switch (parsedInput) {
    case '.exit':
      shutdown()
      printWorkingDirectory()
      return
  }
})

process.on('SIGINT', shutdown)

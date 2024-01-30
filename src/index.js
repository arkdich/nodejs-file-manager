import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'
import { parseArgs } from './lib/parse-args.js'
import { fork } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { getCommandPath, printWorkingDirectory, shutdown } from './lib/utils.js'

global.inputArgs = parseArgs(process.argv)
process.chdir(os.homedir())

const AVAILABEL_COMMANDS = ['.exit', 'up', 'cd', 'ls', 'cat', 'add']

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

  if (!AVAILABEL_COMMANDS.includes(command)) {
    process.stdout.write(`Invalid input, command ${command} is not supported\n`)

    return
  }

  switch (command) {
    case '.exit':
      shutdown()
      return
    case 'up':
    case 'cd':
      process.chdir(args[0] ?? '..')
      printWorkingDirectory()
      return
  }

  const cmdPath = getCommandPath(command)
  const child = fork(cmdPath, args)

  child.on('close', printWorkingDirectory)
})

process.on('SIGINT', shutdown)

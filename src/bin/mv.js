import { createWriteStream, openSync } from 'node:fs'
import { getArgs } from '../lib/utils.js'
import { fork, spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const [target, dest] = getArgs()

try {
  const dir = path.dirname(fileURLToPath(import.meta.url))
  const copyUtilPath = path.join(dir, 'cp.js')
  const deleteUtilPath = path.join(dir, 'rm.js')

  const copyProcess = fork(copyUtilPath, [target, dest])

  copyProcess.on('exit', (code) => {
    if (code !== 0) return

    const deleteProcess = fork(deleteUtilPath, [target])
  })
} catch (err) {
  console.log(`Operation failed, ${err.message}`)
  process.exitCode = 1
}

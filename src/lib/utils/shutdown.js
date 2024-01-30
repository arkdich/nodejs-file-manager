export const shutdown = () => {
  process.stdout.write(
    `Thank you for using File Manager, ${global.inputArgs.username}, goodbye!\n`
  )

  process.exit(0)
}

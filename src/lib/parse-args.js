export const parseArgs = (args) => {
  try {
    const filteredArgs = args.filter((arg) => arg.startsWith('--'))

    const parsedArgs = filteredArgs.reduce((result, current) => {
      const [key, value] = current.split('=')

      result[key.substring(2)] = value

      return result
    }, {})

    return parsedArgs
  } catch (error) {
    throw new Error(
      'Invalid arg format, provide args in a format of --key=value'
    )
  }
}

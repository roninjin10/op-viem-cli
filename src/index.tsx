import { cac } from 'cac'
import * as React from 'react'
import packageJson from '../package.json'

const cli = cac('op')

cli
  .command('depositETH', 'Deposits .042 eth to optimism goerli')
  .action(async () => {
    const { App } = await import('./App.js')
    const { render } = await import('ink')
    render(<App />)
  })

cli.help()
cli.version(packageJson.version)

void (async () => {
  try {
    console.clear()
    cli.parse(process.argv, { run: false })
    await cli.runMatchedCommand()
  } catch (error) {
    console.error(`\n${(error as Error).message}`)
    process.exit(1)
  }
})()

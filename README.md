## ✨ op-viem cli

Wrapping op-viem in a cli to interact with optimism from the command line using react.js and bun

![image](https://github.com/roninjin10/op-viem-cli/assets/35039927/a7bfe5cb-7527-4b05-b290-f36746a4965f)

## 🤝 Getting Started

1. Install Node Modules

```
bun install
```

2. Run help script

```
bun op --help
```

3. Add `PRIVATE_KEY` with goerli eth on it to `./.env`

```
echo 0x23423... > .env
```
4. Run `depositETH` in `--watch` mode

```
bun dev depositETH
```

## Additional env variables

Other env variables that can be set are in [src/env](./src/env.ts)

## React

This cli app is built with [react.js](https://react.dev/) using [ink](https://github.com/vadimdemedes/ink). Ink provides a custom renderer to allow react to render to command line.

## Op-viem

This cli wraps [op-viem](https://github.com/base-org/op-viem). Viem Extension for OP Stack Chains

## Executable

This cli uses bun to [compile to an executable](https://bun.sh/docs/bundler/executables)

```
bun run build
```

This currently does not work because of a [bug in bun](https://github.com/oven-sh/bun/issues/6567)

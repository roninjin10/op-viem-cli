import { createWalletClient } from 'viem'
import { walletL1OpStackActions } from '@roninjin10/op-viem'
import { env } from './env'

export const l1WalletClient = createWalletClient({
	chain: env.l1Chain,
	transport: env.l1Rpc,
	account: env.account,
}).extend(walletL1OpStackActions)
export const l2WalletClient = createWalletClient({
	chain: env.l2Chain,
	transport: env.l2Rpc,
	account: env.account,
}).extend(walletL1OpStackActions)


import { privateKeyToAccount } from 'viem/accounts'
import { z } from 'zod'
import * as chains from 'viem/chains'
import * as l2Chains from '@roninjin10/op-viem/chains'
import { http, parseEther } from 'viem'
import { OpStackChain } from '@roninjin10/op-viem'

export const env = {
	account: z.string().optional().transform(privateKey => {
		if (!privateKey) {
			throw new Error('No private key provided')
		}
		return privateKeyToAccount(privateKey as any)
	}).describe('Private key to use to deposit').parse(process.env.PRIVATE_KEY),
	amount: z.string().optional().default('.00042').transform(amountStr => {
		return parseEther(amountStr)
	}).describe('Amount to use parsed in Goerli ETH').parse(process.env.AMOUNT),
	l1Chain: z.string().optional().default('5').transform(value => {
		const id = Number.parseInt(value)
		const chain = Object.values(chains).find((chain: chains.Chain) => {
			return chain.id === id
		})
		if (!chain) {
			throw new Error(`no chain found for chain id ${id}`)
		}
		return chain as chains.Chain
	}).describe('Chain ID to use for deposit').parse(process.env.L1_CHAIN_ID),
	l2Chain: z.string().optional().default('420').transform(value => {
		const id = Number.parseInt(value)
		const chain = Object.values(l2Chains).find(chain => {
			return chain.id === id
		})
		if (!chain) {
			throw new Error(`no chain found for chain id ${id}`)
		}
		return chain as OpStackChain
	}).describe('Chain ID to use for deposit').parse(process.env.L2_CHAIN_ID),
	l1Rpc: z.string().optional().default('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161').transform(uri => {
		return http(uri)
	}).describe('RPC URI to use for deposit. Defaults to public infura api which is subject to throttling').parse(process.env.L1_RPC_URI),
	l2Rpc: z.string().optional().default('https://goerli.optimism.io').transform(uri => {
		return http(uri)
	}).describe('RPC URI to use for deposit').parse(process.env.L2_RPC_URI),
}


import { publicL1OpStackActions, publicL2OpStackActions } from '@roninjin10/op-viem'
import { env } from './env'
import { createPublicClient } from 'viem'

export const l1PublicClient = createPublicClient({
	chain: env.l1Chain,
	transport: env.l1Rpc,
}).extend(publicL1OpStackActions)
export const l2PublicClient = createPublicClient({
	chain: env.l2Chain,
	transport: env.l2Rpc,
}).extend(publicL2OpStackActions)


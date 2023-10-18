import { type env } from './env.js'
import { l1WalletClient } from './walletClient.js';
import { l1PublicClient } from './publicClient.js';

export const depositEth = async (options: { env: typeof env, onL1Success: (hash: string) => void, onL2Success: (hash: string) => void, onError: (err: Error) => void }) => {
  const l1Hash = await l1WalletClient.writeDepositETH({
    account: options.env.account,
    l2Chain: options.env.l2Chain,
    value: options.env.amount,
    args: { minGasLimit: 200_000, to: options.env.account.address }
  })
  options.onL1Success(l1Hash)
  await l1PublicClient.waitForTransactionReceipt({ hash: l1Hash })
  const l2Hashes = await l1PublicClient.getL2HashesForDepositTx({ l1TxHash: l1Hash })
    .catch((err) => {
      options.onError(err)
      throw err
    })
  options.onL2Success(l2Hashes[0])
}



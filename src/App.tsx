import { Text, useApp } from 'ink'
import * as React from 'react'
import { depositEth } from './depositEth';
import { env } from './env';

export const App: React.FC = () => {
  const { exit } = useApp();
  const [l1Hash, setL1Hash] = React.useState('')
  const [l2Hash, setL2Hash] = React.useState('')
  const [err, setErr] = React.useState('')
  const [loadingText, setLoadingText] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        switch (prevText) {
          case '':
            return '.';
          case '.':
            return '..';
          case '..':
            return '...';
          case '...':
            return '';
          default:
            throw new Error('Unexpected')
        }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    depositEth({
      env,
      onL1Success: setL1Hash,
      onL2Success: (l2Hash) => {
        setL2Hash(l2Hash)
        setTimeout(() => {
          exit()
        }, 1)
      },
      onError: err => {
        setErr(err.message)
        setTimeout(() => {
          exit()
        }, 1)
      }
    })
  }, [])
  const etherscanLinkL1DepositEth = l1Hash && `${env.l1Chain.blockExplorers?.etherscan?.url}/tx/${l1Hash}`
  const etherscanLinkL2DepositEth = l2Hash && `${env.l2Chain.blockExplorers?.etherscan?.url}/tx/${l2Hash}`
  return (
    <>
      {
        l2Hash === '' && err === '' && <Text color="gray">{l1Hash ? 'waiting for l2 hash' : 'waiting for l1 hash'}{loadingText}</Text>
      }
      {
        l1Hash !== '' && <>
          <Text color={l2Hash === '' ? "blue" : "green"}>{etherscanLinkL1DepositEth}</Text>
        </>
      }
      {
        l2Hash !== '' && <>
          <Text color="green">{etherscanLinkL2DepositEth}</Text>
        </>
      }
      {
        err !== '' && <>
          <Text color="red">{err}</Text>
        </>
      }
    </>
  )
}



import { Box, Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from 'constants/constants'
import { useEagerConnect } from 'hooks/useEagerConnect'
import { useInactiveListener } from 'hooks/useInactiveListener'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { accountStore } from 'stores/accountStore'
import { web3Store } from 'stores/web3Store'
import { WalletType } from 'types/enums'
import { shortenAddress } from 'utils/shortenAddress'
import Web3 from 'web3'

export const ConnectWalletButton = observer(() => {
  const { active, activate, account, chainId, library } = useWeb3React<Web3>()

  // * handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // * handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!web3Store.walletType)

  useEffect(() => {
    if (active && library && chainId && account) {
      web3Store.setInstance(library)
      web3Store.setChainId(chainId)
      accountStore.setAddress(account)
    } else {
      web3Store.setInstance(undefined)
      web3Store.setChainId(undefined)
      accountStore.setAddress('')
    }

    web3Store.setActive(active)
  }, [active, library, chainId, account])

  const connectWallet = async () => {
    await activate(injectedConnector)
    web3Store.setWalletType(WalletType.BrowserWallet)
  }

  return (
    <Box>
      <Button variant="contained" onClick={connectWallet}>
        {accountStore.address!! ? shortenAddress(accountStore.address) : 'Connect Wallet'}
      </Button>
    </Box>
  )
})

import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'

import { WalletType } from 'types/enums'

import { web3Store } from 'stores/web3Store'
import { injectedConnector } from 'constants/constants'

/**
 *
 * @param {boolean} suppress Use to suppress auto activate wallet, but still subscribed `chainChanged` event.
 */
export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const provider = web3Store?.instance?.currentProvider as any

    const enableAutoActivate = provider && provider.on && !active && !error && !suppress
    const subscribeChainChanged =
      web3Store.active && web3Store.instance && web3Store.walletType === WalletType.BrowserWallet

    const handleConnect = () => {
      console.log("Handling 'connect' event")
      activate(injectedConnector)
    }

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Handling 'accountsChanged' event with payload", accounts)
      if (accounts.length > 0) {
        activate(injectedConnector)
      }
    }

    const handleChainChanged = (chainId: string | number) => {
      console.log("Handling 'chainChanged' event with payload", chainId)
      window.location.reload()
    }

    if (enableAutoActivate) {
      provider.on('connect', handleConnect)
      provider.on('accountsChanged', handleAccountsChanged)
    }
    if (subscribeChainChanged) {
      provider.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (provider?.removeListener) {
        if (enableAutoActivate) {
          provider.removeListener('connect', handleConnect)
          provider.removeListener('accountsChanged', handleAccountsChanged)
        }
        if (subscribeChainChanged) {
          provider.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [web3Store.active, web3Store.instance, error, suppress, activate])
}

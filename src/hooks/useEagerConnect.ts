import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { web3Store } from 'stores/web3Store'

import { WalletType } from 'types/enums'
import { injectedConnector } from 'constants/constants'

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState<boolean>(false)

  const activateWallet = () => {
    if (!active) {
      setTimeout(
        () =>
          activate(injectedConnector, undefined, true)
            .then(() => web3Store.setWalletType(WalletType.BrowserWallet))
            .catch(() => setTried(true)),
        100,
      )
    }
  }

  useEffect(() => {
    activateWallet()
  }, []) // * intentionally only running on mount (make sure it's only mounted once :))

  // * if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

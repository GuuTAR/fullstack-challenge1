import { SUPPORTED_CHAINS } from 'constants/constants'
import { web3Store } from 'stores/web3Store'

import { WalletType } from 'types/enums'

class Web3Service {
  switchChain = async (chainId: number) => {
    const walletType = web3Store.walletType
    const hexChainId = web3Store.instance?.utils.numberToHex(chainId)

    if (walletType === WalletType.BrowserWallet) {
      try {
        const provider = web3Store.instance?.currentProvider as any
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexChainId }],
        })
        // window.location.reload()
      } catch (switchError) {
        if (switchError.code === 4902) {
          await this.setupNetwork(chainId)
        } else {
          console.error(`[SwitchErrorChain] Error on switch network`)
          console.error(switchError)
        }
      }
    }
  }

  setupNetwork = async (chainId: number) => {
    const walletType = web3Store.walletType
    if (walletType === WalletType.BrowserWallet) {
      const hexChainId = web3Store.instance?.utils.numberToHex(chainId)
      const { rpcEndpoint, explorer, name, nativeCurrency } = SUPPORTED_CHAINS[chainId]

      try {
        const provider = web3Store.instance?.currentProvider as any
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: hexChainId,
              rpcUrls: [rpcEndpoint],
              chainName: name,
              blockExplorerUrls: [explorer],
              ...(nativeCurrency && { nativeCurrency }),
            },
          ],
        })
      } catch (addError) {
        console.error(`[AddEthereumChain] Error on adding network`)
        console.error(addError)
      }
    }
  }

  convertHexToNumberString = (hex: string) => {
    return web3Store.instance?.utils.hexToNumberString(hex)
  }
}

export const web3Service = new Web3Service()

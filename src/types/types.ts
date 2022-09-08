import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'

export interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
}

export type ChainInfo = {
  name: string
  shortName: string
  logo: string
  explorer: string
  explorerName: string
  rpcEndpoint: string
  tierSupported: boolean
  cgkNativeTokenId: string
  // This is optional for primary chains in Metamask, including Mainnet and its four horsemen of testnet
  // (Mainnet, Kovan, Rinkeby, Goerli, Ropsten)
  nativeCurrency?: NativeCurrency
}

export type Balances = Record<string, BigNumber>

export type ABI = AbiItem | AbiItem[]

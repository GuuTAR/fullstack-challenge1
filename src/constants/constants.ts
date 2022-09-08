import { InjectedConnector } from '@web3-react/injected-connector'
import { ChainInfo } from 'types/types'

export const CHAINSTACK_RPC = 'https://nd-083-070-972.p2pify.com/fa2e0551fdda60e8cf2096c095880bde'

export const SUPPORTED_CHAINS: Record<number, ChainInfo> = {
  1: {
    name: 'Ethereum Mainnet',
    shortName: 'Ethereum',
    logo: '/static/logos/eth.svg',
    explorer: 'https://etherscan.io/',
    explorerName: 'Etherscan',
    rpcEndpoint: CHAINSTACK_RPC,
    tierSupported: true,
    cgkNativeTokenId: 'ethereum',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  },
  4: {
    name: 'Rinkeby Test Network',
    shortName: 'Rinkeby',
    explorerName: 'Etherscan',
    logo: '/static/logos/eth.png',
    rpcEndpoint: CHAINSTACK_RPC,
    tierSupported: false,
    cgkNativeTokenId: 'ethereum',
    explorer: 'https://rinkeby.etherscan.io/',
  },
  // 56: {
  //   name: 'Binance Smart Chain Mainnet',
  //   shortName: 'BSC',
  //   logo: '/static/logos/binance.png',
  //   explorer: 'https://bscscan.com/',
  // },
  43114: {
    name: 'AVAX Mainnet',
    shortName: 'Avalanche',
    logo: '/static/logos/avax.png',
    explorer: 'https://snowtrace.io',
    explorerName: 'Avalanche Explorer',
    rpcEndpoint: 'https://api.avax.network/ext/bc/C/rpc',
    tierSupported: false,
    cgkNativeTokenId: 'avalanche-2',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  },
  250: {
    name: 'Fantom Opera',
    shortName: 'Fantom',
    logo: '/static/tokens/ftm.svg',
    explorer: 'https://ftmscan.com',
    explorerName: 'Fantom Blockchain Explorer',
    rpcEndpoint: 'https://rpc.ftm.tools/',
    tierSupported: false,
    cgkNativeTokenId: 'fantom',
    nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  },
  10: {
    name: 'Optimism',
    shortName: 'Optimism',
    logo: '/static/tokens/optimism.svg',
    explorer: 'https://optimistic.etherscan.io',
    explorerName: 'The Optimistic Ethereum Explorer',
    rpcEndpoint: 'https://mainnet.optimism.io',
    tierSupported: false,
    cgkNativeTokenId: 'ethereum',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  },
}

export const SUPPORTED_CHAINS_IDS = Object.keys(SUPPORTED_CHAINS).map((id) => Number(id))

export const injectedConnector = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS_IDS })

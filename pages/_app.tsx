import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from 'lib/web3'
import { Box } from '@mui/material'
import { ConnectWalletButton } from 'views/components/ConnectWalletButton'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Box display="flex" justifyContent="flex-end">
        <ConnectWalletButton />
      </Box>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp

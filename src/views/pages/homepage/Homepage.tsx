import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ConnectWalletButton } from 'views/components/ConnectWalletButton'

export const Homepage = observer(() => {
  return (
    <Box>
      <ConnectWalletButton />
    </Box>
  )
})

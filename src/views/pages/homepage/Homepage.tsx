import { Box, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ConnectWalletButton } from 'views/components/ConnectWalletButton'

export const Homepage = observer(() => {
  return (
    <Box>
      <ConnectWalletButton />
      <Box>
        <TextField></TextField>
      </Box>
    </Box>
  )
})

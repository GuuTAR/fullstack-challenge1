import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import MeritDonation from 'contracts/MeritDonation.json'
import { web3Store } from 'stores/web3Store'
import { accountStore } from 'stores/accountStore'
import BigNumber from 'bignumber.js'
import { ABI } from 'types/types'
import { makeMulticallNullable } from 'services/contractService'

const Home: NextPage = observer(() => {
  const theme = useTheme()

  // const test = useAllowances()

  const [value, setValue] = useState<string>('')
  const [donations, setDonations] = useState<Array<any>>([])

  const handleDonate = async () => {
    const web3 = web3Store.instance

    const meritDonationAddress = '0x69ea6652c9a2a65fc64ba1a4c186df7450454677'

    if (!web3) return

    await web3.eth.sendTransaction({
      from: accountStore.address,
      to: meritDonationAddress,
      value: new BigNumber(value).times('1e18').toFixed(0),
    })
  }

  const getAllDonation = async () => {
    const web3 = web3Store.instance
    if (!web3) return

    const meritDonationContract = new web3.eth.Contract(
      MeritDonation.abi as ABI,
      '0x69ea6652c9a2a65fc64ba1a4c186df7450454677',
    )

    const totalDonationCount = await meritDonationContract.methods.TOTAL_DONATION().call()

    const calls: any[] = []

    for (let i = 0; i < totalDonationCount; i++) {
      calls.push(meritDonationContract.methods.donations(i))
    }

    const result = await makeMulticallNullable(calls)
    setDonations(Object.values(result))
  }

  useEffect(() => {
    getAllDonation()
  }, [web3Store.instance])

  return (
    <Box display="flex" flexDirection="column" gap={theme.spacing(4)}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h1">ทำบุญกันเถอะ</Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={theme.spacing(2)} alignItems="center">
        <Typography>ใส่เงินจ้าาา</Typography>
        <Box display="flex" alignItems="center" gap={theme.spacing(1)} height={30}>
          <TextField
            type="number"
            sx={{ backgroundColor: 'white' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Typography variant="body2">ETH</Typography>
          <Button variant="contained" onClick={handleDonate}>
            บริจาค
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Top Donator</Typography>
        <Box>
          {donations
            .sort((a, b) => {
              return new BigNumber(b.amt).minus(a.amt).div('1e18').toNumber()
            })
            .slice(0, 10)
            .map((donation) => (
              <Box display="flex" gap={8}>
                <Typography>{donation.addr}</Typography>
                <Typography>{new BigNumber(donation.amt).div('1e18').toFormat(6)}</Typography>
                <Typography>ETH</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
})

export default Home

export const shortenAddress = (address: string) => {
  return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''
}

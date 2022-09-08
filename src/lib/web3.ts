import Web3 from 'web3'

export const getLibrary = (provider, _connector) => {
  return new Web3(provider)
}

export default getLibrary

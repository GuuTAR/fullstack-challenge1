import { web3Store } from 'stores/web3Store'
import { ABI } from 'types/types'
import _ from 'lodash'

import Multicall2 from 'contracts/Multicall2.json'

export const makeMulticallNullable = async (
  data,
  types: any[] | undefined = undefined,
  blockNumber: number | undefined = undefined,
) => {
  const web3 = web3Store.instance
  if (!web3) return []

  try {
    let returnData: string[] = []
    const requests: { success: boolean; returnData: string }[][] = []

    const multicall = new web3.eth.Contract(Multicall2.abi as ABI, '0x5ba1e12693dc8f9c48aad8770482f4739beed696')

    for (let i = 0; i < Math.ceil(data.length / 50); i++) {
      const batchData = data.slice(i * 50, (i + 1) * 50)

      const callObj = multicall.methods.tryAggregate(
        false, // * false -> accept that the result can be unsuccess.
        batchData.map((data) => ({
          target: data._parent._address,
          callData: data.encodeABI(),
        })),
      )

      if (blockNumber) {
        requests.push(callObj.call({}, blockNumber))
      } else {
        requests.push(callObj.call())
      }
    }

    const _results = await Promise.all(requests)

    // * Example returned data
    // * _results = [batch1, batch2, batch3, ...]
    // * batch = [ {success, returnData}, {success, returnData}, {success, returnData}, ... ]
    // * NOTE: `success` is boolean and `returnData` is the data (not the array of data)
    const results = _results.map((batchResult) =>
      batchResult.map(({ success, returnData }) => (success ? returnData : '0x')),
    )

    returnData = _.flatten(results)

    let returnDataDecoded: Record<string, any>
    if (types) {
      returnDataDecoded = returnData.map((result) => web3.eth.abi.decodeParameters(types, result))
      if (types.length === 1) {
        returnDataDecoded = returnData.map((data) => data['0'])
      }
    } else {
      returnDataDecoded = returnData
        .map((result, idx) =>
          result === '0x' ? undefined : web3.eth.abi.decodeParameters(data[idx]._method.outputs, result),
        )
        .map((result, idx) =>
          result === undefined ? undefined : data[idx]._method.outputs.length === 1 ? result[0] : result,
        )
    }

    return returnDataDecoded
  } catch (e) {
    console.error('Make multicall failed.')
    console.log(data)
    console.error(e)
  }

  return []
}

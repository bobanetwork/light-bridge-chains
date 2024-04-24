import {Asset, BobaChains} from "./chains";

export const getDestinationTokenAddress = (originTokenAddress: string, sourceChainId: string, destChainId: string) => {
    const sourceChainConf = BobaChains[sourceChainId]
    if (!sourceChainConf) {
        throw new Error(`Source chain ${sourceChainId} not supported`)
    }
    const destChainConf = BobaChains[destChainId]
    if (!destChainConf) {
        throw new Error(`Destination chain ${destChainId} not supported`)
    }
    const ticker: Asset = sourceChainConf.supportedAssets[originTokenAddress?.toLowerCase()]
    if (!ticker) {
        throw new Error(`Token ${originTokenAddress} not supported on source chain ${sourceChainId}`)
    }
    const destTokenAddress = Object.entries(destChainConf.supportedAssets).find(([_, asset]) => asset === ticker)
    if (!destTokenAddress) {
        throw new Error(`Token ${originTokenAddress} not supported on destination chain ${destChainId}`)
    }
    return destTokenAddress[0]
}
import {BigNumber, BigNumberish, Contract, providers} from 'ethers'

export interface IKMSSignerConfig {
    awsKmsEndpoint: string
    awsKmsRegion: string
    awsKmsAccessKey?: string
    awsKmsSecretKey?: string
    awsKmsKeyId: string
    awsKmsSessionToken?: string
    /** @dev Should always be enabled, but can be helpful for debugging and unit tests, .. */
    disableDisburserCheck?: boolean
}

export interface SupportedAssets {
    [address: string]: string // symbol (MUST BE UNIQUE)
}

/** @dev Allow airdropping gas only when the sourceNetwork is eligible (security check to avoid arbitrage). */
export enum EAirdropSource {
    ALLOW = 'allow',
    PROHIBIT = 'prohibit',
}

export interface ChainInfo {
    chainId: number
    layer: EAirdropSource
    url: string
    provider: providers.StaticJsonRpcProvider
    testnet: boolean
    name: string
    teleportationAddress: string
    height: number
    supportedAssets: SupportedAssets
    airdropConfig: IAirdropConfig
}

export interface DepositTeleportations {
    Teleportation: Contract
    chainId: number
    totalDeposits: BigNumber
    totalDisbursements: BigNumber
    height: number
}

export interface Disbursement {
    /** @dev Ignored for native disbursements */
    token: string
    amount: string
    addr: string
    sourceChainId: number | string
    depositId: number | string
}

export enum ENetworkMode {
    TESTNETS = 'testnets',
    MAINNETS = 'mainnets',
}

export interface ILightBridgeOpts {
    rpcUrl: string
    envModeIsDevelopment: boolean
    networkMode: ENetworkMode
    blockRangePerPolling: number
    pollingInterval: number
    awsKmsConfig: IKMSSignerConfig
    localNetworks?: {
        mainNetwork: ChainInfo
        selectedBobaNetworks: ChainInfo[]
    }
    retryIntervalMs?: number
    enableExitFee: boolean
}

export interface IAirdropConfig {
    /** Amount of native gas airdropped to user when conditions are met, also used as threshold */
    airdropAmountWei?: BigNumberish
    /** Amount of seconds to wait after previous airdrop */
    airdropCooldownSeconds?: BigNumberish
    /** Define if airdrop is enabled on this network */
    airdropEnabled: boolean
}

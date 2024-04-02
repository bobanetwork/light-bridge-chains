import { providers, Contract, BigNumber, BigNumberish } from 'ethers';

interface IKMSSignerConfig {
    awsKmsEndpoint: string;
    awsKmsRegion: string;
    awsKmsAccessKey?: string;
    awsKmsSecretKey?: string;
    awsKmsKeyId: string;
    /** @dev Should always be enabled, but can be helpful for debugging and unit tests, .. */
    disableDisburserCheck?: boolean;
}
interface SupportedAssets {
    [address: string]: string;
}
/** @dev Allow airdropping gas only when the sourceNetwork is eligible (security check to avoid arbitrage). */
declare enum EAirdropSource {
    ALLOW = "allow",
    PROHIBIT = "prohibit"
}
interface ChainInfo {
    chainId: number;
    layer: EAirdropSource;
    url: string;
    provider: providers.StaticJsonRpcProvider;
    testnet: boolean;
    name: string;
    teleportationAddress: string;
    height: number;
    supportedAssets: SupportedAssets;
    airdropConfig: IAirdropConfig;
}
interface DepositTeleportations {
    Teleportation: Contract;
    chainId: number;
    totalDeposits: BigNumber;
    totalDisbursements: BigNumber;
    height: number;
}
interface Disbursement {
    /** @dev Ignored for native disbursements */
    token: string;
    amount: string;
    addr: string;
    sourceChainId: number | string;
    depositId: number | string;
}
declare enum ENetworkMode {
    TESTNETS = "testnets",
    MAINNETS = "mainnets"
}
interface ILightBridgeOpts {
    rpcUrl: string;
    envModeIsDevelopment: boolean;
    networkMode: ENetworkMode;
    pollingInterval: number;
    blockRangePerPolling: number;
    awsKmsConfig: IKMSSignerConfig;
    localNetworks?: {
        mainNetwork: ChainInfo;
        selectedBobaNetworks: ChainInfo[];
    };
    retryIntervalMs?: number;
}
interface IAirdropConfig {
    /** Amount of native gas airdropped to user when conditions are met, also used as threshold */
    airdropAmountWei?: BigNumberish;
    /** Amount of seconds to wait after previous airdrop */
    airdropCooldownSeconds?: BigNumberish;
    /** Define if airdrop is enabled on this network */
    airdropEnabled: boolean;
}

type IBobaChain = Omit<ChainInfo, 'chainId' | 'provider'>;
interface IBobaChains {
    [chainId: number]: IBobaChain;
}
declare enum Asset {
    ETH = "ethereum",
    BOBA = "boba-network",
    USDT = "tether",
    BNB = "binancecoin",
    OMG = "omg-network"
}
/**
 * @dev Chain configs
 * @property supportedAssets: BOBA as fee token only supported for EOAs, since Teleporter consists of a contract & the disburser wallet (assuming ETH fee) everything with 0x0 should be fine.
 **/
declare const BobaChains: IBobaChains;

export { Asset, BobaChains, type ChainInfo, type DepositTeleportations, type Disbursement, EAirdropSource, ENetworkMode, type IAirdropConfig, type IBobaChain, type IBobaChains, type IKMSSignerConfig, type ILightBridgeOpts, type SupportedAssets };

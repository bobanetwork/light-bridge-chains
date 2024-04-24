import {ethers} from 'ethers'
import {ChainInfo, EAirdropSource, IAirdropConfig} from './types'
import * as dotenv from 'dotenv'

dotenv.config()


export type IBobaChain = Omit<ChainInfo, 'chainId' | 'provider'>

export interface IBobaChains {
    [chainId: number]: IBobaChain
}

export enum Asset {
    ETH = 'ethereum',
    BOBA = 'boba-network',
    USDT = 'tether',
    BNB = 'binancecoin',
    OMG = 'omg-network',
}

/** @dev Sometimes Boba is the native asset. If airdrop is enabled is set on network config level. */
const DefaultAirdropConfigs: {
    [asset: string]: Omit<IAirdropConfig, 'airdropEnabled'>
} = {
    [Asset.BOBA as string]: {
        airdropAmountWei: ethers.utils.parseEther('0.5'),
        airdropCooldownSeconds: 86400, // 1 day
    },
    [Asset.ETH as string]: {
        airdropAmountWei: ethers.utils.parseEther('0.0005'),
        airdropCooldownSeconds: 86400, // 1 day
    },
}

const PUBLIC_RPCs = {
    288: ["https://boba-ethereum.gateway.tenderly.co"],
    56288: ["https://replica.bnb.boba.network"],
    9728: ["https://boba-bnb-testnet.gateway.tenderly.co"],
    421614: ["https://public.stackup.sh/api/v1/node/arbitrum-sepolia"],
    11155420: ["https://sepolia.optimism.io"],
    42161: ["https://arbitrum.llamarpc.com"],
    10: ["https://optimism.llamarpc.com"],
    1: ["https://eth.llamarpc.com"],
    56: ["https://rpc.ankr.com/bsc", "https://bsc.blockpi.network/v1/rpc/public", "https://bsc-dataseed4.defibit.io", "https://bsc-dataseed1.ninicoin.io",
        "https://binance.nodereal.io", "https://bsc.drpc.org"],
    11155111: ["https://ethereum-sepolia.publicnode.com"],
    28882: ["https://sepolia.boba.network"],
    97: ["https://bsc-testnet-rpc.publicnode.com"],
}

export const getRandomPublicRpc = (chainId: number) => {
    return PUBLIC_RPCs[chainId][Math.floor(Math.random() * PUBLIC_RPCs[chainId].length)]
}

/**
 * @dev Chain configs
 * @property supportedAssets: BOBA as fee token only supported for EOAs, since Teleporter consists of a contract & the disburser wallet (assuming ETH fee) everything with 0x0 should be fine.
 **/
export const BobaChains: IBobaChains = {
    // TODO: Consider using AddressManager or AddressPackage instead

    //#region boba_networks
    288: {
        url:
            process.env.LIGHTBRIDGE_RPC_BOBAETHMAINNET ??
            getRandomPublicRpc(288),
        testnet: false,
        layer: EAirdropSource.PROHIBIT,
        name: 'Boba Ethereum Mainnet',
        teleportationAddress: '0x0dfFd3Efe9c3237Ad7bf94252296272c96237FF5',
        height: 1111267,
        supportedAssets: {
            ['0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
            ['0xe1E2ec9a85C607092668789581251115bCBD20de'.toLowerCase()]: Asset.OMG,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: true, // if you set this to FALSE, then you need to update the backend logic for fee deducation! which uses this parameter as replacement if we deduct the exit fee or not
        },
    },
    56288: {
        url:
            process.env.LIGHTBRIDGE_RPC_BOBABNBMAINNET ??
            getRandomPublicRpc(56288),
        testnet: false,
        layer: EAirdropSource.PROHIBIT,
        name: 'Boba BNB Mainnet',
        teleportationAddress: '0x670b130112C6f03E17192e63c67866e67D77c3ee',
        height: 36827086,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.BOBA,
            ['0x4200000000000000000000000000000000000023'.toLowerCase()]: Asset.BNB,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.BOBA],
            airdropEnabled: true, // if you set this to FALSE, then you need to update the backend logic for fee deducation! which uses this parameter as replacement if we deduct the exit fee or not
        },
    },
    9728: {
        url:
            process.env.LIGHTBRIDGE_RPC_BOBABNBTESTNET ??
            getRandomPublicRpc(9728),
        testnet: true,
        layer: EAirdropSource.PROHIBIT,
        name: 'Boba BNB Testnet',
        teleportationAddress: '0xf4d179d3a083Fa3Eede935FaF4C679D32d514186',
        height: 295353,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.BOBA,
            ['0x4200000000000000000000000000000000000023'.toLowerCase()]: Asset.BNB,
            ['0xc614A66f82e71758Fa7735C91dAD1088c8362f15'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.BOBA],
            airdropEnabled: true, // if you set this to FALSE, then you need to update the backend logic for fee deducation! which uses this parameter as replacement if we deduct the exit fee or not
        },
    },
    421614: {
        url:
            process.env.LIGHTBRIDGE_RPC_ARBITRUMSEPOLIA ??
            getRandomPublicRpc(421614),
        testnet: true,
        layer: EAirdropSource.PROHIBIT,
        name: 'Arbitrum Sepolia',
        teleportationAddress: '0x3fc06c53aa3Ef19ad7830f5F18C9186C676EdE29',
        height: 28263911,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    11155420: {
        url:
            process.env.LIGHTBRIDGE_RPC_OPTIMISMSEPOLIA ??
            getRandomPublicRpc(11155420),
        testnet: true,
        layer: EAirdropSource.PROHIBIT,
        name: 'Optimism Sepolia',
        teleportationAddress: '0x3fc06c53aa3Ef19ad7830f5F18C9186C676EdE29',
        height: 9968072,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    42161: {
        url:
            process.env.LIGHTBRIDGE_RPC_ARBITRUMMAINNET ??
            getRandomPublicRpc(42161),
        testnet: false,
        layer: EAirdropSource.PROHIBIT,
        name: 'Arbitrum Mainnet',
        teleportationAddress: '0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801',
        height: 180755096,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    10: {
        url:
            process.env.LIGHTBRIDGE_RPC_OPTIMISMMAINNET ??
            getRandomPublicRpc(10),
        testnet: false,
        layer: EAirdropSource.PROHIBIT,
        name: 'Optimism Mainnet',
        teleportationAddress: '0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801',
        height: 116168267,
        supportedAssets: {
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    //#endregion
    //#region l1
    1: {
        url: process.env.LIGHTBRIDGE_RPC_ETHMAINNET ?? getRandomPublicRpc(1),
        testnet: false,
        name: 'Ethereum Mainnet',
        layer: EAirdropSource.ALLOW,
        teleportationAddress: '0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801',
        height: 19227141,
        supportedAssets: {
            ['0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
            ['0xdAC17F958D2ee523a2206206994597C13D831ec7'.toLowerCase()]: Asset.USDT,
            ['0xB8c77482e45F1F44dE1745F52C74426C631bDD52'.toLowerCase()]: Asset.BNB,
            ['0xd26114cd6ee289accf82350c8d8487fedb8a0c07'.toLowerCase()]: Asset.OMG,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    56: {
        url: process.env.LIGHTBRIDGE_RPC_BNBMAINNET ?? getRandomPublicRpc(56),
        testnet: false,
        name: 'BNB Mainnet',
        layer: EAirdropSource.PROHIBIT, // also do not allow bnb mainnet as too cheap
        teleportationAddress: '0x0dfFd3Efe9c3237Ad7bf94252296272c96237FF5',
        height: 30907682,
        supportedAssets: {
            ['0xE0DB679377A0F5Ae2BaE485DE475c9e1d8A4607D'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.BNB,
            ['0x2170Ed0880ac9A755fd29B2688956BD959F933F8'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    // Sepolia
    11155111: {
        url:
            process.env.LIGHTBRIDGE_RPC_SEPOLIATESTNET ??
            getRandomPublicRpc(11155111),
        testnet: true,
        layer: EAirdropSource.ALLOW,
        name: 'Sepolia Testnet',
        teleportationAddress: '0xaeE12b8D99BBff7ED47866DF868CF5b4b3F73ffF',
        height: 5280795,
        supportedAssets: {
            ['0x33faF65b3DfcC6A1FccaD4531D9ce518F0FDc896'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    // Boba Sepolia
    28882: {
        url:
            process.env.LIGHTBRIDGE_RPC_BOBASEPOLIATESTNET ??
            getRandomPublicRpc(28882),
        testnet: true,
        layer: EAirdropSource.PROHIBIT,
        name: 'Boba Sepolia Testnet',
        teleportationAddress: '0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801',
        height: 1043907, // TODO: might need to be adapted
        supportedAssets: {
            ['0x4200000000000000000000000000000000000023'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.ETH,
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: true, // if you set this to FALSE, then you need to update the backend logic for fee deducation! which uses this parameter as replacement if we deduct the exit fee or not
        },
    },
    97: {
        url:
            process.env.LIGHTBRIDGE_RPC_BNBTESTNET ??
            getRandomPublicRpc(97),
        testnet: true,
        layer: EAirdropSource.PROHIBIT,
        name: 'BNB Testnet',
        teleportationAddress: '0x7f6a32bCaA70c65E08F2f221737612F6fC18347A',
        height: 32272487,
        supportedAssets: {
            ['0x875cD11fDf085e0E11B0EE6b814b6d0b38fA554C'.toLowerCase()]: Asset.BOBA,
            ['0x0000000000000000000000000000000000000000'.toLowerCase()]: Asset.BNB,
            ['0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378'.toLowerCase()]: Asset.ETH, // WETH
        },
        airdropConfig: {
            ...DefaultAirdropConfigs[Asset.ETH],
            airdropEnabled: false,
        },
    },
    //#endregion
}

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Asset: () => Asset,
  BobaChains: () => BobaChains,
  EAirdropSource: () => EAirdropSource,
  ENetworkMode: () => ENetworkMode
});
module.exports = __toCommonJS(src_exports);

// src/chains.ts
var import_ethers = require("ethers");

// src/types.ts
var EAirdropSource = /* @__PURE__ */ ((EAirdropSource2) => {
  EAirdropSource2["ALLOW"] = "allow";
  EAirdropSource2["PROHIBIT"] = "prohibit";
  return EAirdropSource2;
})(EAirdropSource || {});
var ENetworkMode = /* @__PURE__ */ ((ENetworkMode2) => {
  ENetworkMode2["TESTNETS"] = "testnets";
  ENetworkMode2["MAINNETS"] = "mainnets";
  return ENetworkMode2;
})(ENetworkMode || {});

// src/chains.ts
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var Asset = /* @__PURE__ */ ((Asset2) => {
  Asset2["ETH"] = "ethereum";
  Asset2["BOBA"] = "boba-network";
  Asset2["USDT"] = "tether";
  Asset2["BNB"] = "binancecoin";
  Asset2["OMG"] = "omg-network";
  return Asset2;
})(Asset || {});
var DefaultAirdropConfigs = {
  ["boba-network" /* BOBA */]: {
    airdropAmountWei: import_ethers.ethers.utils.parseEther("0.5"),
    airdropCooldownSeconds: 86400
    // 1 day
  },
  ["ethereum" /* ETH */]: {
    airdropAmountWei: import_ethers.ethers.utils.parseEther("0.0005"),
    airdropCooldownSeconds: 86400
    // 1 day
  }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
var BobaChains = {
  // TODO: Consider using AddressManager or AddressPackage instead
  //#region boba_networks
  288: {
    url: (_a = process.env.LIGHTBRIDGE_RPC_BOBAETHMAINNET) != null ? _a : "https://boba-ethereum.gateway.tenderly.co",
    testnet: false,
    layer: "prohibit" /* PROHIBIT */,
    name: "Boba Ethereum Mainnet",
    teleportationAddress: "0x0dfFd3Efe9c3237Ad7bf94252296272c96237FF5",
    height: 1111267,
    supportedAssets: {
      ["0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */,
      ["0xe1E2ec9a85C607092668789581251115bCBD20de".toLowerCase()]: "omg-network" /* OMG */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: true
    })
  },
  56288: {
    url: (_b = process.env.LIGHTBRIDGE_RPC_BOBABNBMAINNET) != null ? _b : "https://replica.bnb.boba.network",
    testnet: false,
    layer: "prohibit" /* PROHIBIT */,
    name: "Boba BNB Mainnet",
    teleportationAddress: "0x670b130112C6f03E17192e63c67866e67D77c3ee",
    height: 3393,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x4200000000000000000000000000000000000023".toLowerCase()]: "binancecoin" /* BNB */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["boba-network" /* BOBA */]), {
      airdropEnabled: true
    })
  },
  9728: {
    url: (_c = process.env.LIGHTBRIDGE_RPC_BOBABNBTESTNET) != null ? _c : "https://boba-bnb-testnet.gateway.tenderly.co",
    testnet: true,
    layer: "prohibit" /* PROHIBIT */,
    name: "Boba BNB Testnet",
    teleportationAddress: "0xf4d179d3a083Fa3Eede935FaF4C679D32d514186",
    height: 295353,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x4200000000000000000000000000000000000023".toLowerCase()]: "binancecoin" /* BNB */,
      ["0xc614A66f82e71758Fa7735C91dAD1088c8362f15".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["boba-network" /* BOBA */]), {
      airdropEnabled: true
    })
  },
  421614: {
    url: (_d = process.env.LIGHTBRIDGE_RPC_ARBITRUMSEPOLIA) != null ? _d : "https://public.stackup.sh/api/v1/node/arbitrum-sepolia",
    testnet: true,
    layer: "prohibit" /* PROHIBIT */,
    name: "Arbitrum Sepolia",
    teleportationAddress: "0x3fc06c53aa3Ef19ad7830f5F18C9186C676EdE29",
    height: 28263911,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  11155420: {
    url: (_e = process.env.LIGHTBRIDGE_RPC_OPTIMISMSEPOLIA) != null ? _e : "https://sepolia.optimism.io",
    testnet: true,
    layer: "prohibit" /* PROHIBIT */,
    name: "Optimism Sepolia",
    teleportationAddress: "0x3fc06c53aa3Ef19ad7830f5F18C9186C676EdE29",
    height: 9968072,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  42161: {
    url: (_f = process.env.LIGHTBRIDGE_RPC_ARBITRUMMAINNET) != null ? _f : "https://arbitrum.llamarpc.com",
    testnet: false,
    layer: "prohibit" /* PROHIBIT */,
    name: "Arbitrum Mainnet",
    teleportationAddress: "0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801",
    height: 180755096,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  10: {
    url: (_g = process.env.LIGHTBRIDGE_RPC_OPTIMISMMAINNET) != null ? _g : "https://optimism.llamarpc.com",
    testnet: false,
    layer: "prohibit" /* PROHIBIT */,
    name: "Optimism Mainnet",
    teleportationAddress: "0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801",
    height: 116168267,
    supportedAssets: {
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  //#endregion
  //#region l1
  1: {
    url: (_h = process.env.LIGHTBRIDGE_RPC_ETHMAINNET) != null ? _h : "https://eth.llamarpc.com",
    testnet: false,
    name: "Ethereum Mainnet",
    layer: "allow" /* ALLOW */,
    teleportationAddress: "0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801",
    height: 19227141,
    supportedAssets: {
      ["0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */,
      ["0xdAC17F958D2ee523a2206206994597C13D831ec7".toLowerCase()]: "tether" /* USDT */,
      ["0xB8c77482e45F1F44dE1745F52C74426C631bDD52".toLowerCase()]: "binancecoin" /* BNB */,
      ["0xd26114cd6ee289accf82350c8d8487fedb8a0c07".toLowerCase()]: "omg-network" /* OMG */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  56: {
    url: (_i = process.env.LIGHTBRIDGE_RPC_BNBMAINNET) != null ? _i : "https://rpc.ankr.com/bsc",
    testnet: false,
    name: "BNB Mainnet",
    layer: "prohibit" /* PROHIBIT */,
    // also do not allow bnb mainnet as too cheap
    teleportationAddress: "0x0dfFd3Efe9c3237Ad7bf94252296272c96237FF5",
    height: 30907682,
    supportedAssets: {
      ["0xE0DB679377A0F5Ae2BaE485DE475c9e1d8A4607D".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "binancecoin" /* BNB */,
      ["0x2170Ed0880ac9A755fd29B2688956BD959F933F8".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  // Sepolia
  11155111: {
    url: (_j = process.env.LIGHTBRIDGE_RPC_SEPOLIATESTNET) != null ? _j : "https://ethereum-sepolia.publicnode.com",
    testnet: true,
    layer: "allow" /* ALLOW */,
    name: "Sepolia Testnet",
    teleportationAddress: "0xaeE12b8D99BBff7ED47866DF868CF5b4b3F73ffF",
    height: 5280795,
    supportedAssets: {
      ["0x33faF65b3DfcC6A1FccaD4531D9ce518F0FDc896".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  },
  // Boba Sepolia
  28882: {
    url: (_k = process.env.LIGHTBRIDGE_RPC_BOBASEPOLIATESTNET) != null ? _k : "https://sepolia.boba.network",
    testnet: true,
    layer: "prohibit" /* PROHIBIT */,
    name: "Boba Sepolia Testnet",
    teleportationAddress: "0x2dE73Bd1660Fbf4D521a52Ec2a91CCc106113801",
    height: 1043907,
    // TODO: might need to be adapted
    supportedAssets: {
      ["0x4200000000000000000000000000000000000023".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "ethereum" /* ETH */
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: true
    })
  },
  97: {
    url: (_l = process.env.LIGHTBRIDGE_RPC_BNBTESTNET) != null ? _l : "https://bsc-testnet-rpc.publicnode.com",
    testnet: true,
    layer: "prohibit" /* PROHIBIT */,
    name: "BNB Testnet",
    teleportationAddress: "0x7f6a32bCaA70c65E08F2f221737612F6fC18347A",
    height: 32272487,
    supportedAssets: {
      ["0x875cD11fDf085e0E11B0EE6b814b6d0b38fA554C".toLowerCase()]: "boba-network" /* BOBA */,
      ["0x0000000000000000000000000000000000000000".toLowerCase()]: "binancecoin" /* BNB */,
      ["0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378".toLowerCase()]: "ethereum" /* ETH */
      // WETH
    },
    airdropConfig: __spreadProps(__spreadValues({}, DefaultAirdropConfigs["ethereum" /* ETH */]), {
      airdropEnabled: false
    })
  }
  //#endregion
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Asset,
  BobaChains,
  EAirdropSource,
  ENetworkMode
});
//# sourceMappingURL=index.js.map
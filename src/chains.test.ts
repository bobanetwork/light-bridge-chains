const {describe, it} = require("node:test");
const assert = require("node:assert");
const {getRandomPublicRpc} = require("./chains.ts");

describe("chains", () => {
    it("should work", () => {
        assert(true)
    });

    it("should get random RPC when only one element", () => {
        const randomRPC = getRandomPublicRpc(288)
        assert.strictEqual(randomRPC, "https://boba-ethereum.gateway.tenderly.co")
    });

    it("should get random RPC with multiple endpoints & randomized", () => {
        let randomRPCs = [getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56)]
        const areDifferent = new Set(randomRPCs).size === randomRPCs.length
        assert(areDifferent)
    });
})
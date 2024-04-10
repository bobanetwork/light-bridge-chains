const {getRandomPublicRpc} = require("../../src/chains.ts");

describe("chains", () => {
    it("should work", () => {
        expect(1).toBe(1)
    });

    it("should get random RPC when only one element", () => {
        const randomRPC = getRandomPublicRpc(288)
        expect(randomRPC).toEqual("https://boba-ethereum.gateway.tenderly.co")
    });

    /** @DEV brittle */
    it("should get random RPC with multiple endpoints & randomized", () => {
        let randomRPCs = [getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56)]
        const areDifferent = new Set(randomRPCs).size === randomRPCs.length
        expect(areDifferent).toBe(false)
    });
})
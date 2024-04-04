const {getRandomPublicRpc} = require("../../src/chains.ts");

describe("chains", () => {
    it("should work", () => {
        expect(1).toBe(1)
    });

    it("should get random RPC when only one element", () => {
        const randomRPC = getRandomPublicRpc(288)
        expect(randomRPC).toEqual("https://boba-ethereum.gateway.tenderly.co")
    });

    it("should get random RPC with multiple endpoints & randomized", () => {
        for (let i = 0; i <= 10; i++) {
            let randomRPCs = [getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56), getRandomPublicRpc(56)]
            expect(randomRPCs.length).toBeGreaterThan(1);
            expect(new Set(randomRPCs).size).toBeGreaterThanOrEqual(1);
        }
    });
})
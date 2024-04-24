import {getDestinationTokenAddress} from "../../src";

describe("utils", () => {
    it("should work", () => {
        expect(1).toBe(1)
    });

    it("should get correct destination token address", () => {
        const destTokenAddr = getDestinationTokenAddress('0x4200000000000000000000000000000000000023', '56288', '56')
        expect(destTokenAddr).toBe("0x0000000000000000000000000000000000000000")
    })
})
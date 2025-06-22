const {getRandomPublicRpc, PUBLIC_RPCs} = require("../../src/chains.ts");
const https = require('https');

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
        let randomRPCs = []
        for (let i = 0; i < 10; i++) {
            randomRPCs.push(getRandomPublicRpc(56))
        }
        const areDifferent = new Set(randomRPCs).size === randomRPCs.length
        expect(areDifferent).toBe(false)
    });

    it("should check if PUBLIC_RPCs are all healthy and correctly configured (Chain ID)", async () => {
        const testRpc = (url: string, expectedChainId: number) => new Promise((resolve) => {
            const data = JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_chainId',
                params: [],
                id: 1
            });
            
            const req = https.request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000
            }, (res: any) => {
                let body = '';
                res.on('data', (chunk: any) => body += chunk);
                res.on('end', () => {
                    try {
                        const result = JSON.parse(body);
                        if (result.error || !result.result) {
                            resolve({ healthy: false, error: 'RPC error or no result' });
                            return;
                        }
                        const returnedChainId = parseInt(result.result, 16);
                        const isCorrectChain = returnedChainId === expectedChainId;
                        resolve({ 
                            healthy: isCorrectChain, 
                            returnedChainId, 
                            expectedChainId,
                            error: isCorrectChain ? null : `Wrong chain ID: got ${returnedChainId}, expected ${expectedChainId}`
                        });
                    } catch {
                        resolve({ healthy: false, error: 'Failed to parse response' });
                    }
                });
            });
            
            req.on('error', () => resolve({ healthy: false, error: 'Network error' }));
            req.on('timeout', () => resolve({ healthy: false, error: 'Timeout' }));
            req.write(data);
            req.end();
        });

        const allRpcs: Array<{url: string, chainId: number}> = [];
        (Object.entries(PUBLIC_RPCs) as Array<[string, string[]]>).forEach(([chainId, urls]) => {
            urls.forEach(url => {
                allRpcs.push({url, chainId: parseInt(chainId)});
            });
        });

        const results = await Promise.all(allRpcs.map(rpc => testRpc(rpc.url, rpc.chainId)));
        
        const unhealthyRpcs = allRpcs.filter((_, index) => !(results[index] as any).healthy);
        const healthyCount = results.filter((r: any) => r.healthy).length;
        
        console.log(`Healthy RPCs: ${healthyCount}/${allRpcs.length}`);
        
        if (unhealthyRpcs.length > 0) {
            console.log('\n RPCs that are not healthy:');
            unhealthyRpcs.forEach((rpc, index) => {
                const originalIndex = allRpcs.indexOf(rpc);
                const result = results[originalIndex] as any;
                console.log(`  - ${rpc.url} (Chain ${rpc.chainId}): ${result.error}`);
            });
        }
        
        expect(healthyCount).toBe(allRpcs.length);
    }, 30000);
});
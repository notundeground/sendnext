import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Sendnext } from '../wrappers/Sendnext';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Sendnext', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Sendnext');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sendnext: SandboxContract<Sendnext>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sendnext = blockchain.openContract(Sendnext.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sendnext.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sendnext.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sendnext are ready to use
    });
});

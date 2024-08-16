import { toNano } from '@ton/core';
import { Sendnext } from '../wrappers/Sendnext';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sendnext = provider.open(Sendnext.createFromConfig({}, await compile('Sendnext')));

    await sendnext.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(sendnext.address);

    // run methods on `sendnext`
}

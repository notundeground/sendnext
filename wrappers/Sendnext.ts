import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SendnextConfig = {};

export function sendnextConfigToCell(config: SendnextConfig): Cell {
    return beginCell().endCell();
}

export class Sendnext implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Sendnext(address);
    }

    static createFromConfig(config: SendnextConfig, code: Cell, workchain = 0) {
        const data = sendnextConfigToCell(config);
        const init = { code, data };
        return new Sendnext(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

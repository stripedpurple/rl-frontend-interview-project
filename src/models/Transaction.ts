export interface ITransaction {
    id?: number;
    description: string;
    expense: number;
}

export class Transaction implements ITransaction {
    id?: number = undefined
    description: string = ''
    expense: number = 0

    constructor(transaction?: ITransaction) {
        if (transaction)
            Object.assign(this, transaction)
    }
}
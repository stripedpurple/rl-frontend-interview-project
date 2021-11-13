export interface transaction {
    id?: number;
    description: string;
    expense: number;
}

export class Transaction implements transaction {
    id?: number = undefined
    description: string = ''
    expense: number = 0

    constructor(transaction: transaction) {
        Object.assign(this, transaction)
    }
}
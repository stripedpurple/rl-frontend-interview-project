export interface ITransaction {
    id?: number
    expense: number | string
    description: string
}

export class Transaction implements ITransaction{
    id?: number = undefined
    expense: number | string = 0
    description: string = ''

    constructor(transaction: ITransaction) {
        Object.assign(this, transaction)
    }
}
export interface ITotals {
    balance: number;
    spent: number;
    earned: number;
}

export class Totals implements ITotals {
    balance = 0;
    spent = 0;
    earned = 0;

    constructor(Totals?: ITotals) {
        if (Totals)
            Object.assign(this, Totals)
    }
}
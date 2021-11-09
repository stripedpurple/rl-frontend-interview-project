import React, {FunctionComponent, useEffect, useState} from 'react';
import {ITransaction} from "../models/transaction";

interface OwnProps {
    transactions: Array<ITransaction>
}

type Props = OwnProps;

const Totals: FunctionComponent<Props> = ({transactions}) => {
    const [aggregates, setAggregates] = useState({
        total: '0',
        spent: '0',
        earned: '0'
    });

    useEffect(() => {
        if (transactions.length > 0) {
            let tmpTransaction = [...transactions]
            let spent = tmpTransaction.filter(t => parseFloat(t.expense) < 0).map(t => parseFloat(t.expense)).reduce((sum, current) => (sum + current)).toFixed(2)
            let earned = tmpTransaction.filter(t => parseFloat(t.expense) > 0).map(t => parseFloat(t.expense)).reduce((sum, current) => (sum + current)).toFixed(2)
            let total = tmpTransaction.map(t => parseFloat(t.expense)).reduce((sum, current) => (sum + current)).toFixed(2)

            setAggregates({
                total,
                spent,
                earned,
            })
        }

    }, [transactions]);


    return (<div
        className={'flex  text-center justify-around shadow-lg bg-neutral text-neutral-content rounded-box p-3 flex-none mx-3 mb-3  items-center'}>
        <div>
            <h1>{aggregates.total}</h1>
            <span>total</span>
        </div>
        <div className={'p-2'}>
            <h2 className={'text-red-600'}>{aggregates.spent}</h2>
            <span>spent</span>
        </div>
        <div className={'p-2'}>
            <h2 className="text-green-400">{aggregates.earned}</h2>
            <span>earned</span>
        </div>
    </div>);
};

export default Totals;

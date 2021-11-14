import React, {FunctionComponent, ReactComponentElement, useEffect, useState} from 'react';
import {ITransaction} from "../models/Transaction";
import Dollars from "./Dollars";

interface OwnProps {
    transactions: ITransaction[]
} type Props = OwnProps;

const TransactionLog: FunctionComponent<Props> = ({transactions}) => {
    const [localTransactions, setLocalTransactions] = useState(transactions);

    useEffect(() => {
        setLocalTransactions(transactions);
    })

    let transaction_elements = [] as ReactComponentElement<any>[];
    if (localTransactions) {
        localTransactions.forEach((value, index) => {
            transaction_elements.push(
                <div className="transaction" key={index}>
                    <div className="transaction_label">{value.description}</div>
                    <div className="transaction_amount"><Dollars amount={value.expense} /></div>
                </div>
            );
        });
    }

    return (
        <div className={'transactionLog'}>
            {transaction_elements}
        </div>
    );
}; export default TransactionLog;
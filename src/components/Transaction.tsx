import React, {FunctionComponent} from 'react';
import {ITransaction} from "../models/transaction";

interface OwnProps {
    transaction: ITransaction
}

type Props = OwnProps;

const Transaction: FunctionComponent<Props> = ({transaction: {expense, description}}) => {
    return (<div className="alert mx-3 mb-2">
            <div className="flex-1">
                <label className="mx-3">{description}</label>
            </div>
            <div className="flex-none">
                <span className={`${expense > 0 ? 'text-green-400' : 'text-red-600'}`}>{expense}</span>
            </div>
        </div>
    );
};

export default Transaction;

import React, {FunctionComponent, useEffect, useState} from 'react';
import db from "./api/DB2";
import {Transaction, ITransaction} from "./models/Transaction";
import {Totals, ITotals} from './models/Totals'
import TotalBar from "./components/TotalBar";
import TransactionLog from "./components/TransactionLog";
import Toggle from "./components/Toggle";
import ButtonInput from "./components/ButtonInput";

interface OwnProps {} type Props = OwnProps;

const App: FunctionComponent<Props> = () => {
    const [transactions, setTransactions] = useState([] as ITransaction[]);
    const [newTransaction, setNewTransaction] = useState(new Transaction());
    const [totals, setTotals] = useState(new Totals());
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        db.get('/transactions')
            .then((response) => {
                let tempTransactions: ITransaction[] = response.data;
                let tempTotals = new Totals();
                for (let idx = 0; idx < tempTransactions.length; idx++) {
                    let log_item = new Transaction(tempTransactions[idx]);
                    let tempExpense = +log_item.expense;
                    if (isFinite(tempExpense)) {
                        tempTotals.balance += tempExpense;

                        if (tempExpense < 0) {
                            tempTotals.spent = tempTotals.spent + tempExpense;
                        }
                        else if (tempExpense > 0)
                            tempTotals.earned += tempExpense;
                    }
                }
                setTransactions(tempTransactions);
                setTotals(tempTotals);
            })
            .catch(err => {
                console.error(err)
                alert('Uh oh! Something went wrong.')
            });
    }, [])

    const handleToggle = (value: number) => {
        setShowForm(!!(value));
    }

    const handleInputOnChange = (e: any) => {
        const {name, value} = e.target;
        setNewTransaction({...newTransaction, [name]: value})
    }

    const handleOnSubmit = () => {
        db.post('/transactions', newTransaction)
            .then((response) => {
                setNewTransaction(new Transaction());
                let tempTransactions = [...transactions];
                tempTransactions.push(new Transaction(response.data));
                setTransactions(tempTransactions);
                setShowForm(false);
            })
    }

    return (
        <section className={"logger"}>
            <TotalBar totals={totals}/>
            <div className={"logger_body"}>
                <TransactionLog transactions={transactions} />
            </div>
            <div className={(showForm) ? 'logger_form show' : 'logger_form'}>
                <label className="inputField">
                    <div className="inputField_label">Description</div>
                    <input className="inputField_value" name={'description'} type={'text'} onChange={handleInputOnChange} value={newTransaction.description}></input>
                </label>
                <label className="inputField">
                    <div className="inputField_label">Price</div>
                    <input className="inputField_value" name={'expense'} type={'text'} onChange={handleInputOnChange} value={newTransaction.expense}></input>
                </label>
                <ButtonInput text='Submit Transaction' callback={handleOnSubmit}/>
            </div>
            <div className="logger_addNew">
                <Toggle callback={(value) => handleToggle(value)} element={
                    <div>{(showForm) ? '-' : '+'}</div>
                }/>
            </div>
        </section>
    )

}; export default App
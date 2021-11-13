import {ReactComponentElement, useState, useEffect} from 'react'
import db from '../api/db'
import Total from './Total'
import LineItem from './LineItem'
import Toggle from "./Toggle"
import NewTransactionForm from "./NewTransactionForm"
import {Transaction, transaction} from "../models/Transaction"

function Logger() {
    const [localTransactions, setLocalTransactions] = useState([] as transaction[]);
    const [showForm, setShowForm] = useState(false);
    const [total, setTotal] = useState({
        all: 0,
        earned: 0,
        spent: 0
    });

    useEffect(() => {
        db.getTransactions(function(tempTransactions: transaction[]) {

            // Calculate total, spent, and earned.
            let total = 0; let spent = 0; let earned = 0;
            for (let idx = 0; idx < tempTransactions.length; idx++) {
                let log_item = new Transaction(tempTransactions[idx]);
                let price = +log_item.expense;
                if (isFinite(price)) {
                    total += price;

                    if (price < 0) {
                        spent = spent + price;
                    }
                    else if (price > 0)
                        earned += price;
                }
            }
            setLocalTransactions([...tempTransactions]);
            setTotal({
                all: +total.toFixed(2),
                spent: +spent.toFixed(2),
                earned: +earned.toFixed(2)
            });
        });
    });

    const handleFormShow = (value: number) => {
        let showForm = !!(value);
        setShowForm(showForm);
    }

    const renderTransactions = () => {
        let content: any[] = localTransactions.map(
            function(i: transaction): ReactComponentElement<any> {
                const {id, description, expense} = i;
                let transaction_element: ReactComponentElement<any> = (
                    <LineItem key={description + id} label={description} price={expense.toString()}/>
                );
                return (transaction_element);
            }
        );
        return content;
    }

    const renderForm = (content?: ReactComponentElement<any>): ReactComponentElement<any> => {
        let showFormClass = (showForm) ? ' show' : '';
        return (<div className={"logger_form" + showFormClass}>{content}</div>)
    }

    let openClose = (showForm) ? '-' : '+';
  return (
    <div className="logger">
        <div className="logger_header">
            <div className="logger_header_overall">
                <Total big={true} amount={total.all} />
            </div>
            <div className="logger_header_snippet">
                <Total label={'earned'} amount={total.earned} />
            </div>
            <div className="logger_header_snippet">
                <Total label={'spent'} amount={total.spent} />
            </div>
        </div>
        <div className="logger_body">
            {renderTransactions()}
        </div>
        {renderForm(
            <NewTransactionForm />
        )}
        <div className="logger_addNew">
            <Toggle callback={(v) => handleFormShow(v)} element={
                <div>{openClose}</div>
            }/>
        </div>
    </div>
  )
}
export default Logger

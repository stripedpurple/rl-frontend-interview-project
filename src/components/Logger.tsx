import {CElement, ReactComponentElement, useState, useEffect} from 'react'
import db, {transaction_record} from '../api/db'
import Total from './Total'
import Transaction from './Transaction'
import Toggle from "./Toggle";
import NewTransactionForm from "./NewTransactionForm";

function Logger() {
    const defaultLocalTransactionValue: transaction_record[] = [];
    const [localTransactions, setLocalTransactions] = useState(defaultLocalTransactionValue);
    const [total, setTotal] = useState(0.00);
    const [spent, setSpent] = useState(0.00);
    const [earned, setEarned] = useState(0.00);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        db.getTransactions(function(transactions: transaction_record[]) {

            // Calculate total, spent, and earned.
            let total = 0; let spent = 0; let earned = 0;
            for (let idx = 0; idx < transactions.length; idx++) {
                let log_item = transactions[idx];
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

            setLocalTransactions([...transactions]);
            setTotal(total);
            setSpent(spent);
            setEarned(earned);
        });
    });

    const handleFormShow = (value: number) => {
        let showForm = !!(value);
        setShowForm(showForm);
    }

    const renderTransactions = () => {
        let content: any[] = localTransactions.map(
            function(i: transaction_record): ReactComponentElement<any> {
                const {id, description, expense} = i;
                let transaction_element: ReactComponentElement<any> = (
                    <Transaction key={description + id.toString()} label={description} price={expense}/>
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
                <Total big={true} amount={total} />
            </div>
            <div className="logger_header_snippet">
                <Total label={'earned'} amount={earned} />
            </div>
            <div className="logger_header_snippet">
                <Total label={'spent'} amount={spent} />
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

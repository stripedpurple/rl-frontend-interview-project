import db, {transaction_record} from '../api/db'
import {useState} from "react";
import InputField from './InputField'
import ButtonInput from './ButtonInput'

function NewTransactionForm() {
    const [desc, setDesc] = useState('');
    const [expense, setExpense] = useState(0.00);

    const handleInputChange = (key: string, value: any) => {
        if (key === 'description')
            setDesc(value);
        else if (key === 'expense')
            setExpense(value)
    }
    const handleOnSubmit = () => {
        if (desc && typeof desc === 'string' && desc.length > 0 && isFinite(expense) && expense.toString().length > 0){
            db.setTransactions({
                description: desc,
                expense: expense
            }, function() {
                alert('LineItem added.');
            });
        }
        else {
            alert('Make sure there is a valid product description and price.');
        }
    }

    return (
        <div className="newTransactionForm">
            <div className="newTransactionForm_input">
                <InputField name='description' label='Product' defaultValue={desc} callback={handleInputChange} />
            </div>
            <div className="newTransactionForm_input">
                <InputField name='expense' label='Price' type='text' defaultValue={expense} required={true} callback={handleInputChange} validate={(value: any) => {
                    if (value && (isFinite(value) || value === '-')) {
                        let value_array = value.toString().split('.');
                        let decimals = value_array[1];

                        // Cut off any decimal places after 2.
                        if (decimals) {
                            decimals = decimals.substring(0, 2);
                            value = value_array[0] + '.' + decimals;
                        }
                        return [true, value];
                    }
                    else
                        return [true, ''];
                }}/>
            </div>
            <div className="newTransactionForm_input">
                <ButtonInput text='Submit Transaction' callback={handleOnSubmit}/>
            </div>
        </div>
    )
}
export default NewTransactionForm

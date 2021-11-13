import {useState} from 'react'
import Dollars from './Dollars'

function LineItem(props: { price: string; label: string; }) {
    const [price, setPrice] = useState(props.price || 0.00);
    const [label, setLabel] = useState(props.label || '');

    return (
        <div className="transaction">
            <div className="transaction_label">{label}</div>
            <div className="transaction_amount"><Dollars amount={+price} /></div>
        </div>
    )
}
export default LineItem
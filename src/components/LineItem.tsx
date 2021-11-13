import Amount from './Amount'

function LineItem(props: { price: string; label: string; }) {
    const price = props.price || 0.00;
    const label = props.label || '';

    return (
        <div className="transaction">
            <div className="transaction_label">{label}</div>
            <div className="transaction_amount"><Amount amount={+price} /></div>
        </div>
    )
}
export default LineItem
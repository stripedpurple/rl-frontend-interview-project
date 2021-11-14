import {useState, useEffect} from 'react'

function Dollars(props: { amount: number; color?: boolean}) {
    const [amount, setAmount] = useState(props.amount);
    const [enableColor, setEnableColor] = useState(props.color || false);

    useEffect(() => {
        setAmount(props.amount);
        if (props.color)
            setEnableColor(props.color);
    });

    let dollars = Math.abs(amount).toFixed(2);
    let colorClass;
    if (amount < 0) {
        colorClass = (enableColor) ? ' neg' : '';
        dollars = '-$' + dollars;
    }
    else {
        colorClass = (enableColor) ? ' pos' : '';
        dollars = '$' + dollars;
    }

    return (
        <div className={"amount" + colorClass}>{dollars}</div>
    )
}
export default Dollars
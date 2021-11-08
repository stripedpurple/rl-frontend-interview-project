function Amount(props: { amount: number; color?: boolean}) {
    const amount = props.amount;
    const color = props.color || false;

    let dollars = Math.abs(amount).toFixed(2);
    let colorClass;
    if (amount < 0) {
        colorClass = (color) ? ' neg' : '';
        dollars = '-$' + dollars;
    }
    else {
        colorClass = (color) ? ' pos' : '';
        dollars = '$' + dollars;
    }

    return (
        <div className={"amount" + colorClass}>{dollars}</div>
    )
}
export default Amount
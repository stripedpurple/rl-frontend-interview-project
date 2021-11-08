import Amount from "./Amount";

function Total(props: { amount: number; label?: string; big?: boolean}) {
    let amount = props.amount;
    let label = props.label;
    let big = props.big || false;

    let bigClass = '';
    if (big)
        bigClass = ' total--bigger';

    return (
        <div className={"total" + bigClass}>
            <div className="total_amount"><Amount amount={amount} color={true}/></div>
            <div className="total_label">{label}</div>
        </div>
    )
}
export default Total
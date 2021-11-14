import React, {FunctionComponent, useEffect, useState} from 'react';
import Dollars from './Dollars'
import {ITotals} from '../models/Totals'

interface OwnProps {
    totals: ITotals
} type Props = OwnProps;

const TotalBar: FunctionComponent<Props> = ({totals}) => {
    const [localTotal, setLocalTotal] = useState(totals);

    useEffect(() => {
        setLocalTotal(totals);
    });

    return (
        <div className={'logger_header'}>
            <div className={"totalBar_header_overall"}>
                <div className={"total total--bigger"}>
                    <div className={"total_amount"}><Dollars amount={localTotal.balance} color={true}/></div>
                    <div className={"total_label"}></div>
                </div>
            </div>
            <div className={"logger_header_snippet"}>
                <div className={"total"}>
                    <div className={"total_amount"}><Dollars amount={localTotal.earned} color={true}/></div>
                    <div className={"total_label"}>Earned</div>
                </div>
            </div>
            <div className={"logger_header_snippet"}>
                <div className={"total"}>
                    <div className={"total_amount"}><Dollars amount={localTotal.spent} color={true}/></div>
                    <div className={"total_label"}>Spent</div>
                </div>
            </div>
        </div>
    );
}; export default TotalBar;
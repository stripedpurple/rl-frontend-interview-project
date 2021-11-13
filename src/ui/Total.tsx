import { useEffect, useState } from "react";
import { Transaction } from "../models/Transaction";
import Decimal from 'decimal.js';

interface prop{
    Transactions:Transaction[]
}

function Total(prop:prop) {

    const [total,setTotal]=useState(0)
    const [deposited,setDeposited]=useState(0)
    const [withdraw,setWithdraw]=useState(0)

    const calculate=()=>{
        let tempDeposit = new Decimal(0.0);
        let tempWithdraw = new Decimal(0.0);

        prop.Transactions.map((val, indx)=>{
            if(val.expense>0){
                tempDeposit= Decimal.sum(tempDeposit, val.expense)
            }
            else{
                tempWithdraw= Decimal.sum(tempWithdraw, val.expense)
            }
        })

        setDeposited(tempDeposit.toNumber());
        setWithdraw(tempWithdraw.toNumber());
        setTotal(Decimal.sum(tempDeposit, tempWithdraw).toNumber());
    }
    
    useEffect(() => {
        calculate();
    }, [calculate]);

    return (<div>
            Total: ${total}
            <br/>
            Deposited:${deposited} Withdrawn:${withdraw}
        </div>);
  }

  export default Total;
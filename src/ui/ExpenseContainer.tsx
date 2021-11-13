import { useEffect, useState } from "react";

import Total from "./Total";
import TransactionRecord from "./TransactionRecord";
import SubmitExpense from "../form/SubmitExpense";

import {Transaction} from '../models/Transaction';
import axios from "axios";

function ExpenseContainer() {

const [Transactions, setTransactions] =useState<Transaction[]>([])



const asd = ()=>{
  axios({
    method: 'get',
    url: 'http://localhost:3001/transactions',
    responseType: 'json'
  })
    .then(function (response) {
      console.log("response")
      console.log(response)
      // return response.data;
      setTransactions(response.data)
      
    });
}

useEffect(() => {
    asd();
  }, []);

    return (
        <div>
            <Total Transactions={Transactions} ></Total>
            {/* <button> add record</button> */}
            <SubmitExpense Transaction={undefined}></SubmitExpense>
            {
                Transactions.map((value, index)=>{
                    return(
                    <ul key={index}>
                      <TransactionRecord Transaction = {value}/>
                    </ul>
                    )

                    
                })
            }
        </div>
        );
  }

  export default ExpenseContainer;
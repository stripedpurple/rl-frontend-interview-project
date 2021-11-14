import { useEffect, useState } from "react";

import Total from "./Total";
import TransactionRecord from "./TransactionRecord";
import SubmitExpense from "./SubmitExpense";

import {Transaction} from '../models/Transaction';
import axios from "axios";

function ExpenseContainer() {

const [Transactions, setTransactions] =useState<Transaction[]>([])



const PullTransaction = ()=>{
  axios({
    method: 'get',
    url: 'http://localhost:3001/transactions',
    responseType: 'json'
  })
    .then( (response) => {
      setTransactions(response.data)
    });
}

useEffect(() => {
    PullTransaction();
  }, []);

    return (
        <div>
            <Total Transactions={Transactions} ></Total>
            <SubmitExpense onChange={(e:Transaction) => setTransactions([...Transactions, e])}></SubmitExpense>
            <br/>
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
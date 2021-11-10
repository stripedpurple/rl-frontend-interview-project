import {useEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'
import NavBar from './components/NavBar'
import Totals from "./components/Totals";
import Transaction from "./components/Transaction";
import {ITransaction} from "./models/transaction";
import api from './api'
import {AxiosResponse} from "axios";

function App() {
    const [transactions, setTransactions] = useState(new Array<ITransaction>());

    useEffect(() => {
        // api.get('/transactions')
        //     .then((LocalTransactions: AxiosResponse<Array<ITransaction>>) => {
        //         const {data} = LocalTransactions
        //         setTransactions(data)
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //         alert('Error loading data')
        //     })
    }, []);

    const add = (transaction: ITransaction) => {
        api.post('/transactions', transaction)
            .then((res) => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err)
                alert('')
            })
    }

    return (
        <section className={'container mx-auto flex flex-col'}>
            <NavBar onClick={add}/>
            <Totals transactions={transactions}/>
            <div className="flex overflow-y-auto flex-col flex-1 ">
                {transactions.map((transaction: ITransaction, idx: number) => <Transaction
                    key={idx} transaction={transaction}/>)}
            </div>

        </section>
    )
}

export default App
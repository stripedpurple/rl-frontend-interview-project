import { Transaction } from "../models/Transaction";

interface prop{
    Transaction:Transaction
}

function TransactionRecord(prop:prop) {

    return (<div>
            {prop.Transaction.description} - ${prop.Transaction.expense}
        </div>);
  }

  export default TransactionRecord;
import axios from "axios";
import { Transaction } from "../models/Transaction";
import { toast } from 'react-toastify';
interface prop{
    Transaction:Transaction
}

function SubmitExpense() {
    const handleInputChange=(event:any)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        // this.setState({
        //   [name]: value    });
    }
    const handleSubmit = () =>{
        // Send a POST request
        axios({
            method: 'post',
            url: 'http://localhost:3001/transactions',
            data: {
                desciption: 'Fred',
                expense: '-10.5'
            }
        }).then(function (response) {
            console.log(response)
            toast.success("Saved")
            
          });
    }

    return (
        <>
        <form>
          <label>
          description:
            <input
              name="description"
              type="string"
            //   value={this.state.numberOfGuests}
            //   onChange={this.handleInputChange} 
              />
          </label>
          <br />
          <label>
          expense:
            <input
              name="expense"       
              type="number"
            //   value={this.state.numberOfGuests}
            //   onChange={this.handleInputChange} 
              />
          </label>
        </form>
        <button type="submit" onClick={()=>handleSubmit()}> Add Record</button>
        </>
      );

  }

  export default SubmitExpense
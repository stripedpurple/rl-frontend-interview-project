import axios from "axios";
import { Transaction } from "../models/Transaction";
import { toast } from 'react-toastify';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
interface prop{
    Transaction:Transaction|undefined
}

function SubmitExpense(prop:prop) {
  // const [transaction, setTransaction] = useState<Transaction>(prop.Transaction??  {} as Transaction);

  // const { register, handleSubmit } = useForm();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Transaction>();
  const onSubmit: SubmitHandler<Transaction> = data => saveData(data);


    const saveData = (data:Transaction) =>{
        // Send a POST request
        axios({
            method: 'post',
            url: 'http://localhost:3001/transactions',
            data: {
              data
            }
        }).then(function (response) {
            console.log(response)
            toast("WOW!!")
          }).catch(function (ex){
            console.log(ex)
            toast.error("Someone done messed up A A Ron")
          });
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

        
        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue="" {...register("description", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.description && <span>This field is required</span>}
        
      
        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue="" {...register("expense", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.expense && <span>This field is required</span>}


          <input type="submit" value="submit"/>
        </form>
        </>
      );

  }

  export default SubmitExpense


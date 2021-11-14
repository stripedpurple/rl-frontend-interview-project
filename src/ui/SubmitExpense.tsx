import axios from "axios";
import { Transaction } from "../models/Transaction";
import { toast } from 'react-toastify';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import wowSound from "../assets/wow.mp3";
import sadSound from "../assets/Saaaaaad.mp3";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
interface prop{
    onChange:(e:Transaction)=>void
}

const schema = yup.object({
  description: yup.string().required(),
  expense: yup.number().required(),
}).required();

function SubmitExpense(prop:prop) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Transaction> = data => saveData(data);

    const saveData = (data:Transaction) =>{
      //we do this because data doesnt want to be a string
      let tempData = data;
      tempData.expense = tempData.expense.toString()
        // Send a POST request
        axios({
            method: 'post',
            url: 'http://localhost:3001/transactions',
            data: tempData
            
        }).then(function (response) {
            
            
            if(parseFloat(tempData.expense)>0){
              var wow = new Audio(wowSound); // buffers automatically when created
              wow.play();
              toast("WOW!!!!!!")
            }
            else{
              var sad = new Audio(sadSound); // buffers automatically when created
              sad.play();
              toast("My Bling Bling :(")
            }
            
            //call the callback to update the list
            prop.onChange(data)
          }).catch(function (ex){
            toast.error("Someone done messed up A A Ron")
          });
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Description:</label>
          {/* include validation with required or other standard HTML validation rules */}
          <input defaultValue="" {...register("description")} />
          
          <label>Expense:</label>
          <input defaultValue="" {...register("expense")} />

          <input type="submit" value="Add Record"/>
        </div>

        <div style={{color:'yellow'}} >
          {/* errors will return when field validation fails  */}
          {errors.description && <span>{errors.description.message}</span>}
          
          {/* errors will return when field validation fails  */}
          {errors.expense && <span>{errors.expense.message}</span>}

        </div>
        
        </form>
        </>
      );

  }

  export default SubmitExpense


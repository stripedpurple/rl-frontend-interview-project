import React, {FunctionComponent, useState} from 'react';
import {ITransaction} from "../models/transaction";

interface OwnProps {
    onClick(transaction:ITransaction): any | void
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = ({onClick}) => {
    const [localTransaction, setLocalTransaction] = useState({} as ITransaction);
    const handleSubmit = () => {
        setLocalTransaction({description: '', expense: 0})
    }

    return (

        <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box mx-3 my-2 justify-center px-4 py-3">

                    <input name={'description'} type="text" placeholder="Description" className="w-full input input-primary input-bordered mr-2"/>
                    <input name={'expense'} type="text" placeholder="Expense" className="w-full input input-primary input-bordered mr-2"/>
    {/*// @ts-ignore*/}
                    <button className="btn btn-primary" onClick={onclick}>Add</button>


        </div>
    );
};

export default NavBar;

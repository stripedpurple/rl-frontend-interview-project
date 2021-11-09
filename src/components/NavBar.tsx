import React, {FunctionComponent} from 'react';

interface OwnProps {
    onClick(): void
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = ({onClick}) => {

    return (

        <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box mx-3 my-2 justify-center px-4 py-3">

                    <input name={'description'} type="text" placeholder="Description" className="w-full input input-primary input-bordered mr-2"/>
                    <input name={'expense'} type="text" placeholder="Expense" className="w-full input input-primary input-bordered mr-2"/>
                    <button className="btn btn-primary" onClick={onclick}>Add</button>


        </div>
    );
};

export default NavBar;

import {CElement, ReactComponentElement, useState} from 'react'

function Toggle(props: { element: ReactComponentElement<any>; callback?: (on: number) => any}) {
    const [on, setOn] = useState(0);
    const content: any = props.element || 'Toggle';
    const callback = props.callback;

    const handleClick = () => {
        let value = (on) ? 0 : 1;
        if (typeof callback === 'function')
            callback(value);

        setOn(value);
    }

    return (
        <button
            className="toggle"
            onClick={() => handleClick()}
            onKeyUp={(e) => {
                if (e.key === 'Enter')
                handleClick();
            }}
        >
            <div className="toggle_content">{content}</div>
        </button>
    )
}
export default Toggle
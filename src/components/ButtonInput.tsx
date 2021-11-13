import {useState} from 'react'

function ButtonInput(props: { text: string; callback?: Function}) {
    const [text, setText] = useState(props.text || 'Button');
    const callback = props.callback;

    const handleClick = () => {
        if (typeof callback === 'function')
            callback();
    }

    return (
        <button className='buttonInput' onClick={handleClick}>{text}</button>
    )
}
export default ButtonInput
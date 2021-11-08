function ButtonInput(props: { text: string; callback?: Function}) {
    const callback = props.callback;
    const text = props.text || 'Button';

    const handleClick = () => {
        if (typeof callback === 'function')
            callback();
    }

    return (
        <button className='buttonInput' onClick={handleClick}>{text}</button>
    )
}
export default ButtonInput
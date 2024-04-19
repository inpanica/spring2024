import './Button.css'


function Button({ children, ...props }) {


    return (
        <>
            <button {...props} type={props.type ? props.type : 'button'} className={['main-button', props.className ? props.className : 'main-button_fill'].join(' ')}>
                <span className='main-button-text main-text'>
                    {children}
                </span>
            </button>
        </>
    )
}

export default Button

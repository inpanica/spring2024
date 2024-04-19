import './IconButton.css'


function IconButton({ children, ...props }) {


    return (
        <>
            <button {...props} type={props.type ? props.type : 'button'} className={['icon-button', props.className].join(' ')}>
                {children}
            </button>
        </>
    )
}

export default IconButton
import './Card.css'

function Card({children, ...props}) {


    return (
        <div className={['card', props.className].join(' ')}>
            {children}
        </div>
    )
}

export default Card
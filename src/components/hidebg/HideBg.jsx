import './HideBg.css'
function HideBg({...props}) {

    return (
        <div className={['hidebg', props.className].join(' ')} onClick={(e) => e.stopPropagation()}>

        </div>
    )
}

export default HideBg
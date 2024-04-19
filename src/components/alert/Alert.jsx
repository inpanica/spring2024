import './Alert.css'
import HideBg from '../hidebg/HideBg.jsx'
import Button from '../button/Button.jsx'
import { RxCross2 } from "react-icons/rx";
function Alert({active, setActive, actionFunction, title, text, ...props}) {


    const acceptFunction = () => {
        setActive(false);
        actionFunction();
    }

    return (
        <>
            <HideBg className={active ? '' : 'hidden'}></HideBg>
            <div className={['alert', active ? '' : 'hidden'].join(' ')} >
                <RxCross2 className='alert_cross-icon' onClick={() => setActive(false)}/>
                <h2 className="main-title">{title}</h2>
                <p className="main-text">{text}</p>
                <div className="auto-layout-h no-margin">
                    <Button className='main-button_fill' onClick={() =>  acceptFunction()}>Подтвердить</Button>
                    <Button className='main-button_black' onClick={() => setActive(false)}>Отмена</Button>
                </div>
            </div>
        </>
    )
}

export default Alert
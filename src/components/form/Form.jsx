import './Form.css'
import HideBg from '../hidebg/HideBg.jsx'
import Card from '../card/Card.jsx';
import { RxCross2 } from "react-icons/rx";
function Form({ active, setActive, children, ...props }) {

    return (
        <>
            <HideBg className={active ? '' : 'hidden'}></HideBg>
            <div className={['form', active ? '' : 'hidden'].join(' ')} >
                <Card>
                    <RxCross2 className='form_cross-icon' onClick={() => setActive(false)} />
                    {children}
                </Card>
            </div>
        </>
    )
}

export default Form

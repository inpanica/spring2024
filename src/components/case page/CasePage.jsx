import './CasePage.css'
import Card from '../card/Card.jsx'
import Button from '../button/Button.jsx'
import Input from '../input/Input.jsx'
import { BiUndo } from "react-icons/bi";
import { useEffect, useState, useRef } from 'react'
import config from '../../config.js';
import { addNewCase } from '../../actions.js';

function CasePage({ company, cases, user, ...props }) {

    const [formActive, setFormActive] = useState(false)
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [fd, setFd] = useState(null)

    const filePicker = useRef(null)

    const upload = async (event) => {
        const file = event.target.files[0]
        const formdata = new FormData();
        formdata.append('file', file)
        setFd(formdata);
    }

    const submitFun = async () => {
        if (name !== '' && about !== '') {
            const response = await addNewCase(name, about, user.company, localStorage.getItem('access'))
            console.log(response);
        }
    }

    return (
        <>
            <Card>
                <h2 className="main-title">Кейсы</h2>
                {
                    cases[0] ?
                        <div className='cases'>
                            {
                                cases.map((c) => {
                                    return <div key={c.id_ca} className='case'>
                                        <p className="main-text case-company">{c.company}</p>
                                        <p className="main-text no-margin case-name">{c.id_ca + ') ' + c.name}</p>
                                        {(company === c.company) && {
                                            
                                        }}
                                    </div>
                                })
                            }
                        </div> :
                        <h2 className='main-title'>Здесь пока ничего нет</h2>
                }
                {
                    user.company && !formActive && !(cases.filter(c => { return c.company === company.name }))[0] && <Button onClick={() => setFormActive(!formActive)}>Добавить кейс {company.name}</Button>
                }
            </Card>
            {
                formActive &&
                <Card className='user-page case-page'>
                    <h2 className="main-title">Добавить кейс {company.name}</h2>
                    <input name="file" type="file" id="input__file" className="hidden" onChange={upload} ref={filePicker} />
                    <Input inputValue={name} changeValueFun={(e) => { setName(e.target.value) }} placeholder='Название'></Input>
                    <Input inputValue={about} changeValueFun={(e) => { setAbout(e.target.value) }} placeholder='Описание' type='textarea'></Input>
                    <Button className='main-button_fill case-btn' onClick={() => { filePicker.current.click() }}>Добавить презентацию</Button>
                    <Button onClick={submitFun}>Сохранить</Button>
                    <Button onClick={() => { setFormActive(false) }} className='main-button_fill logout-btn'><BiUndo className='logout-icon'></BiUndo></Button>
                </Card>
            }
        </>
    )
}

export default CasePage
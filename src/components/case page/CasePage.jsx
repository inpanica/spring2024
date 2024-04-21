import './CasePage.css'
import Card from '../card/Card.jsx'
import Button from '../button/Button.jsx'
import Input from '../input/Input.jsx'
import { BiUndo } from "react-icons/bi";
import { GoCheck } from "react-icons/go";
import { useEffect, useState, useRef } from 'react'
import { FaFile } from "react-icons/fa";
import config from '../../config.js';
import { MdDeleteOutline } from "react-icons/md";
import { addCaseFile, addNewCase, deleteCase, teamAddJob } from '../../actions.js';

function CasePage({ team, teamMembers, company, cases, user, userChanged, setUserChanged, ...props }) {

    const [formActive, setFormActive] = useState(false)
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [fd, setFd] = useState(null)


    const filePicker = useRef(null)

    const getJob = async (id) => {
        const response = await teamAddJob(id, team.id_t, localStorage.getItem('access'))
        setUserChanged(!userChanged)
    }

    const upload = async (event) => {
        const file = event.target.files[0]
        const formdata = new FormData();
        formdata.append('photo', file)
        setFd(formdata);
    }

    const submitFun = async () => {
        if (name !== '' && about !== '') {
            const response = await addNewCase(name, about, user.company, localStorage.getItem('access'))
            setFormActive(false)
            setUserChanged(!userChanged);
            if (response.status === 200 && fd) {
                const fdResponse = await addCaseFile(response.data.id_ca, fd, localStorage.getItem('access'))
            }
            clearForm();
        }
    }

    const clearForm = () => {
        setFormActive(false);
        setFd(null);
        setAbout('');
        setName('');
    }

    const deleteFun = async (id) => {
        const response = await deleteCase(id)
        setUserChanged(!userChanged);
    }

    const downloadFile = (link) => {
        window.open(config.url + '/' + link)
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
                                        <p className="main-text no-margin case-name">{c.name}</p>
                                        {(company.name === c.company) &&
                                            <Button onClick={() => { deleteFun(c.id_ca) }} className='main-button_fill logout-btn case-del team-btns'>
                                                <MdDeleteOutline className='logout-icon'></MdDeleteOutline>
                                            </Button>
                                        }
                                        {
                                            !(c.file === '') && <Button disabled={c.file === null} onClick={() => { downloadFile(c.file) }} className='main-button_fill logout-btn case-file team-btns'>
                                                <FaFile className='logout-icon'></FaFile>
                                            </Button>
                                        }
                                        {
                                            (user.id === teamMembers.filter((m) => m.type === 'teamlead')[0].id)
                                            && !(props.teamJob.id_j) &&
                                            !(user.company) &&
                                            <Button onClick={() => { getJob(c.id_ca) }} className='main-button_fill logout-btn edit_btn case-chose team-btns'>
                                                <GoCheck className='logout-icon'></GoCheck>
                                            </Button>
                                        }

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
                    <Button onClick={() => { clearForm() }} className='main-button_fill logout-btn'><BiUndo className='logout-icon'></BiUndo></Button>
                </Card>
            }
        </>
    )
}

export default CasePage
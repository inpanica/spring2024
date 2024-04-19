import { useEffect, useState } from 'react'
import './TeamPage.css'
import Card from '../card/Card';
import Button from '../button/Button';
import Input from '../input/Input';

function TeamPage({ team, setTeam, ...props }) {

    const [formActive, setFormActive] = useState(false)

    return (
        <>
            {
                formActive ?
                    <Card className='team-form'>
                        <div className="main-title no-margin">Создать команду</div>
                        <Input placeholder='Название' className='no-margin'></Input>
                        <Input placeholder='Описание' type='textarea' className='no-margin'></Input>
                        <Button onClick={() => setFormActive(false)} className='team-btn main-button_stroke'>Добавить участников</Button>
                        <Button onClick={() => setFormActive(false)} className='team-btn main-button_fill'>Создать</Button>
                    </Card> :
                    <Card>
                        {
                            team.name ?
                                <div>
                                </div> :
                                <div>
                                    <div className="main-title">Вы не состоите в команде</div>
                                    <Button onClick={() => setFormActive(true)}>Создать команду</Button>
                                </div>
                        }
                    </Card>
            }
        </>

    )
}

export default TeamPage
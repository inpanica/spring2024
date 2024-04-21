import { useEffect, useRef, useState } from 'react'
import './TeamPage.css'
import Card from '../card/Card';
import Button from '../button/Button';
import Input from '../input/Input';
import config from '../../config';
import { BiUndo } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { addInvite, addTeam, changeJob, changeTeam, changeTeamBanner, deleteTeam, getAllUsers, getTeam, inviteRefuse, notificationDelete, removeFromTeam } from '../../actions';
import { IoPersonAddSharp, IoPersonRemoveSharp } from "react-icons/io5";

function TeamPage({ teamJob, user, team, setTeam, userChanged, setUserChanged, ...props }) {

    const [formActive, setFormActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [memberActive, setMemberActive] = useState(false)
    const [users, setUsers] = useState([{}])
    const [usersInvited, setUsersInvited] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [banner, setBanner] = useState('')
    const [github, setGithub] = useState('')
    const [githubActive, setGithubActive] = useState('')

    const bannerRef = useRef(null)
    const photoRef = useRef(null)

    useEffect(() => {
        const searchMembersFun = async () => {
            const response = await getAllUsers();
            if (response.status === 200) {
                setUsers(response.data)
            }
        }
        if (memberActive) {
            searchMembersFun()
        }
    }, [memberActive])

    useEffect(() => {
        if (!formActive) {
            setMemberActive(false)
        }
    }, [formActive])

    const inviteUser = (u) => {
        if (!(usersInvited.includes(u))) {
            setUsersInvited([...usersInvited, u]);
        }
    }

    const deleteInvite = (u) => {
        setUsersInvited(usersInvited.filter(user => user.id !== u.id))
    }

    const fileChange = async (e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setBanner(fileReader.result)
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const submitFun = async () => {
        let team_id = ''
        if (about !== '' && name !== '') {
            const response = await addTeam(user.id, name, about, localStorage.getItem('access'));
            if (response.status === 200) {
                team_id = response.data.id_t
                if (bannerRef.current.files[0]) {
                    const formdata = new FormData();
                    const file_name = user.email + bannerRef.current.files[0].name
                    const new_file = new File([bannerRef.current.files[0]], file_name, { type: bannerRef.current.files[0].type });
                    formdata.append('photo', new_file)
                    const photoResponse = await changeTeamBanner(team_id, formdata, localStorage.getItem('access'));
                    setUserChanged(!userChanged);
                }
                if (usersInvited[0]) {
                    usersInvited.map(async (u) => {
                        let response = await addInvite(u.id, team_id, localStorage.getItem('access'));
                        console.log(response);
                    })
                }
                setUserChanged(!userChanged);
                setFormActive(false);
            }
        }
    }

    const saveFun = async () => {
        let data = {};

        if (name) {
            data.name = name;
        }
        if (about) {
            data.about = about;
        }
        if (photoRef.current.files[0]) {
            const formdata = new FormData();
            const file_name = user.email + photoRef.current.files[0].name
            const new_file = new File([photoRef.current.files[0]], file_name, { type: photoRef.current.files[0].type });
            formdata.append('photo', new_file)
            const photoResponse = await changeTeamBanner(team.id_t, formdata, localStorage.getItem('access'))
        }
        data.id_t = team.id_t;
        const response = await changeTeam(data, localStorage.getItem('access'));
        setUserChanged(!userChanged)
        setEditActive(false);
    }

    const deleteFun = async () => {
        const response = await deleteTeam(user.id, localStorage.getItem('access'));
        if (response.status === 200) {
            setUserChanged(!userChanged);
        }
    }

    const deleteUserFun = async (user) => {
        const emailResponse = await notificationDelete(user.id);
        const response = await removeFromTeam(user.id, localStorage.getItem('access'));
        setUserChanged(!userChanged);
    }

    const deleteInviteFun = async (i) => {
        const response = await inviteRefuse(i.user.id, team.id_t)
        console.log(response);
        setUserChanged(!userChanged)
    }

    const changeGithub = async () => {
        if(github !== ''){
            const response = await changeJob(teamJob.id_j, github, localStorage.getItem('access'))
            if(response.status === 200) {
                setGithub('')
                setGithubActive(false)
                setUserChanged(!userChanged)
            }
        }
    }

    const filtredUsers = users.filter(u => {
        return (u.first_name + ' ' + u.last_name).toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <>
            {
                formActive ?
                    <Card className='team-form'>
                        <div className="main-title no-margin">Создать команду</div>
                        <input ref={bannerRef} type='file' accept="image/png, image/jpeg" className='hidden' onChange={(e) => fileChange(e)} ></input>
                        <img onClick={() => bannerRef.current.click()} className='user-photo user-photo_change team-photo-change' src={banner || config.url + '/media/teams_banner/default.png'} alt="" />
                        <Input placeholder='Название' className='no-margin' value={name} changeValueFun={(e) => setName(e.target.value)}></Input>
                        <Input placeholder='Описание' type='textarea' className='no-margin' value={about} changeValueFun={(e) => setAbout(e.target.value)}></Input>
                        <div className="users-all">
                            {
                                usersInvited.map((u) => {
                                    return <div className='user' key={u.id}>
                                        <img src={config.url + '/' + u.photo} alt="" className="user-info-photo" />
                                        <div className="user-info-text">
                                            <div className="main-text no-margin">{u.first_name + ' ' + u.last_name}</div>
                                            <div className="main-text desc no-margin">{u.role}</div>
                                        </div>
                                        <Button onClick={() => { deleteInvite(u) }} className='main-button_fill logout-btn remove-btn'><IoPersonRemoveSharp className='logout-icon'></IoPersonRemoveSharp></Button>
                                    </div>
                                })
                            }
                        </div>
                        <Button onClick={() => setMemberActive(!memberActive)} className='team-btn main-button_stroke'>Добавить участников</Button>
                        <Button onClick={submitFun} className='team-btn main-button_fill'>Создать</Button>
                    </Card> :
                    <Card className='team-form'>
                        {
                            team.name ?
                                <>
                                    {editActive ?
                                        <div className='user-page'>
                                            <div className="main-title">Изменить команду</div>
                                            <input ref={photoRef} type='file' accept="image/png, image/jpeg" className='hidden' onChange={(e) => fileChange(e)} ></input>
                                            <img onClick={() => photoRef.current.click()} className='user-photo user-photo_change team-photo-change' src={banner || config.url + '/media/teams_banner/default.png'} alt="" />
                                            <Input placeholder='Название' className='' value={name} changeValueFun={(e) => setName(e.target.value)}></Input>
                                            <Input placeholder='Описание' className='' value={about} changeValueFun={(e) => setAbout(e.target.value)}></Input>
                                            <Button onClick={() => { setEditActive(false) }} className='main-button_fill logout-btn team-btns'><BiUndo className='logout-icon'></BiUndo></Button>
                                            <p className="main-text desc">*пустые поля останутся без изменений</p>
                                            <Button onClick={() => saveFun()}>Сохранить</Button>
                                        </div> :
                                        <div className='user-page'>
                                            <div className="main-title">Ваша команда</div>
                                            <img src={config.url + '/' + team.banner} className=' user-photo_change team-photo-change team-photo' alt="" />
                                            <div className="main-text team-name">{team.name}</div>
                                            <div className="main-text">{team.about}</div>
                                            {
                                                user.id === props.teamMembers.filter((m) => m.type === 'teamlead')[0].id && <>
                                                    <Button onClick={() => { deleteFun() }} className='main-button_fill logout-btn team-btns'><MdDeleteOutline className='logout-icon'></MdDeleteOutline></Button>
                                                    <Button onClick={() => { setEditActive(true) }} className='main-button_fill logout-btn edit_btn team-btns'><CiEdit className='logout-icon'></CiEdit></Button>
                                                </>
                                            }
                                            <div className="team-members">
                                                <p className='main-title'>Участники</p>
                                                {props.teamMembers.map((m) => {
                                                    return <div className='user' key={m.id}>
                                                        <img src={config.url + '/' + m.photo} alt="" className="user-info-photo" />
                                                        <div className="user-info-text">
                                                            <div className="main-text no-margin">{m.first_name + ' ' + m.last_name}</div>
                                                            <div className="main-text desc no-margin">{m.role}</div>
                                                        </div>
                                                        {
                                                            (m.type !== 'teamlead' && user.id === props.teamMembers.filter((m) => m.type === 'teamlead')[0].id) &&
                                                            <Button onClick={() => { deleteUserFun(m) }} className='main-button_fill logout-btn remove-btn'><IoPersonRemoveSharp className='logout-icon'></IoPersonRemoveSharp></Button>
                                                        }
                                                    </div>

                                                })}
                                            </div>
                                            {
                                                props.teamInvites[0] &&
                                                <div className="team-members">
                                                    <p className='main-title'>Приглашённые участники</p>
                                                    {props.teamInvites.map((m) => {
                                                        return <div className='user' key={m.id_i}>
                                                            <img src={config.url + '/' + m.user.photo} alt="" className="user-info-photo" />
                                                            <div className="user-info-text">
                                                                <div className="main-text no-margin">{m.user.first_name + ' ' + m.user.last_name}</div>
                                                                <div className="main-text desc no-margin">{m.user.role}</div>
                                                            </div>
                                                            {
                                                                (m.type !== 'teamlead') &&
                                                                <Button onClick={() => { deleteInviteFun(m) }} className='main-button_fill logout-btn remove-btn'><IoPersonRemoveSharp className='logout-icon'></IoPersonRemoveSharp></Button>
                                                            }
                                                        </div>

                                                    })}
                                                </div>}
                                            {
                                                !(teamJob.case === undefined) &&
                                                <div className="case-members">
                                                    <p className='main-title'>Выбранный кейс</p>
                                                    <p className="main-text no-margin">{teamJob.case.company}</p>
                                                    <p className="main-text">{teamJob.case.name}</p>
                                                    {
                                                        githubActive ?
                                                            <>
                                                                <Input placeholder='github' inputValue={github} changeValueFun={(e) => { setGithub(e.target.value) }}></Input>
                                                                <Button onClick={changeGithub}>Сохранить</Button>
                                                            </> :
                                                            <p className="main-text">{'github: ' + (teamJob.github !== null ? teamJob.github : 'не указан')}</p>
                                                    }
                                                    <Button onClick={() => { setGithubActive(!githubActive) }} className='main-button_fill logout-btn edit_btn job-btn'><CiEdit className='logout-icon'></CiEdit></Button>
                                                </div>
                                            }

                                        </div>
                                    }
                                </>
                                :
                                <div>
                                    <div className="main-title">Вы не состоите в команде</div>
                                    <Button onClick={() => setFormActive(true)}>Создать команду</Button>
                                </div>
                        }
                    </Card>
            }
            {
                memberActive &&
                <Card>
                    <Input inputValue={searchQuery} changeValueFun={(e) => { setSearchQuery(e.target.value) }} placeholder='Поиск по участникам...'></Input>
                    <div className="users-all">
                        {
                            filtredUsers.map((u) => {
                                if (u.id !== user.id && !(usersInvited.includes(u))) {
                                    return <div className='user' key={u.id}>
                                        <img src={config.url + '/' + u.photo} alt="" className="user-info-photo" />
                                        <div className="user-info-text">
                                            <div className="main-text no-margin">{u.first_name + ' ' + u.last_name}</div>
                                            <div className="main-text desc no-margin">{u.role}</div>
                                        </div>
                                        <Button onClick={() => { inviteUser(u) }} className='main-button_fill logout-btn add-btn'><IoPersonAddSharp className='logout-icon'></IoPersonAddSharp></Button>
                                    </div>
                                }
                            })
                        }
                    </div>
                </Card>
            }
        </>

    )
}

export default TeamPage
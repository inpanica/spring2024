import './UserPage.css'
import Card from '../card/Card';
import Button from '../button/Button';
import { RiLogoutBoxLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Input from '../input/Input';
import { BiUndo } from "react-icons/bi";
import { GoCheck } from "react-icons/go";
import config from '../../config';
import { useState, useRef } from 'react';
import { editUser, changeUserPhoto, inviteRefuse, inviteAccept } from '../../actions';

function UserPage({ user, setUser, setUserChanged, userChanged, invites, ...props }) {

    const [edit, setEdit] = useState(false)
    const [photo, setPhoto] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [role, setRole] = useState('')

    const photoRef = useRef(NaN);

    const logoutFun = () => {
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
        setUser({})
    }

    const fileChange = async (e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPhoto(fileReader.result)
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const undoEdit = () => {
        setEdit(false);
        setPhoto('');
    }

    const submitFun = async () => {
        let data = {};

        if (name.split(' ')[2]) {
            data.first_name = name.split(' ')[1]
            data.last_name = name.split(' ')[0]
            data.father_name = name.split(' ')[2]
        }
        if (email) {
            data.email = email;
        }
        if (role) {
            data.role = role;
        }
        if (about) {
            data.about = about;
        }
        if (photoRef.current.files[0]) {
            const formdata = new FormData();
            const file_name = user.email + photoRef.current.files[0].name
            const new_file = new File([photoRef.current.files[0]], file_name, { type: photoRef.current.files[0].type });
            formdata.append('photo', new_file)
            const photoResponse = await changeUserPhoto(formdata, localStorage.getItem('access'))
        }
        const response = await editUser(localStorage.getItem('access'), data);
        setUserChanged(!userChanged)
        setEdit(false);
    }

    const agreeInvite = async (i) => {
        const response = await inviteAccept(i.id_u, i.team.id_t)
        setUserChanged(!userChanged);
    }

    const discardInvite = async (i) => {
        const response = await inviteRefuse(i.id_u, i.team.id_t)
        setUserChanged(!userChanged);
    }

    return (
        <>
            {
                edit ?
                    <Card className='user-page'>
                        <div className="main-title">Изменить личные данные</div>
                        <div className="user-data">
                            <input ref={photoRef} type='file' accept="image/png, image/jpeg" className='hidden' onChange={(e) => fileChange(e)} ></input>
                            <img onClick={() => photoRef.current.click()} className='user-photo user-photo_change' src={photo || config.url + '/' + user.photo} alt="" />
                            <div className="user-text">
                                <Input inputValue={name} changeValueFun={(e) => setName(e.target.value)} placeholder='Фамилия имя отчество'></Input>
                                <Input inputValue={email} changeValueFun={(e) => setEmail(e.target.value)} placeholder='Почта'></Input>
                                <Input inputValue={role} changeValueFun={(e) => setRole(e.target.value)} placeholder='Направление'></Input>
                                <Input inputValue={about} changeValueFun={(e) => setAbout(e.target.value)} placeholder='О себе' type='textarea'></Input>
                                <p className="main-text desc">*пустые поля останутся без изменений</p>
                                <Button onClick={() => submitFun()}>Сохранить</Button>
                            </div>
                        </div>
                        <Button onClick={() => { undoEdit() }} className='main-button_fill logout-btn'><BiUndo className='logout-icon'></BiUndo></Button>
                    </Card> :
                    <Card className='user-page'>
                        <div className="main-title">Личный кабинет</div>
                        <div className="user-data">
                            <img src={config.url + '/' + user.photo} className='user-photo' />
                            <div className="user-text">
                                <div className="main-text username no-margin">{user.firstName + ' ' + user.fatherName + ' ' + user.lastName}</div>
                                <div className="main-text user-role">{user.email}</div>
                                <div className="main-text user-role">{user.role}</div>
                                <div className="main-text user-about">{user.about}</div>
                            </div>
                        </div>
                        <Button onClick={() => { logoutFun() }} className='main-button_fill logout-btn'><RiLogoutBoxLine className='logout-icon'></RiLogoutBoxLine></Button>
                        <Button onClick={() => { setEdit(true) }} className='main-button_fill logout-btn edit_btn'><CiEdit className='logout-icon'></CiEdit></Button>
                        {invites[0] && <h2 className="main-title">Приглашения в команды</h2>}
                        <div className="users-all">
                            {
                                invites.map((i) => {
                                    return <div key={i.id_i} className='team-invite'>
                                        <img src={config.url + '/' + i.team.banner} alt="" className="team-invite-photo" />
                                        <p className="main-text no-margin">{i.team.name}</p>
                                        <Button onClick={() => {agreeInvite(i)}} className='main-button_fill logout-btn edit_btn'><GoCheck className='logout-icon'></GoCheck></Button>
                                        <Button onClick={() => {discardInvite(i)}} className='main-button_fill logout-btn'><RxCross2 className='logout-icon'></RxCross2></Button>
                                    </div>
                                })
                            }
                        </div>
                    </Card>
            }
        </>
    )
}

export default UserPage
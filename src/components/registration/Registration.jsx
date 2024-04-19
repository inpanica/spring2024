import './Registration.css'
import Button from '../button/Button.jsx'
import Input from '../input/Input.jsx'
import IconButton from '../icon button/IconButton.jsx'
import { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Card from '../card/Card.jsx'
import { login, register, getUser } from '../../actions.js'
import { Link } from 'react-router-dom'

function Registration({ setUser, ...props }) {

    const [firstName, setFirstName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [about, setAbout] = useState('')

    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [secondPasswordVisible, setSecondPasswordVisible] = useState(false)
    const [secondPassword, setSecondPassword] = useState('')

    const [error, setError] = useState('')

    const buttonSubmit = async () => {
        if (password !== secondPassword) {
            setError('Пароли не совпадают.')
        }
        else if (email === '' || password === '' || firstName === '' || lastName === '' || role === '' || about === '') {
            setError('Все поля должны быть заполнены')
        }
        else {
            const response = await register(firstName, lastName, fatherName, role, about, password, email);
            if (response.status === 400) {
                setError(response.data.detail)
            }
            if (response.status === 201) {
                const loginResponse = await login(email, password)
                if (loginResponse.status === 201) {
                    localStorage.setItem('access', loginResponse.data.access_token)
                    localStorage.setItem('refresh', loginResponse.data.refresh_token)
                    const getResponse = await getUser(localStorage.getItem('access'));
                    if(getResponse.status === 200){
                        setUser(getResponse.data)
                    }
                    setPassword('')
                    setAbout('')
                    setSecondPassword('')
                    setLastName('')
                    setFatherName('')
                    setFirstName('')
                    setRole('')
                    setEmail('')
                }
            }
        }
    }

    useEffect(() => {
        setError('')
    }, [firstName, lastName, fatherName, email, role, about, password, secondPassword])

    return (
        <Card>
            <div className='registration-wrapper'>
                <div className="registration-block">
                    <div className="registration-form">
                        <h1 className="main-title">
                            Регистрация участника
                        </h1>
                        <Input placeholder="Имя" inputValue={firstName} changeValueFun={(e) => setFirstName(e.target.value)} />
                        <Input placeholder="Фамилия" inputValue={lastName} changeValueFun={(e) => setLastName(e.target.value)} />
                        <Input placeholder="Отчество" inputValue={fatherName} changeValueFun={(e) => setFatherName(e.target.value)} />
                        <Input placeholder="Почта" inputValue={email} changeValueFun={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Направление" inputValue={role} changeValueFun={(e) => setRole(e.target.value)} />
                        <Input placeholder="Немного о себе" type='textarea' inputValue={about} changeValueFun={(e) => setAbout(e.target.value)} />
                        <div className="password-input-wrapper">
                            <Input placeholder="Пароль" type={passwordVisible ? 'text' : 'password'} inputValue={password} changeValueFun={(e) => setPassword(e.target.value)} />
                            <IconButton className='password-visbtn' onClick={() => setPasswordVisible(!passwordVisible)}>
                                {
                                    !passwordVisible ?
                                        <AiOutlineEye></AiOutlineEye> :
                                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                }
                            </IconButton>
                        </div>
                        <div className="password-input-wrapper">
                            <Input placeholder="Пароль повторно" type={secondPasswordVisible ? 'text' : 'password'} inputValue={secondPassword} changeValueFun={(e) => setSecondPassword(e.target.value)} />
                            <IconButton className='password-visbtn' onClick={() => setSecondPasswordVisible(!secondPasswordVisible)}>
                                {
                                    !secondPasswordVisible ?
                                        <AiOutlineEye></AiOutlineEye> :
                                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                }
                            </IconButton>
                        </div>
                        <Button onClick={buttonSubmit} className='reg_send_button main-button_fill' >Зарегистрироваться</Button>
                        <p className={["registration-alternate-description error-massage", error ? '' : 'error-massage-hidden'].join(' ')}>{error}</p>
                        <p className="registration-alternate-description main-text no-margin">
                            Уже есть аккаунт? <Link to={'/authorization'} className="registration-alternate-description-link">Войти</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Registration
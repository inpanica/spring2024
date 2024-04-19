import './Authorization.css'
import Button from '../button/Button.jsx'
import Input from '../input/Input.jsx'
import IconButton from '../icon button/IconButton.jsx'
import { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom'
import Card from '../card/Card.jsx'
import { login, getUser } from '../../actions.js'

function Authorization({ setUser, ...props }) {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [error, setError] = useState('')

    const buttonSubmit = async () => {
        if (email === '' || password === '') {
            setError('Все поля должны быть заполнены')
        }
        else {
            const response = await login(email, password)
            console.log(response);
            if (response.status === 400) {
                setError(response.data.detail)
            }
        }
    }

    useEffect(() => {
        setError('')
    }, [email, password])

    return (
        <Card>
            <div className='registration-wrapper'>
                <div className="registration-block">
                    <div className="registration-form">
                        <h1 className="main-title">
                            Вход
                        </h1>
                        <Input placeholder="Почта" inputValue={email} changeValueFun={(e) => setEmail(e.target.value)} />
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
                        <Button onClick={buttonSubmit} className='reg_send_button main-button_fill'>Войти</Button>
                        <p className={["registration-alternate-description error-massage", error ? '' : 'error-massage-hidden'].join(' ')}>{error}</p>
                        <p className="registration-alternate-description main-text no-margin">
                            Еще не зарегистрировались? <Link to={'/registration'} className="registration-alternate-description-link">Регистрация</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Authorization
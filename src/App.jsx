import './App.css'
import { Route, Routes, BrowserRouter, Navigate, Link } from 'react-router-dom'
import Registration from './components/registration/Registration.jsx';
import Authorization from './components/authorization/Authorization.jsx';
import Carousel from './components/Carousel/Carousel.jsx'
import Header from './components/header/Header.jsx'
import { getTeam, getUser, refreshToken } from './actions.js';
import { useEffect, useState } from 'react';
import TeamPage from './components/team page/TeamPage.jsx';

function App() {

    const [user, setUser] = useState({});
    const [team, setTeam] = useState({});

    const [slides, setSlides] = useState([
        { 'name': 'FV Kostill', 'banner': "https://random.imagecdn.app/500/500", 'link': '' },
        { 'name': 'Turtle team', 'banner': "https://random.imagecdn.app/500/700", 'link': '' },
        { 'name': 'Turtl team', 'banner': "https://random.imagecdn.app/500/700", 'link': '' },
        { 'name': 'Turle team', 'banner': "https://random.imagecdn.app/500/700", 'link': '' },
        { 'name': 'Tule team', 'banner': "https://random.imagecdn.app/500/700", 'link': '' }
    ])

    const appendUser = (data) => {
        setUser(
            {
                'firstName': data.first_name,
                'lastName': data.last_name,
                'fatherName': data.father_name,
                'email': data.email,
                'role': data.role,
                'about': data.about,
                'id': data.id_u
            })
    }

    useEffect(() => {
        const userMountFun = async () => {
            if (user.id) {
                const response = await getTeam(localStorage.getItem('access'), user.id);
                if (response.status === 200) {
                    setTeam(response.data.detail);
                }
            }
        }
        userMountFun();

    }, [user])

    useEffect(() => {
        const onMountFun = async () => {
            if (localStorage.getItem('access')) {
                const response = await getUser(localStorage.getItem('access'));
                appendUser(response.data)
                if (response.status === 403) {
                    const refreshResponse = await refreshToken(localStorage.getItem('refresh'));
                    if (refreshResponse.status === 200) {
                        localStorage.setItem('access', refreshResponse.data.access_token)
                        localStorage.setItem('refresh', refreshResponse.data.refresh_token)
                        const response2 = await getUser(localStorage.getItem('access'))
                        if (response2.status === 200) {
                            appendUser(response2.data)
                        }
                    }
                    else {
                        localStorage.removeItem('access')
                        localStorage.removeItem('refresh')
                    }
                }
            }
        }
        onMountFun();
    }, [])

    return (
        <>
            <BrowserRouter>
                <div className="ctn">
                <Header user={user}></Header>
                    <div className="content">
                        {user.id ?
                            <Routes>
                                <Route path='/team' element={<TeamPage team={team} setTeam={setTeam} />} />
                                <Route path='/' element={<Carousel slides={slides} />} />
                                <Route path='/*' element={<Navigate to='/' />} />
                            </Routes> :
                            <Routes>
                                <Route path='/registration' element={<Registration setUser={appendUser} />} />
                                <Route path='/authorization' element={<Authorization setUser={setUser} />} />
                                <Route path='/*' element={<Navigate to='/registration' />} />
                            </Routes>}
                    </div>
                </div>
            </BrowserRouter >


        </>
    )
}

export default App

import './App.css'
import { Route, Routes, BrowserRouter, Navigate, Link } from 'react-router-dom'
import Registration from './components/registration/Registration.jsx';
import Authorization from './components/authorization/Authorization.jsx';
import Carousel from './components/Carousel/Carousel.jsx'
import Header from './components/header/Header.jsx'
import { getAllTeams, getCases, getCompany, getExpert, getTeam, getTeamMembers, getUser, inviteByTeam, inviteByUser, refreshToken } from './actions.js';
import { useEffect, useState } from 'react';
import TeamPage from './components/team page/TeamPage.jsx';
import UserPage from './components/user page/UserPage.jsx'
import AuthorizationExpert from './components/authorization expert/AuthorizationExpert.jsx';
import CasePage from './components/case page/CasePage.jsx';
import Autoinvite from './components/autoinvite/Autoinvite.jsx';

function App() {

    const [userChanged, setUserChanged] = useState(false)
    const [user, setUser] = useState({});
    const [team, setTeam] = useState({});
    const [teamMembers, setTeamMembers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [teamInvites, setTeamInvites] = useState([]);
    const [allTeams, setAllTeams] = useState([])
    const [cases, setCases] = useState([])
    const [company, setCompany] = useState({})

    const appendUser = (data) => {
        setUser(
            {
                'firstName': data.first_name,
                'lastName': data.last_name,
                'fatherName': data.father_name,
                'email': data.email,
                'role': data.role,
                'about': data.about,
                'id': data.id_u,
                'photo': data.photo
            })
    }

    useEffect(() => {
        const getCasesFun = async () => {
            const response = await getCases()
            if(response.status === 200){
                setCases(response.data)
            }
        }

        const getCompanyFun = async (id) => {
            const companyResponse = await getCompany(id);
            if(companyResponse.status === 200) {
                setCompany(companyResponse.data)
            }
        }

        if(user.company){
            getCompanyFun(user.company)
        }
        getCasesFun()
    }, [userChanged, user])

    setInterval(() => {
        setUserChanged(!userChanged);
    }, 60000)

    useEffect(() => {
        const userMountFun = async () => {
            if (user.id) {
                const response = await getTeam(localStorage.getItem('access'), user.id);
                if (response.status === 200) {
                    setTeam(response.data);
                }
            }
        }
        userMountFun();
    }, [user])

    useEffect(() => {
        const getTeamUsers = async () => {
            if (team.id_t) {
                const response = await getTeamMembers(team.id_t, localStorage.getItem('access'));
                setTeamMembers(response.data.detail);
                const responseInvites = await inviteByTeam(team.id_t, localStorage.getItem('access'));
                setTeamInvites(responseInvites.data);
            }
        }
        getTeamUsers();
    }, [team])

    useEffect(() => {
        const onMountFun = async () => {
            if (localStorage.getItem('access')) {
                let response = await getUser(localStorage.getItem('access'));
                if (response.status === 200) {
                    appendUser(response.data)
                }
                if (response.status === 404) {
                    response = await getExpert(localStorage.getItem('access'));
                    setUser(response.data)
                }
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
            const responseAllTeams = await getAllTeams()
            setAllTeams(responseAllTeams.data)
            console.log(responseAllTeams.data);
        }
        onMountFun();
    }, [userChanged])

    useEffect(() => {
        const getMyInvites = async () => {
            if (user.id) {
                const response = await inviteByUser(user.id, localStorage.getItem('access'));
                if (response.status === 200) {
                    setInvites(response.data)
                }
            }
        }
        getMyInvites()
    }, [user])

    return (
        <>
            <BrowserRouter>
                <div className="ctn">
                    {user.id &&
                        <Header user={user}></Header>
                    }
                    <div className="content">
                        {user.id ?
                            <Routes>
                                <Route path='/team' element={<TeamPage
                                    teamInvites={teamInvites}
                                    teamMembers={teamMembers}
                                    userChanged={userChanged}
                                    setUserChanged={setUserChanged}
                                    user={user}
                                    team={team}
                                    setTeam={setTeam}
                                />} />
                                <Route path='/user' element={<UserPage
                                    invites={invites}
                                    userChanged={userChanged}
                                    setUserChanged={setUserChanged}
                                    user={user}
                                    setUser={setUser} />} />
                                <Route path='/' element={<Carousel slides={allTeams} />} />
                                {invites.map((i) => {
                                    return <Route path={'/' + i.id_i + '/' + i.id_u} element={<Autoinvite invite={i} />} />
                                })}
                                <Route path='/case' element={<CasePage company={company} cases={cases} user={user}/>} />
                                <Route path='/*' element={<Navigate to='/' />} />
                            </Routes> :
                            <Routes>
                                <Route path='/registration' element={<Registration setUser={appendUser} />} />
                                <Route path='/authorization' element={<Authorization userChanged={userChanged} setUserChanged={setUserChanged} setUser={setUser} />} />
                                <Route path='/authorization-org' element={<AuthorizationExpert userChanged={userChanged} setUserChanged={setUserChanged} setUser={setUser} />} />
                                <Route path='/*' element={<Navigate to='/registration' />} />
                            </Routes>}
                    </div>
                </div>
            </BrowserRouter >
        </>
    )
}

export default App

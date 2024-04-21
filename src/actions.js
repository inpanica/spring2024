import axios from "axios"
import config from "./config.js"

export const register = async (firstName, lastName, fatherName, role, about, password, email) => {
    try {
        const response = await axios.post(config.url + '/auth/register',
            {
                first_name: firstName,
                last_name: lastName,
                father_name: fatherName,
                role: role,
                about: about,
                password: password,
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const registerExpert = async (firstName, lastName, fatherName, role, company, password, email) => {
    try {
        const response = await axios.post(config.url + '/experts/register',
            {
                first_name: firstName,
                last_name: lastName,
                father_name: fatherName,
                role: role,
                company: company,
                password: password,
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}


export const login = async (email, password) => {
    try {
        const response = await axios.post(config.url + '/auth/login', {
            email: email,
            password: password
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const loginExpert = async (email, password) => {
    try {
        const response = await axios.post(config.url + '/experts/login', {
            email: email,
            password: password
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        localStorage.setItem('access', response.data.access_token)
        localStorage.setItem('refresh', response.data.refresh_token)
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getExpert = async (access) => {
    try {
        const response = await axios.get(config.url + `/experts/expert`, {
            headers: {
                'Authorization': `Selezenka ${access}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getUser = async (access) => {
    try {
        const response = await axios.get(config.url + `/auth/user`, {
            headers: {
                'Authorization': `Selezenka ${access}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const refreshToken = async (token) => {
    try {
        const response = await axios.get(config.url + `/auth/refresh?type_=refresh`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getTeam = async (access, id) => {
    try {
        const response = await axios.get(config.url + `/teams/team?id_u=${id}`, {
            headers: {
                'Authorization': `Selezenka ${access}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const editUser = async (access, data) => {
    try {
        const response = await axios.patch(config.url + `/auth/user`, data, {
            headers: {
                'Authorization': `Selezenka ${access}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const changeUserPhoto = async (formdata, token) => {
    try {
        const response = await axios.patch(config.url + `/auth/photo`, formdata, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'multipart/formdata'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(config.url + `/auth/all_user`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const addTeam = async (id_u, name, about, token) => {
    try {
        const response = await axios.post(config.url + `/teams/team`, {
            id_u: id_u,
            name: name,
            about: about
        },
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}


export const changeTeamBanner = async (id, formdata, token) => {
    try {
        const response = await axios.patch(config.url + `/teams/banner?id_t=${id}`, formdata, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'multipart/formdata'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const changeTeam = async (data, token) => {
    try {
        const response = await axios.patch(config.url + `/teams/team`, data, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const deleteTeam = async (id, token) => {
    try {
        const response = await axios.delete(config.url + `/teams/team?id_u=${id}`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getTeamMembers = async (id, token) => {
    try {
        const response = await axios.get(config.url + `/teams/users?id_t=${id}`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const addInvite = async (id_u, id_t, token) => {
    try {
        const response = await axios.post(config.url + `/invites/invite`, {
            id_u: id_u,
            id_t: id_t
        }, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const removeFromTeam = async (id, token) => {
    try {
        const response = await axios.delete(config.url + `/teams/user?id_u=${id}`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const inviteByUser = async (id_u, token) => {
    try {
        const response = await axios.get(config.url + `/invites/invite_by_user?id_u=${id_u}`,
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const inviteByTeam = async (id_t, token) => {
    try {
        const response = await axios.get(config.url + `/invites/invite_by_team?id_t=${id_t}`,
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const inviteRefuse = async (id_u, id_t) => {
    try {
        const response = await axios.delete(config.url + `/invites/invite_refuse?id_u=${id_u}&id_t=${id_t}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}
export const inviteAccept = async (id_u, id_t) => {
    try {
        const response = await axios.delete(config.url + `/invites/invite_accept?id_u=${id_u}&id_t=${id_t}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const notificationDelete = async (id_u) => {
    try {
        const response = await axios.get(config.url + `/teams/send_notification_delete?id_u=${id_u}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getAllTeams = async () => {
    try {
        const response = await axios.get(config.url + `/teams/all_teams`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getCases = async () => {
    try {
        const response = await axios.get(config.url + `/experts/all_case`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getCompany = async (id) => {
    try {
        const response = await axios.get(config.url + `/experts/company?id_co=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const addNewCase = async (name, about, id, token) => {
    try {
        const response = await axios.post(config.url + '/experts/case', {
            name: name,
            about: about,
            id_co: id
        },
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const deleteCase = async (id) => {
    try {
        const response = await axios.delete(config.url + `/experts/case?id_ca=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const addCaseFile = async (id, formdata, token) => {
    try {
        const response = await axios.patch(config.url + `/experts/file?id_ca=${id}`, formdata, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'multipart/formdata'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const teamAddJob = async (id_ca, id_t, token) => {
    try {
        const response = await axios.post(config.url + `/teams/job`,
        {
            id_ca: id_ca,
            id_t: id_t
        },
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getJobByTeam = async (id_t, token) => {
    try {
        const response = await axios.get(config.url + `/teams/job?id_t=${id_t}`,
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const changeJob = async (id_j, github, token) => {
    try {
        const response = await axios.patch(config.url + `/teams/job`,{
            id_j: id_j,
            github: github
        },
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}
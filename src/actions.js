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

export const login = async (email, password) => {
    try {
        const response = await axios.post(config.url + '/auth/login', {
            email: email,
            password: password
        } ,
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
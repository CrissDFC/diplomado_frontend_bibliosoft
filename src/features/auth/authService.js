import { apiRequest } from '../../services/api.js'
import { saveSession } from './session.js'

export async function login(email, password) {
    const session = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
    })
    saveSession(session)
    return session.user
}

export function register(user) {
    return apiRequest('/auth/register', {
        method: 'POST',
        body: user,
    })
}

export function getCurrentUser() {
    return apiRequest('/auth/me')
}

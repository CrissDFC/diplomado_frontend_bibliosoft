import { clearSession, getSession } from '../features/auth/session.js'

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api'

export async function apiRequest(path, options = {}) {
    const session = getSession()
    const headers = { ...options.headers }
    if (options.body !== undefined) headers['Content-Type'] = 'application/json'
    if (session?.token) headers.Authorization = `Bearer ${session.token}`

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        body: options.body === undefined || typeof options.body === 'string'
            ? options.body
            : JSON.stringify(options.body),
    })

    if (response.status === 204) return null

    let data
    try {
        data = await response.json()
    } catch {
        data = {}
    }

    if (!response.ok) {
        if (response.status === 401) clearSession()
        throw new Error(data.message || 'No fue posible completar la solicitud')
    }

    return data
}

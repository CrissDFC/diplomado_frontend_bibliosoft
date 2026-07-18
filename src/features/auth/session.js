const SESSION_KEY = 'sigeb-session'

function decodePayload(token) {
    const encoded = token.split('.')[1]
    if (!encoded) throw new Error('Token inválido')
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(globalThis.atob(base64))
}

function isExpired(token) {
    const { exp } = decodePayload(token)
    return !exp || exp <= Math.floor(Date.now() / 1000)
}

export function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
    try {
        const value = localStorage.getItem(SESSION_KEY)
        if (!value) return null
        const session = JSON.parse(value)
        if (!session.token || !session.user || isExpired(session.token)) {
            clearSession()
            return null
        }
        return session
    } catch {
        clearSession()
        return null
    }
}

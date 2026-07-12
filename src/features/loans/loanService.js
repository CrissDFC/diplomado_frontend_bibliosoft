const API_URL = import.meta.env.VITE_API_URL

export async function getLoans() {
    const response = await fetch(`${API_URL}/loans`)

    if (!response.ok) {
        throw new Error('No se pudieron cargar los prestamos')
    }

    return response.json()
}

export async function createLoan(loan) {
    const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    })

    if (!response.ok) {
        throw new Error('No se pudo crear el prestamo')
    }

    return response.json()
}

export async function getLoanById(id) {
    const response = await fetch(`${API_URL}/loans/${id}`)

    if (!response.ok) {
        throw new Error('No se pudo cargar el prestamo')
    }

    return response.json()
}

export async function updateLoan(id, loan) {
    const response = await fetch(`${API_URL}/loans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    })

    if (!response.ok) {
        throw new Error('No se pudo actualizar el prestamo')
    }

    return response.json()
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`)

    if (!response.ok) {
        throw new Error('No se pudieron cargar los usuarios')
    }

    return response.json()
}

export async function getUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`)

    if (!response.ok) {
        throw new Error('No se pudo cargar el usuario')
    }

    return response.json()
}

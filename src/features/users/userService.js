const API_URL = import.meta.env.VITE_API_URL

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

export async function createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        throw new Error('No fue posible crear el usuario.')
    }

    return response.json()
}

export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        throw new Error('No fue posible actualizar el usuario.')
    }

    return response.json()
}

export async function disableUser(user) {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...user,
            status: 0,
        }),
    })

    if (!response.ok) {
        throw new Error('No fue posible inactivar el usuario.')
    }

    return response.json()
}
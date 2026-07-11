const API_URL = 'http://localhost:3001/users'

export async function createUser(userData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('No fue posible crear el usuario.')
        }

        return await response.json()

    } catch (error) {
        throw new Error(error.message)
    }
}
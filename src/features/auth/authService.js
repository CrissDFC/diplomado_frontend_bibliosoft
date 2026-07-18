const API_URL = 'http://localhost:3001/users'

export async function login(email, password) {
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('No fue posible consultar los usuarios.')
        }

        const users = await response.json()

        const user = users.find((user) =>
            user.email === email &&
            user.password === password &&
            user.status === 1
        )

        return user ?? null

    } catch (error) {
        throw new Error(error.message)
    }
}
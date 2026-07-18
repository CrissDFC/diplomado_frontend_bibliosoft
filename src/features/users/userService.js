import { apiRequest } from '../../services/api.js'

export const getUsers = () => apiRequest('/users')

export const getUserById = (id) => apiRequest(`/users/${id}`)

export const createUser = (user) => apiRequest('/users', {
    method: 'POST',
    body: user,
})

export const updateUser = (id, user) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: user,
})

export const disableUser = (user) => apiRequest(`/users/${user.id}`, {
    method: 'DELETE',
})

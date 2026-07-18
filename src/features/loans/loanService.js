import { apiRequest } from '../../services/api.js'

export const getLoans = () => apiRequest('/loans')

export const getLoanById = (id) => apiRequest(`/loans/${id}`)

export const createLoan = (loan) => apiRequest('/loans', {
    method: 'POST',
    body: loan,
})

export const updateLoan = (id, loan) => apiRequest(`/loans/${id}`, {
    method: 'PUT',
    body: loan,
})

export const returnLoan = (id) => apiRequest(`/loans/${id}/return`, {
    method: 'PUT',
})

export const cancelLoan = (id) => apiRequest(`/loans/${id}`, {
    method: 'DELETE',
})

export const getUsers = () => apiRequest('/users?status=1')

export const getUserById = (id) => apiRequest(`/users/${id}`)

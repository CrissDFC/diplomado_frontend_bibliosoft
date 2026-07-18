import { apiRequest } from '../../services/api.js'

export const getBooks = () => apiRequest('/books')

export const getBookById = (id) => apiRequest(`/books/${id}`)

export const createBook = (book) => apiRequest('/books', {
    method: 'POST',
    body: book,
})

export const updateBook = (id, book) => apiRequest(`/books/${id}`, {
    method: 'PUT',
    body: book,
})

export const disableBook = (book) => apiRequest(`/books/${book.id}`, {
    method: 'DELETE',
})

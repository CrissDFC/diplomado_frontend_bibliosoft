import test from 'node:test'
import assert from 'node:assert/strict'

import { createBook, disableBook, getBooks } from '../features/books/bookService.js'
import { cancelLoan, createLoan, returnLoan } from '../features/loans/loanService.js'
import { createUser, disableUser } from '../features/users/userService.js'

function storage() {
    return { getItem: () => null, setItem() {}, removeItem() {} }
}

test.beforeEach(() => {
    globalThis.localStorage = storage()
})

test.afterEach(() => {
    delete globalThis.fetch
    delete globalThis.localStorage
})

test('los servicios de libros usan el contrato REST del backend', async () => {
    const requests = []
    globalThis.fetch = async (url, options = {}) => {
        requests.push({ url, options })
        return { ok: true, status: 200, json: async () => [] }
    }

    await getBooks()
    await createBook({ title: 'Libro' })
    await disableBook({ id: 4 })

    assert.match(requests[0].url, /\/api\/books$/)
    assert.equal(requests[1].options.method, 'POST')
    assert.match(requests[2].url, /\/api\/books\/4$/)
    assert.equal(requests[2].options.method, 'DELETE')
})

test('los servicios de préstamos delegan creación, devolución y cancelación', async () => {
    const requests = []
    globalThis.fetch = async (url, options = {}) => {
        requests.push({ url, options })
        return { ok: true, status: 200, json: async () => ({}) }
    }

    await createLoan({ bookId: 2, userId: 3, dueDate: '2026-08-01' })
    await returnLoan(8)
    await cancelLoan(9)

    assert.equal(requests[0].options.method, 'POST')
    assert.match(requests[1].url, /\/api\/loans\/8\/return$/)
    assert.equal(requests[1].options.method, 'PUT')
    assert.match(requests[2].url, /\/api\/loans\/9$/)
    assert.equal(requests[2].options.method, 'DELETE')
})

test('los servicios de usuarios crean e inactivan por API', async () => {
    const requests = []
    globalThis.fetch = async (url, options = {}) => {
        requests.push({ url, options })
        return { ok: true, status: 200, json: async () => ({}) }
    }

    await createUser({ name: 'Usuario' })
    await disableUser({ id: 5 })

    assert.match(requests[0].url, /\/api\/users$/)
    assert.equal(requests[0].options.method, 'POST')
    assert.match(requests[1].url, /\/api\/users\/5$/)
    assert.equal(requests[1].options.method, 'DELETE')
})

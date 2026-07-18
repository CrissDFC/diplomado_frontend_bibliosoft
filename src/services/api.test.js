import test from 'node:test'
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'

import { apiRequest } from './api.js'
import { getSession, saveSession } from '../features/auth/session.js'

function storage() {
    const values = new Map()
    return {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
        removeItem: (key) => values.delete(key),
    }
}

const token = `header.${Buffer.from(JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + 3600,
})).toString('base64url')}.signature`

test.beforeEach(() => {
    globalThis.localStorage = storage()
})

test.afterEach(() => {
    delete globalThis.fetch
    delete globalThis.localStorage
})

test('envía JSON y token Bearer al API', async () => {
    saveSession({ token, user: { id: 1 } })
    let request
    globalThis.fetch = async (url, options) => {
        request = { url, options }
        return { ok: true, status: 201, json: async () => ({ id: 3 }) }
    }

    const result = await apiRequest('/books', {
        method: 'POST',
        body: { title: 'Libro' },
    })

    assert.match(request.url, /\/api\/books$/)
    assert.equal(request.options.headers.Authorization, `Bearer ${token}`)
    assert.equal(request.options.headers['Content-Type'], 'application/json')
    assert.equal(request.options.body, JSON.stringify({ title: 'Libro' }))
    assert.deepEqual(result, { id: 3 })
})

test('propaga el mensaje del backend y elimina una sesión rechazada', async () => {
    saveSession({ token, user: { id: 1 } })
    globalThis.fetch = async () => ({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Token inválido o expirado' }),
    })

    await assert.rejects(apiRequest('/auth/me'), {
        message: 'Token inválido o expirado',
    })
    assert.equal(getSession(), null)
})

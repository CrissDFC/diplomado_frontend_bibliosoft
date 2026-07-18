import test from 'node:test'
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'

import { login, register } from './authService.js'
import { getSession } from './session.js'

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

test('login usa el endpoint de autenticación y guarda la sesión', async () => {
    let request
    globalThis.fetch = async (url, options) => {
        request = { url, options }
        return {
            ok: true,
            status: 200,
            json: async () => ({ token, user: { id: 1, roleName: 'admin' } }),
        }
    }

    const user = await login('admin@biblioteca.com', 'Admin123*')

    assert.match(request.url, /\/api\/auth\/login$/)
    assert.deepEqual(JSON.parse(request.options.body), {
        email: 'admin@biblioteca.com',
        password: 'Admin123*',
    })
    assert.equal(user.roleName, 'admin')
    assert.equal(getSession().token, token)
})

test('register crea una cuenta pública sin enviar rol', async () => {
    let body
    globalThis.fetch = async (url, options) => {
        assert.match(url, /\/api\/auth\/register$/)
        body = JSON.parse(options.body)
        return { ok: true, status: 201, json: async () => ({ id: 3, ...body }) }
    }

    await register({ name: 'Lector', email: 'lector@example.com', password: 'Clave123*' })

    assert.deepEqual(body, {
        name: 'Lector', email: 'lector@example.com', password: 'Clave123*',
    })
    assert.equal(body.role, undefined)
})

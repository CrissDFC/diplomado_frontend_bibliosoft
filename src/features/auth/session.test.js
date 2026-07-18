import test from 'node:test'
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'

import {
    clearSession,
    getSession,
    saveSession,
} from './session.js'

function storage() {
    const values = new Map()
    return {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
        removeItem: (key) => values.delete(key),
    }
}

function tokenWithExpiration(exp) {
    const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url')
    return `header.${payload}.signature`
}

test.beforeEach(() => {
    globalThis.localStorage = storage()
})

test.afterEach(() => {
    delete globalThis.localStorage
})

test('guarda y recupera la sesión vigente', () => {
    const session = {
        token: tokenWithExpiration(Math.floor(Date.now() / 1000) + 3600),
        user: { id: 1, roleName: 'admin' },
    }

    saveSession(session)

    assert.deepEqual(getSession(), session)
})

test('descarta sesiones expiradas o corruptas', () => {
    saveSession({
        token: tokenWithExpiration(Math.floor(Date.now() / 1000) - 10),
        user: { id: 1 },
    })
    assert.equal(getSession(), null)

    localStorage.setItem('sigeb-session', 'no-es-json')
    assert.equal(getSession(), null)
})

test('clearSession elimina la sesión', () => {
    saveSession({
        token: tokenWithExpiration(Math.floor(Date.now() / 1000) + 3600),
        user: { id: 1 },
    })
    clearSession()
    assert.equal(getSession(), null)
})

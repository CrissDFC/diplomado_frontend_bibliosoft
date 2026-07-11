import { useState } from 'react'
import { createUser } from '../userService'

function UserForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(1)
    const [status, setStatus] = useState(1)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        setMessage('')
        setError('')

        try {
            const userData = {
                name,
                email,
                password,
                role,
                status,
            }

            await createUser(userData)

            setMessage('Usuario creado correctamente.')

            setName('')
            setEmail('')
            setPassword('')
            setRole(1)
            setStatus(1)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre</label>

                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ingrese el nombre"
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Correo electrónico</label>

                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Ingrese el correo"
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>

                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Ingrese la contraseña"
                    required
                />
            </div>

            <div>
                <label htmlFor="role">Rol</label>

                <select
                    id="role"
                    value={role}
                    onChange={(event) => setRole(Number(event.target.value))}
                >
                    <option value={1}>Administrador</option>
                    <option value={2}>Bibliotecario</option>
                </select>
            </div>

            <div>
                <label htmlFor="status">Estado</label>

                <select
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(Number(event.target.value))}
                >
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                </select>
            </div>

            {message && <p>{message}</p>}

            {error && <p>{error}</p>}

            <button type="submit">
                Guardar usuario
            </button>
        </form>
    )
}

export default UserForm
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../authService'

function LoginForm() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        setError('')

        try {
            const user = await login(email, password)

            if (!user) {
                setError('Correo o contraseña incorrectos.')
                return
            }

            console.log('Usuario autenticado:', user)

            navigate('/libros')

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="email">
                    Correo electrónico
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">
                    Contraseña
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <div className="forgot-password">
                <a href="#">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <button
                type="submit"
                className="login-button"
            >
                Iniciar sesión
            </button>

            <div className="register-link">
                <p>
                    ¿Necesitas acceso al sistema?
                </p>

                <span>
                    Solicita tu cuenta al administrador.
                </span>
            </div>

        </form>
    )
}

export default LoginForm
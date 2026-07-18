import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../authService'

function LoginForm() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError('')
        setIsSubmitting(true)

        try {
            await login(email, password)
            navigate('/libros')
        } catch (error) {
            setError(error.message)
        } finally {
            setIsSubmitting(false)
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

            <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
            </button>

            <div className="register-link">
                <p>¿Aún no tienes cuenta?</p>
                <Link to="/registro">Regístrate como lector</Link>
            </div>

        </form>
    )
}

export default LoginForm

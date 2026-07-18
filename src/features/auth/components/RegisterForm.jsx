import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../authService'

const initialData = { name: '', email: '', password: '', confirmPassword: '' }

function RegisterForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialData)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(event) {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.')
            return
        }

        setIsSubmitting(true)
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
            navigate('/login', { replace: true })
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required maxLength="100" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} minLength="8" required />
                <small>Usa mayúscula, minúscula y número.</small>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} minLength="8" required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta de lector'}
            </button>
            <div className="register-link">
                <Link to="/login">Volver al inicio de sesión</Link>
            </div>
        </form>
    )
}

export default RegisterForm

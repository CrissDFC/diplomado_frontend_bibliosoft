import './auth.css'
import RegisterForm from './components/RegisterForm'

function RegisterPage() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-header">
                    <h1>Crear cuenta</h1>
                    <p>Regístrate como lector del Sistema de Gestión Bibliotecaria.</p>
                </div>
                <RegisterForm />
            </section>
        </main>
    )
}

export default RegisterPage

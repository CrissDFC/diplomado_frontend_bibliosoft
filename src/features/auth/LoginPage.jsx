import './auth.css'
import LoginForm from './components/LoginForm'

function LoginPage() {

    return (
        <main className="auth-page">

            <section className="auth-card">

                <div className="auth-header">
                    <h1>SIGEB</h1>

                    <p>
                        Sistema de Gestión Bibliotecaria
                    </p>
                </div>

                <LoginForm />

            </section>

        </main>
    )
}

export default LoginPage
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../features/auth/session'

function MainLayout() {
    const navigate = useNavigate()
    const user = getSession()?.user

    function logout() {
        clearSession()
        navigate('/login', { replace: true })
    }

    return (
        <div className="app-shell">
            <header className="app-header">
                <Link className="brand" to="/libros">SIGEB</Link>
                <nav aria-label="Navegación principal">
                    <Link to="/libros">Libros</Link>
                    <Link to="/prestamos">Préstamos</Link>
                    {user?.roleName === 'admin' && <Link to="/usuarios">Usuarios</Link>}
                </nav>
                <div className="session-actions">
                    <span>{user?.name}</span>
                    <button type="button" onClick={logout}>Cerrar sesión</button>
                </div>
            </header>
            <main className="app-content"><Outlet /></main>
        </div>
    )
}

export default MainLayout

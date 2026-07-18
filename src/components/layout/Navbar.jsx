import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button'

function Navbar({ user, onLogout }) {
    return (
        <header className="app-header">
            <Link className="brand" to="/libros">SIGEB</Link>
            <nav aria-label="Navegación principal">
                <NavLink to="/libros">Libros</NavLink>
                <NavLink to="/prestamos">Préstamos</NavLink>
                {user?.roleName === 'admin' && <NavLink to="/usuarios">Usuarios</NavLink>}
            </nav>
            <div className="session-actions">
                <span>{user?.name}</span>
                <Button variant="secondary" onClick={onLogout}>Cerrar sesión</Button>
            </div>
        </header>
    )
}

export default Navbar

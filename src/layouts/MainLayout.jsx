import { Link, Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <div>
            <header>
                <h1>Biblioteca</h1>

                <nav>
                    <Link to="/libros">Libros</Link>
                    <Link to="/prestamos">Préstamos</Link>
                    <Link to="/usuarios">Usuarios</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
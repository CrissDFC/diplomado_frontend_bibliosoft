import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
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
            <Navbar user={user} onLogout={logout} />
            <main className="app-content"><Outlet /></main>
            <Footer />
        </div>
    )
}

export default MainLayout

import { Navigate, useLocation } from 'react-router-dom'
import { getSession } from '../features/auth/session'

function ProtectedRoute({ children, allowedRoles }) {
    const location = useLocation()
    const session = getSession()

    if (!session) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    if (allowedRoles && !allowedRoles.includes(session.user.roleName)) {
        return <Navigate to="/libros" replace />
    }

    return children
}

export default ProtectedRoute

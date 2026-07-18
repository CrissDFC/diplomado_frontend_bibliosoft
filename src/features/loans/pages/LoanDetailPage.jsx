import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LOAN_STATUS } from '../../../constants/statuses'
import { getBookById } from '../../books/bookService'
import { getLoanById, getUserById } from '../loanService'
import { getSession } from '../../auth/session'
import Alert from '../../../components/ui/Alert'
import Card from '../../../components/ui/Card'
import Loader from '../../../components/ui/Loader'

const LOAN_STATUS_LABELS = {
    [LOAN_STATUS.CANCELLED]: 'Cancelado',
    [LOAN_STATUS.ACTIVE]: 'Activo',
    [LOAN_STATUS.RETURNED]: 'Devuelto',
    [LOAN_STATUS.OVERDUE]: 'Vencido',
}

function LoanDetailPage() {
    const { id } = useParams()
    const [loan, setLoan] = useState(null)
    const [book, setBook] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const role = getSession()?.user.roleName
    const canManage = role === 'admin' || role === 'librarian'

    useEffect(() => {
        async function loadLoan() {
            try {
                const loanData = await getLoanById(id)
                const [bookData, userData] = await Promise.all([
                    getBookById(loanData.bookId),
                    getUserById(loanData.userId),
                ])

                setLoan(loanData)
                setBook(bookData)
                setUser(userData)
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadLoan()
    }, [id])

    if (isLoading) {
        return <Loader message="Cargando préstamo..." />
    }

    if (errorMessage) {
        return <Alert>{errorMessage}</Alert>
    }

    return (
        <Card>
            <div>
                <h1>Prestamo #{loan.id}</h1>
                <p>Detalle del prestamo registrado.</p>
            </div>

            <dl>
                <dt>Libro</dt>
                <dd>{book?.title}</dd>

                <dt>Usuario</dt>
                <dd>{user?.name}</dd>

                <dt>Fecha prestamo</dt>
                <dd>{loan.loanDate}</dd>

                <dt>Fecha limite</dt>
                <dd>{loan.dueDate}</dd>

                <dt>Fecha devolucion</dt>
                <dd>{loan.returnDate || '-'}</dd>

                <dt>Estado</dt>
                <dd>{LOAN_STATUS_LABELS[loan.status] || 'Desconocido'}</dd>
            </dl>

            <div>
                <Link to="/prestamos">Volver</Link>
                {canManage && <Link to={`/prestamos/${loan.id}/editar`}>Editar</Link>}
            </div>
        </Card>
    )
}

export default LoanDetailPage

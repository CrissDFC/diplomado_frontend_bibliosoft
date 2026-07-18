import { Link } from 'react-router-dom'
import { LOAN_STATUS } from '../../../constants/statuses'

const LOAN_STATUS_LABELS = {
    [LOAN_STATUS.CANCELLED]: 'Cancelado',
    [LOAN_STATUS.ACTIVE]: 'Activo',
    [LOAN_STATUS.RETURNED]: 'Devuelto',
    [LOAN_STATUS.OVERDUE]: 'Vencido',
}

function LoanTable({ loans, canManage, onReturnLoan, onCancelLoan }) {
    if (loans.length === 0) {
        return <p>No hay prestamos registrados.</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Libro</th>
                    <th>Usuario</th>
                    <th>Prestamo</th>
                    <th>Limite</th>
                    <th>Devolucion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {loans.map((loan) => (
                    <tr key={loan.id}>
                        <td>{loan.bookTitle}</td>
                        <td>{loan.userName}</td>
                        <td>{loan.loanDate}</td>
                        <td>{loan.dueDate}</td>
                        <td>{loan.returnDate || '-'}</td>
                        <td>{LOAN_STATUS_LABELS[loan.status] || 'Desconocido'}</td>
                        <td>
                            <Link to={`/prestamos/${loan.id}`}>Ver</Link>
                            {' '}
                            {canManage && <>
                                {' '}<Link to={`/prestamos/${loan.id}/editar`}>Editar</Link>
                                {loan.status === LOAN_STATUS.ACTIVE && <>
                                    {' '}<button type="button" onClick={() => onReturnLoan(loan)}>Devolver</button>
                                    {' '}<button type="button" onClick={() => onCancelLoan(loan)}>Cancelar</button>
                                </>}
                            </>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default LoanTable

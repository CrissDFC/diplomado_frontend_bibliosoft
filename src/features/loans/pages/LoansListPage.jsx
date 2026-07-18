import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSession } from '../../auth/session'
import LoanFilters from '../components/LoanFilters'
import LoanTable from '../components/LoanTable'
import { cancelLoan, getLoans, returnLoan } from '../loanService'

function LoansListPage() {
    const [loans, setLoans] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [filters, setFilters] = useState({ search: '', status: '' })
    const role = getSession()?.user.roleName
    const canManage = role === 'admin' || role === 'librarian'

    useEffect(() => { loadLoans() }, [])

    async function loadLoans() {
        try {
            setErrorMessage('')
            setLoans(await getLoans())
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    function handleFilterChange(event) {
        setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
    }

    async function handleReturnLoan(loan) {
        if (!window.confirm('¿Confirmas la devolución de este préstamo?')) return
        try {
            await returnLoan(loan.id)
            await loadLoans()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    async function handleCancelLoan(loan) {
        if (!window.confirm('¿Confirmas la cancelación de este préstamo?')) return
        try {
            await cancelLoan(loan.id)
            await loadLoans()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const filteredLoans = useMemo(() => loans.filter((loan) => {
        const search = filters.search.toLowerCase()
        const matchesSearch = (loan.bookTitle || '').toLowerCase().includes(search)
            || (loan.userName || '').toLowerCase().includes(search)
        const matchesStatus = filters.status === '' || loan.status === Number(filters.status)
        return matchesSearch && matchesStatus
    }), [loans, filters])

    return (
        <section>
            <div>
                <h1>Gestión de préstamos</h1>
                <p>Consulta y administración de préstamos de libros.</p>
            </div>
            {canManage && <div><Link to="/prestamos/nuevo">Nuevo préstamo</Link></div>}
            <LoanFilters filters={filters} onFilterChange={handleFilterChange} />
            {isLoading && <p>Cargando préstamos...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {!isLoading && !errorMessage && (
                <section>
                    <h2>Listado de préstamos</h2>
                    <LoanTable
                        loans={filteredLoans}
                        canManage={canManage}
                        onReturnLoan={handleReturnLoan}
                        onCancelLoan={handleCancelLoan}
                    />
                </section>
            )}
        </section>
    )
}

export default LoansListPage

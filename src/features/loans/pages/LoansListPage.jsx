import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_STATUS, LOAN_STATUS } from '../../../constants/statuses'
import { getBooks, updateBook } from '../../books/bookService'
import LoanFilters from '../components/LoanFilters'
import LoanTable from '../components/LoanTable'
import { getLoans, getUsers, updateLoan } from '../loanService'

function getTodayDate() {
    return new Date().toISOString().slice(0, 10)
}

function LoansListPage() {
    const [loans, setLoans] = useState([])
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [filters, setFilters] = useState({
        search: '',
        status: '',
    })

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        try {
            const [loansData, booksData, usersData] = await Promise.all([
                getLoans(),
                getBooks(),
                getUsers(),
            ])

            setLoans(loansData)
            setBooks(booksData)
            setUsers(usersData)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    function handleFilterChange(event) {
        const { name, value } = event.target

        setFilters((currentFilters) => ({
            ...currentFilters,
            [name]: value,
        }))
    }

    async function handleReturnLoan(loan) {
        const shouldReturn = window.confirm('¿Confirmas la devolucion de este prestamo?')

        if (!shouldReturn) {
            return
        }

        try {
            const book = books.find((currentBook) => currentBook.id === loan.bookId)

            if (!book) {
                throw new Error('No se encontro el libro asociado al prestamo')
            }

            await updateLoan(loan.id, {
                ...loan,
                returnDate: getTodayDate(),
                status: LOAN_STATUS.RETURNED,
            })

            await updateBook(book.id, {
                ...book,
                availableCopies: Math.min(book.totalCopies, book.availableCopies + 1),
                status: book.status === BOOK_STATUS.INACTIVE ? book.status : BOOK_STATUS.AVAILABLE,
            })

            await loadData()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const loanRows = useMemo(() => {
        return loans.map((loan) => {
            const book = books.find((currentBook) => currentBook.id === loan.bookId)
            const user = users.find((currentUser) => currentUser.id === loan.userId)

            return {
                ...loan,
                bookTitle: book ? book.title : 'Libro no encontrado',
                userName: user ? user.name : 'Usuario no encontrado',
            }
        })
    }, [loans, books, users])

    const filteredLoans = useMemo(() => {
        return loanRows.filter((loan) => {
            const searchText = filters.search.toLowerCase()
            const matchesSearch =
                loan.bookTitle.toLowerCase().includes(searchText) ||
                loan.userName.toLowerCase().includes(searchText)

            const matchesStatus =
                filters.status === '' || loan.status === Number(filters.status)

            return matchesSearch && matchesStatus
        })
    }, [loanRows, filters])

    return (
        <section>
            <div>
                <h1>Gestion de prestamos</h1>
                <p>Consulta y administracion de prestamos de libros.</p>
            </div>

            <div>
                <Link to="/prestamos/nuevo">Nuevo prestamo</Link>
            </div>

            <LoanFilters filters={filters} onFilterChange={handleFilterChange} />

            {isLoading && <p>Cargando prestamos...</p>}

            {errorMessage && <p>{errorMessage}</p>}

            {!isLoading && !errorMessage && (
                <section>
                    <h2>Listado de prestamos</h2>
                    <LoanTable loans={filteredLoans} onReturnLoan={handleReturnLoan} />
                </section>
            )}
        </section>
    )
}

export default LoansListPage

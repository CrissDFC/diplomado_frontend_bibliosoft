import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOOK_STATUS, LOAN_STATUS, USER_STATUS } from '../../../constants/statuses'
import { getBooks, updateBook } from '../../books/bookService'
import LoanForm from '../components/LoanForm'
import { createLoan, getUsers } from '../loanService'

const initialFormData = {
    bookId: '',
    userId: '',
    dueDate: '',
}

function getTodayDate() {
    return new Date().toISOString().slice(0, 10)
}

function getDefaultDueDate() {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7)
    return dueDate.toISOString().slice(0, 10)
}

function LoanFormPage() {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        ...initialFormData,
        dueDate: getDefaultDueDate(),
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadData() {
            try {
                const [booksData, usersData] = await Promise.all([getBooks(), getUsers()])
                setBooks(booksData)
                setUsers(usersData)
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    function handleInputChange(event) {
        const { name, value } = event.target

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            if (!formData.bookId || !formData.userId || !formData.dueDate) {
                throw new Error('Debes completar libro, usuario y fecha de devolucion')
            }

            const selectedBook = books.find((book) => book.id === formData.bookId)

            if (!selectedBook) {
                throw new Error('El libro seleccionado no existe')
            }

            if (selectedBook.availableCopies <= 0) {
                throw new Error('No hay ejemplares disponibles para prestar')
            }

            await createLoan({
                bookId: formData.bookId,
                userId: formData.userId,
                loanDate: getTodayDate(),
                dueDate: formData.dueDate,
                returnDate: null,
                status: LOAN_STATUS.ACTIVE,
            })

            await updateBook(selectedBook.id, {
                ...selectedBook,
                availableCopies: selectedBook.availableCopies - 1,
                status:
                    selectedBook.availableCopies - 1 > 0
                        ? BOOK_STATUS.AVAILABLE
                        : BOOK_STATUS.UNAVAILABLE,
            })

            navigate('/prestamos')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const availableBooks = useMemo(
        () => books.filter((book) => book.status !== BOOK_STATUS.INACTIVE && book.availableCopies > 0),
        [books],
    )

    const activeUsers = useMemo(
        () => users.filter((user) => user.status === USER_STATUS.ACTIVE),
        [users],
    )

    if (isLoading) {
        return <p>Cargando datos del prestamo...</p>
    }

    return (
        <section>
            <div>
                <h1>Nuevo prestamo</h1>
                <p>Registra un nuevo prestamo de libro.</p>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <LoanForm
                formData={formData}
                books={availableBooks}
                users={activeUsers}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitLabel="Registrar prestamo"
            />
        </section>
    )
}

export default LoanFormPage

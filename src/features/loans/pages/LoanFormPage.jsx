import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOOK_STATUS, USER_STATUS } from '../../../constants/statuses'
import { getBooks } from '../../books/bookService'
import LoanForm from '../components/LoanForm'
import { createLoan, getUsers } from '../loanService'
import Alert from '../../../components/ui/Alert'
import Card from '../../../components/ui/Card'
import Loader from '../../../components/ui/Loader'

const initialFormData = {
    bookId: '',
    userId: '',
    dueDate: '',
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

            await createLoan({
                bookId: Number(formData.bookId),
                userId: Number(formData.userId),
                dueDate: formData.dueDate,
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
        return <Loader message="Cargando datos del préstamo..." />
    }

    return (
        <Card>
            <div>
                <h1>Nuevo prestamo</h1>
                <p>Registra un nuevo prestamo de libro.</p>
            </div>

            <Alert>{errorMessage}</Alert>

            <LoanForm
                formData={formData}
                books={availableBooks}
                users={activeUsers}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitLabel="Registrar prestamo"
            />
        </Card>
    )
}

export default LoanFormPage

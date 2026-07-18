import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookForm from '../components/BookForm'
import { getBookById, updateBook } from '../bookService'
import Alert from '../../../components/ui/Alert'
import Card from '../../../components/ui/Card'
import Loader from '../../../components/ui/Loader'

const initialFormData = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    year: '',
    description: '',
}

function BookEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)
    const [currentBook, setCurrentBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadBook() {
            try {
                const book = await getBookById(id)

                setCurrentBook(book)
                setFormData({
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                    category: book.category,
                    publisher: book.publisher,
                    year: String(book.year),
                    description: book.description,
                })
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadBook()
    }, [id])

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

        const bookToUpdate = {
            ...currentBook,
            ...formData,
            year: Number(formData.year),
        }

        try {
            await updateBook(id, bookToUpdate)
            navigate('/libros')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return <Loader message="Cargando libro..." />
    }

    return (
        <Card>
            <div>
                <h1>Editar libro</h1>
                <p>Actualiza la información general del libro.</p>
            </div>

            <Alert>{errorMessage}</Alert>

            <BookForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                showTotalCopies={false}
                submitLabel="Actualizar libro"
            />
        </Card>
    )
}

export default BookEditPage

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BOOK_STATUS } from '../../../constants/statuses'
import BookForm from '../components/BookForm'
import { createBook } from '../bookService'

const initialFormData = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    year: '',
    totalCopies: '',
    description: '',
}

function BookFormPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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

        const totalCopies = Number(formData.totalCopies)

        if (totalCopies <= 0) {
            setErrorMessage('Debes registrar al menos un ejemplar del libro')
            setIsSubmitting(false)
            return
        }

        const bookToCreate = {
            ...formData,
            year: Number(formData.year),
            totalCopies,
            availableCopies: totalCopies,
            status: BOOK_STATUS.AVAILABLE,
        }


        try {
            await createBook(bookToCreate)
            navigate('/libros')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section>
            <div>
                <h1>Nuevo libro</h1>
                <p>Registra un nuevo libro en el catálogo de la biblioteca.</p>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <BookForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </section>
    )
}

export default BookFormPage
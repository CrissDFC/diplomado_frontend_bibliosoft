import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOK_STATUS_LABELS } from '../../../constants/statuses'
import { getBookById } from '../bookService'

function BookDetailPage() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadBook() {
            try {
                const data = await getBookById(id)
                setBook(data)
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadBook()
    }, [id])

    if (isLoading) {
        return <p>Cargando libro...</p>
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>
    }

    return (
        <section>
            <div>
                <h1>{book.title}</h1>
                <p>Detalle del libro registrado en la biblioteca.</p>
            </div>

            <dl>
                <dt>Autor</dt>
                <dd>{book.author}</dd>

                <dt>ISBN</dt>
                <dd>{book.isbn}</dd>

                <dt>Categoría</dt>
                <dd>{book.category}</dd>

                <dt>Editorial</dt>
                <dd>{book.publisher}</dd>

                <dt>Año</dt>
                <dd>{book.year}</dd>

                <dt>Ejemplares</dt>
                <dd>
                    {book.availableCopies} disponibles de {book.totalCopies}
                </dd>

                <dt>Estado</dt>
                <dd>{BOOK_STATUS_LABELS[book.status]}</dd>

                <dt>Descripción</dt>
                <dd>{book.description}</dd>
            </dl>

            <div>
                <Link to="/libros">Volver</Link>
                <Link to={`/libros/${book.id}/editar`}>Editar</Link>
            </div>
        </section>
    )
}

export default BookDetailPage
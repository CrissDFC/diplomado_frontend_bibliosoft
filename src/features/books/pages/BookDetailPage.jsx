import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOK_STATUS_LABELS } from '../../../constants/statuses'
import { getBookById } from '../bookService'
import { getSession } from '../../auth/session'
import Alert from '../../../components/ui/Alert'
import Card from '../../../components/ui/Card'
import Loader from '../../../components/ui/Loader'

function BookDetailPage() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const role = getSession()?.user.roleName
    const canManage = role === 'admin' || role === 'librarian'

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
        return <Loader message="Cargando libro..." />
    }

    if (errorMessage) {
        return <Alert>{errorMessage}</Alert>
    }

    return (
        <Card>
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
                {canManage && <Link to={`/libros/${book.id}/editar`}>Editar</Link>}
            </div>
        </Card>
    )
}

export default BookDetailPage

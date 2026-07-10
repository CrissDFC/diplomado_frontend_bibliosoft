import { Link } from 'react-router-dom'
import { BOOK_STATUS, BOOK_STATUS_LABELS } from '../../../constants/statuses'

function BookTable({ books, onDisableBook }) {
    if (books.length === 0) {
        return <p>No hay libros registrados.</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Categoría</th>
                <th>Disponibles</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>
                        {book.availableCopies} / {book.totalCopies}
                    </td>
                    <td>{BOOK_STATUS_LABELS[book.status]}</td>
                    <td>
                        <Link to={`/libros/${book.id}`}>Ver</Link>
                        {' '}
                        <Link to={`/libros/${book.id}/editar`}>Editar</Link>
                        {' '}
                        {book.status !== BOOK_STATUS.INACTIVE && (
                            <button type="button" onClick={() => onDisableBook(book)}>
                                Inactivar
                            </button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default BookTable
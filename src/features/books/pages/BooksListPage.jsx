import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookFilters from '../components/BookFilters'
import BookTable from '../components/BookTable'
import { disableBook, getBooks } from '../bookService'

function BooksListPage() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [filters, setFilters] = useState({
        search: '',
        status: '',
    })

    useEffect(() => {
        loadBooks()
    }, [])

    async function loadBooks() {
        try {
            const data = await getBooks()
            setBooks(data)
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

    async function handleDisableBook(book) {
        const shouldDisable = window.confirm(
            `¿Seguro que deseas inactivar el libro "${book.title}"?`,
        )

        if (!shouldDisable) {
            return
        }

        try {
            await disableBook(book)
            await loadBooks()
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const filteredBooks = books.filter((book) => {
        const searchText = filters.search.toLowerCase()
        const isActiveBook = book.status !== 0

        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.isbn.includes(searchText)

        const matchesStatus =
            filters.status === '' || book.status === Number(filters.status)

        return isActiveBook && matchesSearch && matchesStatus
    })

    return (
        <section>
            <div>
                <h1>Gestión de libros</h1>
                <p>Consulta, registro y administración del catálogo de libros.</p>
            </div>

            <div>
                <Link to="/libros/nuevo">Nuevo libro</Link>
            </div>

            <BookFilters filters={filters} onFilterChange={handleFilterChange} />

            {isLoading && <p>Cargando libros...</p>}

            {errorMessage && <p>{errorMessage}</p>}

            {!isLoading && !errorMessage && (
                <section>
                    <h2>Listado de libros</h2>
                    <BookTable books={filteredBooks} onDisableBook={handleDisableBook} />
                </section>
            )}
        </section>
    )
}

export default BooksListPage
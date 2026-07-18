import Button from '../../../components/ui/Button'

function LoanForm({
    formData,
    books,
    users,
    onInputChange,
    onSubmit,
    isSubmitting,
    submitLabel = 'Guardar prestamo',
}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="bookId">Libro</label>
                <select
                    id="bookId"
                    name="bookId"
                    value={formData.bookId}
                    onChange={onInputChange}
                    required
                >
                    <option value="">Selecciona un libro</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="userId">Usuario</label>
                <select
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={onInputChange}
                    required
                >
                    <option value="">Selecciona un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="dueDate">Fecha limite</label>
                <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={onInputChange}
                    required
                />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : submitLabel}
            </Button>
        </form>
    )
}

export default LoanForm

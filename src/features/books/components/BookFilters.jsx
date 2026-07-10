import { BOOK_STATUS, BOOK_STATUS_LABELS } from '../../../constants/statuses'

function BookFilters({ filters, onFilterChange }) {
    return (
        <section>
            <h2>Filtros</h2>

            <div>
                <label htmlFor="search">Buscar</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Título, autor o ISBN"
                    value={filters.search}
                    onChange={onFilterChange}
                />
            </div>

            <div>
                <label htmlFor="status">Estado</label>
                <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={onFilterChange}
                >
                    <option value="">Todos</option>
                    <option value={BOOK_STATUS.AVAILABLE}>
                        {BOOK_STATUS_LABELS[BOOK_STATUS.AVAILABLE]}
                    </option>
                    <option value={BOOK_STATUS.UNAVAILABLE}>
                        {BOOK_STATUS_LABELS[BOOK_STATUS.UNAVAILABLE]}
                    </option>
                </select>
            </div>
        </section>
    )
}

export default BookFilters
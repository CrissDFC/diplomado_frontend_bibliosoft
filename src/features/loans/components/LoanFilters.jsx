import { LOAN_STATUS } from '../../../constants/statuses'

function LoanFilters({ filters, onFilterChange }) {
    return (
        <section>
            <h2>Filtros</h2>

            <div>
                <label htmlFor="search">Buscar</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Libro o usuario"
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
                    <option value={LOAN_STATUS.ACTIVE}>Activo</option>
                    <option value={LOAN_STATUS.RETURNED}>Devuelto</option>
                    <option value={LOAN_STATUS.CANCELLED}>Cancelado</option>
                    <option value={LOAN_STATUS.OVERDUE}>Vencido</option>
                </select>
            </div>
        </section>
    )
}

export default LoanFilters

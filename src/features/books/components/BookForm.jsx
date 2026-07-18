import Button from '../../../components/ui/Button'

function BookForm({
                      formData,
                      onInputChange,
                      onSubmit,
                      isSubmitting,
                      showTotalCopies = true,
                      submitLabel = 'Guardar libro',
                  }) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="title">Título</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="author">Autor</label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    value={formData.author}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="isbn">ISBN</label>
                <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={formData.isbn}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="publisher">Editorial</label>
                <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    value={formData.publisher}
                    onChange={onInputChange}
                />
            </div>

            <div>
                <label htmlFor="year">Año</label>
                <input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={onInputChange}
                    required
                />
            </div>

            {showTotalCopies && (
                <div>
                    <label htmlFor="totalCopies">Ejemplares totales</label>
                    <input
                        id="totalCopies"
                        name="totalCopies"
                        type="number"
                        min="1"
                        value={formData.totalCopies}
                        onChange={onInputChange}
                        required
                    />
                </div>
            )}

            <div>
                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={onInputChange}
                />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : submitLabel}
            </Button>
        </form>
    )
}

export default BookForm

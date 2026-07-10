const API_URL = import.meta.env.VITE_API_URL

export async function getBooks() {
    const response = await fetch(`${API_URL}/books`)

    if (!response.ok) {
        throw new Error('No se pudieron cargar los libros')
    }

    return response.json()
}

export async function getBookById(id) {
    const response = await fetch(`${API_URL}/books/${id}`)

    if (!response.ok) {
        throw new Error('No se pudo cargar el libro')
    }

    return response.json()
}

export async function createBook(book) {
    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })

    if (!response.ok) {
        throw new Error('No se pudo crear el libro')
    }

    return response.json()
}

export async function updateBook(id, book) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })

    if (!response.ok) {
        throw new Error('No se pudo actualizar el libro')
    }

    return response.json()
}

export async function disableBook(book) {
    const response = await fetch(`${API_URL}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...book,
            status: 0,
        }),
    })

    if (!response.ok) {
        throw new Error('No se pudo inactivar el libro')
    }

    return response.json()
}
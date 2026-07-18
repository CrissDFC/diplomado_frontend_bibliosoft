import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLoanById, updateLoan } from '../loanService'

const initialFormData = {
    dueDate: '',
}

function LoanEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadLoan() {
            try {
                const loanData = await getLoanById(id)
                setFormData({
                    dueDate: loanData.dueDate,
                })
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadLoan()
    }, [id])

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

        try {
            await updateLoan(id, { dueDate: formData.dueDate })

            navigate('/prestamos')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return <p>Cargando prestamo...</p>
    }

    return (
        <section>
            <div>
                <h1>Editar prestamo</h1>
                <p>Actualiza la fecha limite del prestamo.</p>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dueDate">Fecha limite</label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Actualizar prestamo'}
                </button>
            </form>
        </section>
    )
}

export default LoanEditPage

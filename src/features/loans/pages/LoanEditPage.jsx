import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLoanById, updateLoan } from '../loanService'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Loader from '../../../components/ui/Loader'

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
        return <Loader message="Cargando préstamo..." />
    }

    return (
        <Card>
            <div>
                <h1>Editar prestamo</h1>
                <p>Actualiza la fecha limite del prestamo.</p>
            </div>

            <Alert>{errorMessage}</Alert>

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

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Actualizar prestamo'}
                </Button>
            </form>
        </Card>
    )
}

export default LoanEditPage

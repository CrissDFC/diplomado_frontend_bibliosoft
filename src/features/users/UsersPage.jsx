import { useEffect, useState } from 'react'
import './users.css'

import UserForm from './components/UserForm'
import UserTable from './components/UserTable'
import {
    createUser,
    disableUser,
    getUsers,
    updateUser,
} from './userService'

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 1,
    status: 1,
}

function UsersPage() {

    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState(initialFormData)
    const [editingUser, setEditingUser] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {

        try {

            const data = await getUsers()

            setUsers(data)

        } catch (error) {

            setErrorMessage(error.message)

        } finally {

            setIsLoading(false)

        }

    }

    function handleInputChange(event) {

        const { name, value } = event.target

        setFormData((currentData) => ({
            ...currentData,
            [name]:
                name === 'role' || name === 'status'
                    ? Number(value)
                    : value,
        }))

    }

    function handleEditUser(user) {

        setEditingUser(user)

        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            status: user.status,
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }

    async function handleSubmit(event) {

        event.preventDefault()

        setIsSubmitting(true)
        setErrorMessage('')

        try {

            if (editingUser) {

                await updateUser(editingUser.id, {
                    ...editingUser,
                    ...formData,
                })

            } else {

                await createUser(formData)

            }

            setFormData(initialFormData)
            setEditingUser(null)

            await loadUsers()

        } catch (error) {

            setErrorMessage(error.message)

        } finally {

            setIsSubmitting(false)

        }

    }

    async function handleDisableUser(user) {

        const shouldDisable = window.confirm(
            `¿Deseas inactivar a ${user.name}?`
        )

        if (!shouldDisable) {
            return
        }

        try {

            await disableUser(user)

            if (editingUser?.id === user.id) {
                setEditingUser(null)
                setFormData(initialFormData)
            }

            await loadUsers()

        } catch (error) {

            setErrorMessage(error.message)

        }

    }

    return (

        <main className="users-page">

            <section className="users-card">

                <div className="users-header">

                    <h1>Gestión de usuarios</h1>

                    <p>
                        Crear y administrar usuarios del sistema bibliotecario.
                    </p>

                </div>

                <UserForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isEditing={Boolean(editingUser)}
                    submitLabel={
                        editingUser
                            ? 'Actualizar usuario'
                            : 'Guardar usuario'
                    }
                />

                <hr />

                <h2>Listado de usuarios</h2>

                {isLoading && <p>Cargando usuarios...</p>}

                {errorMessage && <p>{errorMessage}</p>}

                {!isLoading && !errorMessage && (

                    <UserTable
                        users={users}
                        onEditUser={handleEditUser}
                        onDisableUser={handleDisableUser}
                    />

                )}

            </section>

        </main>

    )
}

export default UsersPage

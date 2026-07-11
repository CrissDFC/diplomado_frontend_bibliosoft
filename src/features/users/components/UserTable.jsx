function UserTable({
    users,
    onEditUser,
    onDisableUser,
}) {

    if (users.length === 0) {
        return <p>No hay usuarios registrados.</p>
    }

    return (
        <table>

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>

                {users.map((user) => (

                    <tr key={user.id}>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>
                            {user.role === 1
                                ? 'Administrador'
                                : 'Bibliotecario'}
                        </td>

                        <td>
                            {user.status === 1
                                ? 'Activo'
                                : 'Inactivo'}
                        </td>

                        <td>

                            <button
                                type="button"
                                onClick={() => onEditUser(user)}
                            >
                                Editar
                            </button>

                            {' '}

                            {user.status === 1 && (
                                <button
                                    type="button"
                                    onClick={() => onDisableUser(user)}
                                >
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

export default UserTable
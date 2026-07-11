function UserForm({
    formData,
    onInputChange,
    onSubmit,
    isSubmitting,
    submitLabel = 'Guardar usuario',
}) {

    return (

        <form onSubmit={onSubmit}>

            <div className="user-form-group">
                <label htmlFor="name">Nombre</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={onInputChange}
                    placeholder="Ingrese el nombre"
                    required
                />
            </div>

            <div className="user-form-group">
                <label htmlFor="email">Correo electrónico</label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onInputChange}
                    placeholder="Ingrese el correo"
                    required
                />
            </div>

            <div className="user-form-group">
                <label htmlFor="password">Contraseña</label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onInputChange}
                    placeholder="Ingrese la contraseña"
                    required
                />
            </div>

            <div className="user-form-group">
                <label htmlFor="role">Rol</label>

                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={onInputChange}
                >
                    <option value={1}>Administrador</option>
                    <option value={2}>Bibliotecario</option>
                </select>
            </div>

            <div className="user-form-group">
                <label htmlFor="status">Estado</label>

                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={onInputChange}
                >
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                </select>
            </div>

            <button
                type="submit"
                className="user-button"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Guardando...' : submitLabel}
            </button>

        </form>

    )
}

export default UserForm
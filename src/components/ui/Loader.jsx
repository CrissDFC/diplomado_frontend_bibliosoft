function Loader({ message = 'Cargando...' }) {
    return (
        <div className="loader" role="status" aria-live="polite">
            <span className="loader-spinner" aria-hidden="true" />
            {message}
        </div>
    )
}

export default Loader

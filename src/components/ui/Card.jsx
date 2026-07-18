function Card({ children, className = '', as: Tag = 'section' }) {
    return <Tag className={`card ${className}`.trim()}>{children}</Tag>
}

export default Card

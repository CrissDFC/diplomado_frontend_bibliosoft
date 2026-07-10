export const USER_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
}

export const BOOK_STATUS = {
    INACTIVE: 0,
    AVAILABLE: 1,
    UNAVAILABLE: 2,
}

export const LOAN_STATUS = {
    CANCELLED: 0,
    ACTIVE: 1,
    RETURNED: 2,
    OVERDUE: 3,
}

export const BOOK_STATUS_LABELS = {
    [BOOK_STATUS.INACTIVE]: 'Inactivo',
    [BOOK_STATUS.AVAILABLE]: 'Disponible',
    [BOOK_STATUS.UNAVAILABLE]: 'No disponible',
}
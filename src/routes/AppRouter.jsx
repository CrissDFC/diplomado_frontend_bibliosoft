import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage'
import LoanDetailPage from '../features/loans/pages/LoanDetailPage'
import LoanEditPage from '../features/loans/pages/LoanEditPage'
import LoanFormPage from '../features/loans/pages/LoanFormPage'
import LoansListPage from '../features/loans/pages/LoansListPage'
import UsersPage from '../features/users/UsersPage'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import BooksListPage from '../features/books/pages/BooksListPage'
import BookFormPage from '../features/books/pages/BookFormPage'
import BookEditPage from '../features/books/pages/BookEditPage'
import BookDetailPage from '../features/books/pages/BookDetailPage'
import RegisterPage from '../features/auth/RegisterPage'


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/libros" replace />} />
                    <Route path="libros" element={<BooksListPage />} />
                    <Route path="libros/nuevo" element={(
                        <ProtectedRoute allowedRoles={['admin', 'librarian']}><BookFormPage /></ProtectedRoute>
                    )} />
                    <Route path="libros/:id" element={<BookDetailPage />} />
                    <Route path="libros/:id/editar" element={(
                        <ProtectedRoute allowedRoles={['admin', 'librarian']}><BookEditPage /></ProtectedRoute>
                    )} />
                    <Route path="prestamos" element={<LoansListPage />} />
                    <Route path="prestamos/nuevo" element={(
                        <ProtectedRoute allowedRoles={['admin', 'librarian']}><LoanFormPage /></ProtectedRoute>
                    )} />
                    <Route path="prestamos/:id" element={<LoanDetailPage />} />
                    <Route path="prestamos/:id/editar" element={(
                        <ProtectedRoute allowedRoles={['admin', 'librarian']}><LoanEditPage /></ProtectedRoute>
                    )} />
                    <Route path="usuarios" element={(
                        <ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>
                    )} />
                </Route>

                <Route path="*" element={<Navigate to="/libros" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter

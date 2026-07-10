import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage'
import LoansPage from '../features/loans/LoansPage'
import UsersPage from '../features/users/UsersPage'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import BooksListPage from '../features/books/pages/BooksListPage'
import BookFormPage from '../features/books/pages/BookFormPage'
import BookEditPage from '../features/books/pages/BookEditPage'
import BookDetailPage from '../features/books/pages/BookDetailPage'


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

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
                    <Route path="libros/nuevo" element={<BookFormPage />} />
                    <Route path="libros/:id" element={<BookDetailPage />} />
                    <Route path="libros/:id/editar" element={<BookEditPage />} />
                    <Route path="prestamos" element={<LoansPage />} />
                    <Route path="usuarios" element={<UsersPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/libros" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
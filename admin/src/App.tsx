import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import RestrictedRoute from './components/RestrictedRoute'
import UniversityPage from './pages/university/University'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <RestrictedRoute>
                            <Dashboard />
                        </RestrictedRoute>
                    }
                >
                    <Route path="university" element={<UniversityPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

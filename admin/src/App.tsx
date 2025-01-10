import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import RestrictedRoute from './components/RestrictedRoute'
import UniversityPage from './pages/university/University'
import UniversityDetails from './pages/university/details/UniverstiyDetails'
import { QueryClient, QueryClientProvider } from 'react-query'
import QuestionPaper from './pages/question-paper/QuestionPaper'

const reactQueryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={reactQueryClient}>
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
                        <Route
                            path="university/:university_id"
                            element={<UniversityDetails />}
                        />
                        <Route path="university" element={<UniversityPage />} />
                        <Route
                            path="question_paper"
                            element={<QuestionPaper />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App

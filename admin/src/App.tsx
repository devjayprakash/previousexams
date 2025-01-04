import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RestrictedRoute from "./components/RestrictedRoute";

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
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

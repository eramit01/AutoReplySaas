import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Spas from "./pages/Spas.jsx";
import Leads from "./pages/Leads.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="spas" element={<Spas />} />
        <Route path="leads" element={<Leads />} />
      </Route>
    </Routes>
  );
};

export default App;

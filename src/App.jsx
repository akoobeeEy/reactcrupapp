import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Teacher from "./pages/Teacher";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Login from "./pages/Login";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AdminLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/students/id:teacherId" element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

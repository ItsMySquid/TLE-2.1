import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken");
    const savedDate = localStorage.getItem("loginDate");
    const today = new Date().toISOString().split("T")[0]; // Huidige datum (YYYY-MM-DD)

    if (!token || savedDate !== today) {
        // Token wissen en naar login sturen
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("loginDate");

        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

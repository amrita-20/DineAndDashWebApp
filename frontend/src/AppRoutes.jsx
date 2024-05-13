import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthCallback from "./components/AuthCallback";
import UserProfilePage from "./components/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

function AppRoutes () {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<UserProfilePage/>} />
            </Route>
         
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthCallback from "./components/AuthCallback";
import UserProfilePage from "./components/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout";
import MenuPage from "./components/MenuPage";

function AppRoutes () {
    return(
        <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/auth-callback" element={<Layout><AuthCallback /></Layout>} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
                <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
            </Route>
         
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;
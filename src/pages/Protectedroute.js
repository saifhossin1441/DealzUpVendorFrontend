import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const vendorInfo = JSON.parse(localStorage.getItem("vendorInfo"));

    if (!vendorInfo || !vendorInfo.access_token) {
        return <Navigate to="/VendorLogin" />;
    }

    try {
        const decodedToken = jwtDecode(vendorInfo.access_token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem("vendorInfo"); // Clear expired session
            return <Navigate to="/VendorLogin" />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("vendorInfo");
        return <Navigate to="/VendorLogin" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

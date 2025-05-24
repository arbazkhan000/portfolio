import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import AdminLogin from "../admin/AdminLogin";
import AdminProjectsCreate from "../admin/AdminProjectsCreate";
import App from "../App";
import ContactForm from "../components/ContactForm";
import Service from "../components/Service";
import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";

const AdminProtected = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "services",
                element: <Service />,
            },
            {
                path: "skill",
                element: <Skills />,
            },
            {
                path: "projects",
                element: <Projects />,
            },
            {
                path: "contact",
                element: <ContactForm />,
            },
            // {
            //     path: "*",
            //     element: <NotFound />,
            // },
        ],
    },

    // admin routes
    {
        path: "/admin",
        children: [
            {
                path: "login",
                element: <AdminLogin />,
            },
            {
                path: "dashboard",
                element: (
                    <AdminProtected>
                        <AdminLayout />
                    </AdminProtected>
                ),
            },
            {
                path: "create",
                element: (
                    <AdminProtected>
                        <AdminProjectsCreate />
                    </AdminProtected>
                ),
            },
            {
                path: "edit/:id",
                element: (
                    <AdminProtected>
                        <AdminProjectsCreate />
                    </AdminProtected>
                ),
            },
        ],
    },
]);

export default router;

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";
import axiosInstance from "../utils/axiosInstance";

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get("/projects");
            if (data.success) {
                setProjects(data.data || []);
            } else {
                setError(data.message || "Failed to fetch projects");
            }
        } catch (error) {
            console.error("Fetch projects error:", error);
            setError(
                error.response?.data?.message ||
                    "Failed to fetch projects. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            const { data } = await axiosInstance.delete(
                `/projects/${projectId}`
            );
            if (data.success) {
                fetchProjects(); // Refresh the list
            } else {
                setError(data.message || "Failed to delete project");
            }
        } catch (error) {
            console.error("Delete project error:", error);
            setError(
                error.response?.data?.message ||
                    "Failed to delete project. Please try again."
            );
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="w-full flex items-center justify-center h-16 bg-gray-800 text-white fixed top-0 z-10">
                <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <h1 className="text-lg sm:text-xl font-semibold">
                        Welcome, {user?.username || "Admin"}
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => navigate("/admin/create")}
                            className="bg-green-500 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-white cursor-pointer transition text-xs sm:text-sm"
                        >
                            Add Project
                        </button>
                        <button
                            onClick={logout}
                            className="bg-red-500 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-600 text-white cursor-pointer transition text-xs sm:text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Outlet />
                <section className="mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
                        Projects
                    </h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    ) : projects.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">
                            No projects found. Create your first project!
                        </p>
                    ) : (
                        <div className="overflow-x-auto w-full">
                            {/* Desktop Table */}
                            <table className="hidden md:table min-w-full divide-y divide-gray-200 shadow-lg bg-white rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr className="text-left text-xs sm:text-sm text-gray-700">
                                        <th className="px-6 py-3">Image</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">
                                            Description
                                        </th>
                                        <th className="px-6 py-3">
                                            Tech Stack
                                        </th>
                                        <th className="px-6 py-3">Links</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {projects.map((project) => (
                                        <tr
                                            key={project._id}
                                            className="hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {project.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 max-w-xs">
                                                {project.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {project.techStack?.map(
                                                        (tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-sm text-xs font-semibold"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col space-y-2">
                                                    {project.githubUrl && (
                                                        <a
                                                            href={
                                                                project.githubUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline text-sm"
                                                        >
                                                            GitHub
                                                        </a>
                                                    )}
                                                    {project.liveUrl && (
                                                        <a
                                                            href={
                                                                project.liveUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline text-sm"
                                                        >
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/edit/${project._id}`
                                                            )
                                                        }
                                                        className="text-green-600 hover:text-green-800 p-1"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                project._id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Mobile Cards */}
                            <div className="md:hidden grid gap-4 sm:grid-cols-2">
                                {projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="bg-white rounded-lg shadow-md p-4"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {project.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {project.techStack?.map(
                                                        (tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-gray-200 px-2 py-1 rounded text-xs"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex justify-between items-center">
                                            <div className="flex space-x-4">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Live
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/${project._id}`
                                                        )
                                                    }
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            project._id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;

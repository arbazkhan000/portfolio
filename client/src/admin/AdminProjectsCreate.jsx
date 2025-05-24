import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminProjectsCreate = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        techStack: [],
        githubUrl: "",
        liveUrl: "",
        category: "fullstack",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [techInput, setTechInput] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); 

    const categories = [
        { id: 1, name: "fullstack", label: "Fullstack" },
        { id: 2, name: "frontend", label: "Frontend" },
        { id: 3, name: "backend", label: "Backend" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleTechAdd = (e) => {
        e.preventDefault();
        if (
            techInput.trim() &&
            !formData.techStack.includes(techInput.trim())
        ) {
            setFormData((prev) => ({
                ...prev,
                techStack: [...prev.techStack, techInput.trim()],
            }));
            setTechInput("");
        }
    };

    const handleTechRemove = (techToRemove) => {
        setFormData((prev) => ({
            ...prev,
            techStack: prev.techStack.filter((tech) => tech !== techToRemove),
        }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.description ||
            formData.techStack.length === 0 ||
            !image ||
            !formData.category
        ) {
            alert("All fields are required.");
            return;
        }

        // if (!isValidUrl(formData.githubUrl) || !isValidUrl(formData.liveUrl)) {
        //     alert("Please enter valid URLs for Github and Live preview");
        //     return;
        // }

        try {
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("description", formData.description);
            payload.append("githubUrl", formData.githubUrl);
            payload.append("liveUrl", formData.liveUrl);
            payload.append("image", image);
            formData.techStack.forEach((tech) => {
                payload.append("techStack", tech);
            });
            payload.append("category", formData.category);

            const { data } = await axiosInstance.post("/projects", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data.data) {
                alert("Project created successfully!");
                setFormData({
                    name: "",
                    description: "",
                    techStack: [],
                    githubUrl: "",
                    liveUrl: "",
                    category: "fullstack",
                });
                setImage(null);
                setImagePreview(null);
                setTechInput("");
                // document.getElementById("myImage").value = "";

                navigate("/admin/dashboard");
            }
        } catch (err) {
            console.error("Error:", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "Unauthorized") {
                alert("Session expired. Please login again.");
            } else {
                alert(errorMessage || "Error submitting form.");
            }
        }
    };

    const cancelProject = () => {
        navigate(-1);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                    Create New Project
                </h1>

                <form
                    className="bg-white rounded-lg shadow-md p-4 sm:p-6"
                    onSubmit={handleSubmit}
                >
                    {/* Image Upload and Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Image
                            </label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="w-full">
                                    <input
                                        type="file"
                                        id="myImage"
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                </div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Project Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                placeholder="Enter project name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter project description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tech Stack
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                            <input
                                className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                placeholder="Enter technology (e.g. React, Node.js)"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={handleTechAdd}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => handleTechRemove(tech)}
                                        className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-6">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                        <div>
                            <label
                                htmlFor="githubUrl"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                GitHub URL
                            </label>
                            <input
                                id="githubUrl"
                                name="githubUrl"
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="url"
                                placeholder="https://github.com/your-project"
                                value={formData.githubUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="liveUrl"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Live URL
                            </label>
                            <input
                                id="liveUrl"
                                name="liveUrl"
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type="url"
                                placeholder="https://your-project.com"
                                value={formData.liveUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6">
                        <button
                            type="button"
                            onClick={cancelProject}
                            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProjectsCreate;

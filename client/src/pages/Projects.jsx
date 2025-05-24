import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProjectCard from "../components/ProjectCard";
import axiosInstance from "../utils/axiosInstance";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const fetchProjects = async (category = "All") => {
        setLoading(true);
        setError("");
        try {
            const endpoint =
                category === "All"
                    ? "/projects"
                    : `/projects/${category.toLowerCase()}`;

            const response = await axiosInstance.get(endpoint);
            setProjects(response.data.data || []); // Access the data property from your backend response
        } catch (err) {
            setError("Failed to fetch projects.");
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(selectedCategory);
    }, [selectedCategory]);

    const categoryProject = [
        { id: 1, name: "All" },
        { id: 2, name: "fullstack" },
        { id: 3, name: "frontend" },
        { id: 4, name: "backend" },
    ];

    return (
        <section className="py-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D1D5DC] mb-8 text-center">
                    <i className="italic underline decoration-orange-500">
                        Projects
                    </i>
                </h1>

                {/* Category filter */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 p-4 mb-8">
                    {categoryProject.map((elem) => (
                        <button
                            key={elem.id}
                            onClick={() => setSelectedCategory(elem.name)}
                            className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 text-white capitalize ${
                                selectedCategory === elem.name
                                    ? "bg-purple-600"
                                    : "bg-gradient-to-r from-purple-500/30 to-purple-900/10 backdrop-blur-2xl hover:bg-purple-700/30"
                            }`}
                        >
                            {elem.name}
                        </button>
                    ))}
                </div>

                {error && (
                    <p className="text-center text-red-500 mb-4">{error}</p>
                )}

                {/* Projects grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-full">
                            <LoadingSpinner />
                        </div>
                    ) : projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            No projects found{" "}
                            {selectedCategory !== "All"
                                ? `for ${selectedCategory} category`
                                : ""}
                            .
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectCard = ({ project }) => {
    const imageUrl = project.image
        ? `http://localhost:5001/uploads/${project.image}`
        : "/fallback-image.jpg";
    return (
        <div className="bg-[#D1D5DC] rounded-xl shadow-md overflow-hidden max-w-sm w-full">
            {/* Image Section */}
            <div className="h-32 w-full">
                <img
                    src={imageUrl}
                    alt={project?.title || "Project Image"}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {project?.name || "Untitled Project"}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {project?.description || "No description available."}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {(project?.techStack || []).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex justify-between items-center">
                    <a
                        href={project?.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors text-sm"
                    >
                        <FaGithub className="text-lg" />
                        <span>GitHub</span>
                    </a>
                    <a
                        href={project?.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors text-sm"
                    >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

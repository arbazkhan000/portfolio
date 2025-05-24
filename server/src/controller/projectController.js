import fs from "fs";
import path from "path";
import Project from "../schema/projectSchema.js";

const ProjectController = {
    // @desc    Create all project
    // @route   POST /api/v1/projects
    // @access  Public
    getProjects: async (req, res) => {
        try {
            const project = await Project.find();

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Something went wrong !",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Project fetch Successfully",
                data: project,
            });
        } catch (error) {
            console.log("Error in all projects", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // @desc    Porject by category
    // @route   POST /api/v1/projects
    // @access  public

    getProjectsByCategory: async (req, res) => {
        const { category } = req.params;

        try {
            const validCategories = ["All", "frontend", "backend", "fullstack"];
            if (!validCategories.includes(category)) {
                return res.status(400).json({ error: "Invalid category" });
            }

            const filter = category === "All" ? {} : { category };

            const projects = await Project.find(filter).sort({ createdAt: -1 });

            if (projects.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No projects found for this category",
                    data: [],
                });
            }
            return res.status(200).json({
                success: true,
                message: `Projects fetched successfully for category: ${category}`,
                data: projects,
            });
        } catch (error) {
            console.log("Error in create projects", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // @desc    Create new project
    // @route   POST /api/v1/projects
    // @access  Private

    createProject: async (req, res) => {
        const { name, description, techStack, githubUrl, liveUrl, category } =
            req.body;

        try {
            if (!name || !description || !techStack || !category) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please provide all required fields including image",
                });
            }

            // image validation

            const imagePath = req.file?.filename;

            if (!imagePath) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            const techStackArray = techStack
                .split(",")
                .map((tech) => tech.trim());

            const newProject = new Project({
                name,
                description,
                techStack: techStackArray,
                image: imagePath,
                category:category,
                githubUrl: githubUrl || null,
                liveUrl: liveUrl || null,
            });

            await newProject.save();

            return res.status(200).json({
                success: true,
                message: "Project create Successfully",
                data: newProject,
            });
        } catch (error) {
            console.log("Error in create projects", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // @desc    Update project
    // @route   PUT /api/v1/projects/:id
    // @access  Private

    updateProject: async (req, res) => {
        const { id } = req.params;
        const { name, description, techStack, githubUrl, liveUrl, category } =
            req.body;

        try {
            const existingProject = await Project.findById(id);

            if (!existingProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            const updateData = {
                name: name || existingProject.name,
                description: description || existingProject.description,
                techStack: techStack
                    ? techStack.split(",").map((tech) => tech.trim())
                    : existingProject.techStack,
                category: category || existingProject.category,
                githubUrl: githubUrl || existingProject.githubUrl,
                liveUrl: liveUrl || existingProject.liveUrl,
            };

            if (req.file) {
                // Delete old image if it exists
                if (existingProject.image) {
                    const oldImagePath = path.join(
                        process.cwd(),
                        "uploads",
                        existingProject.image
                    );

                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = req.file.filename;
            }

            const updatedProject = await Project.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                message: "Project updated successfully",
                data: updatedProject,
            });
        } catch (error) {
            console.error("Error in updateProject:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // @desc    Delete project
    // @route   DELETE /api/v1/projects/:id
    // @access  Private

    deleteProject: async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            await Project.findByIdAndDelete(id);
            // Delete associated image
            if (project.image) {
                const imagePath = path.join(
                    process.cwd(),
                    "uploads",
                    project.image
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            return res.status(200).json({
                success: true,
                message: "Project delete successfully",
            });
        } catch (error) {
            console.log("Error in delete projects", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};

export default ProjectController;

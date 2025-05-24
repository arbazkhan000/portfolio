import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a Name"],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    image: {
        type: String,
        required: [true, "Please add a image"],
    },
    techStack: {
        type: [String],
        required: [true, "Please tech stack name"],
    },
    githubUrl: String,
    liveUrl: String,
    category: {
        type: String,
        enum: ["All", "frontend", "backend", "fullstack"],
        default: "All",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;

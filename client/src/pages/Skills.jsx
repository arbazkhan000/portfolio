import React from "react";
import { Tilt } from "react-tilt";
import BootstrapLogo from "../../public/images/bootstrap.svg";
import CssLogo from "../../public/images/css3.svg";
import ExpressLogo from "../../public/images/express.svg";
import GitLogo from "../../public/images/git.svg";
import GithubLogo from "../../public/images/github.svg";
import HtmlLogo from "../../public/images/html5.svg";
import JsLogo from "../../public/images/javascript.svg";
import MongodbLogo from "../../public/images/mongodb.svg";
import NodejsLogo from "../../public/images/nodejs.png"; 
import ReactLogo from "../../public/images/react.svg";
import TailwindcssLogo from "../../public/images/tailwindcss.svg";
import PythonLogo from "../../public/images/python.svg";

// Skill icons
const skillIcons = {
    HTML: HtmlLogo,
    CSS: CssLogo,
    JavaScript: JsLogo,
    React: ReactLogo,
    Bootstrap: BootstrapLogo,
    TailwindCSS: TailwindcssLogo,
    Express: ExpressLogo,
    Nodejs: NodejsLogo,
    Mongodb: MongodbLogo,
    Git: GitLogo,
    Github: GithubLogo,
    Python: PythonLogo,
};

const Skills = () => {
    const skillsItems = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Bootstrap",
        "TailwindCSS",
        "Express",
        "Nodejs",
        "Mongodb",
        "Git",
        "Github",
        "Python",
    ];

    // Tilt options
    const tiltOptions = {
        max: 25, // Maximum tilt rotation (degrees)
        scale: 1.05, // Slight zoom on hover
        speed: 400, // Speed of the tilt effect
    };

    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D1D5DC] mb-8 text-center">
                    <i className="italic underline decoration-orange-500">
                        Skills
                    </i>
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {skillsItems.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Tilt options={tiltOptions}>
                                <div
                                    className="relative group bg-gradient-to-r from-purple-500/30 to-purple-900/10 backdrop-blur-2xl p-4 rounded-xl shadow-md"
                                    style={{
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                    role="img"
                                    aria-label={`${skill} skill`}
                                >
                                    {/* Skill Icon */}
                                    <img
                                        src={skillIcons[skill]}
                                        alt={`${skill} skill icon`}
                                        className="w-20 h-20 rounded-full object-contain p-2 bg-[#D1D5DC] shadow-sm"
                                    />
                                    {/* Hover Tooltip */}
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-purple-400 text-xs rounded py-1 px-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
                                        {skill}
                                    </span>
                                </div>
                            </Tilt>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

import React from "react";
import {
    FaCode,
    FaCss3Alt,
    FaDatabase,
    FaHtml5,
    FaJs,
    FaNodeJs,
    FaReact,
    FaServer,
} from "react-icons/fa";
import { MdCode } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Tilt } from "react-tilt";

const Service = () => {
    const location = useLocation();
    console.log("Service", location);

    const services = [
        {
            title: "Full Stack Developer",
            description:
                "Delivering end-to-end web solutions by combining frontend and backend expertise. I build scalable applications using technologies like React, Node.js, Express, and databases, ensuring seamless integration and optimal performance.",
            iconColor: "green",
            gradient: "from-green-500/30 to-green-900/10",
            topIcon: <FaServer className="text-green-400 text-2xl" />,
            icons: [
                <FaHtml5 className="text-2xl" />,
                <FaCss3Alt className="text-2xl" />,
                <FaJs className="text-2xl" />,
                <FaReact className="text-2xl" />,
                <FaNodeJs className="text-2xl" />,
                <FaDatabase className="text-2xl" />,
                <FaServer className="text-2xl" />,
            ],
        },
        {
            title: "Frontend Developer",
            description:
                "Building beautiful, responsive, and interactive user interfaces using modern technologies like React, Tailwind CSS, and JavaScript.",
            iconColor: "purple",
            gradient: "from-purple-500/30 to-purple-900/10",
            topIcon: <MdCode className="text-purple-400 text-2xl" />,
            icons: [
                <FaHtml5 className="text-2xl" />,
                <FaCss3Alt className="text-2xl" />,
                <FaJs className="text-2xl" />,
                <FaReact className="text-2xl" />,
                <FaCode className="text-2xl" />,
            ],
        },
    ];

    const Card = ({ service }) => {
        return (
            <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.3}
                className="max-w-[350px]"
            >
                <div
                    className={`relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white transform transition-all duration-500 hover:shadow-2xl hover:shadow-${service.iconColor}-500/20 group cursor-pointer`}
                >
                    <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                    ></div>
                    <div className="absolute top-4 right-4">
                        <div
                            className={`w-12 h-12 rounded-full bg-${service.iconColor}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                            {service.topIcon}
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">
                            {service.title}
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {service.description.slice(0, 100)}...
                        </p>
                    </div>
                    <div className="relative z-10 flex space-x-3 mt-6">
                        {service.icons.map((icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className={`text-${service.iconColor}-400 hover:text-${service.iconColor}-300 transition-colors duration-300 text-lg sm:text-xl`}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </Tilt>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                <i className="italic underline decoration-orange-500">
                    Services
                </i>
            </h1>
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 ">
                {services.map((service, index) => (
                    <Card key={index} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Service;

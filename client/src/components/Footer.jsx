import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Social icons

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-[#D1D5DC] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            About Me
                        </h3>
                        <p className="text-sm">
                            Mohd Arbaz | Frontend Engineer | Passionate about
                            creating responsive and user-friendly web
                            experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/services"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold  mb-2">
                            Connect
                        </h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:text-orange-500 transition-colors"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:text-orange-500 transition-colors"
                            >
                                <FaLinkedin className="text-2xl" />
                            </a>
                            <a
                                href="https://twitter.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:text-orange-500 transition-colors"
                            >
                                <FaTwitter className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center border-t border-gray-700 pt-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()}  All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

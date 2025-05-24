import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const navlinks = [
    { title: "Home", url: "" },
    { title: "About", url: "/about" },
    { title: "Services", url: "/services" },

    { title: "Skills", url: "/skill" },
    { title: "Project", url: "/projects" },
    { title: "Contact", url: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className=" px-10 p-2 flex items-center justify-between">
            <h2
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer  hover:text-orange-500"
            >
                #
            </h2>

            <div>
                {/* Nav Links for larger screens */}
                <ul className="hidden md:flex items-center space-x-5">
                    {navlinks.map((elem, index) => (
                        <li
                            key={index}
                            className="hover:text-orange-500 transition  text-[18px]"
                        >
                            <Link to={elem.url}>{elem.title}</Link>
                        </li>
                    ))}
                </ul>
                {/* Hamburger Menu */}
                <span className="md:hidden" onClick={() => setOpen(true)}>
                    <IoMenu size={30} />
                </span>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
                    <span
                        className="absolute top-4 right-6"
                        onClick={() => setOpen(false)}
                    >
                        <IoClose size={40} className="text-white" />
                    </span>
                    <ul className="space-y-5 text-xl">
                        {navlinks.map((elem, index) => (
                            <li key={index} onClick={() => setOpen(false)}>
                                <Link
                                    to={elem.url}
                                    className="text-white hover:text-[#E96629] text-[18px]"
                                >
                                    {elem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/*  */}
        </div>
    );
};

export default Navbar;

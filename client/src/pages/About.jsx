import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();
    console.log("About", location);

    return (
        <div>
            <div className=" px-4 sm:px-6 md:px-10 py-8 md:py-12 w-full">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
                    {/* Image */}
                    <img
                        className="rounded-xl w-full md:w-1/2 h-auto max-h-[200px] xs:max-h-[250px] sm:max-h-[300px] md:max-h-[350px] object-cover"
                        src="https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Profile"
                    />

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4 sm:gap-5">
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center md:text-left">
                            <i className="italic underline decoration-orange-500">
                                About
                            </i>
                        </h1>
                        <p className="text-center md:text-left text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                            Mohd Arbaz
                            <br />
                            Frontend Engineer | BCA (3rd Year) in Computer
                            Applications
                            <br />
                            Skilled in HTML, CSS, JavaScript, and React, with a
                            passion for building responsive, user-friendly web
                            interfaces. Continuously expanding knowledge in
                            modern web technologies to stay ahead in the field.
                            Enthusiastic about contributing to innovative
                            projects and growing as a developer in the tech
                            industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

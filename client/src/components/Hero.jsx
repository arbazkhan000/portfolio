import React from "react";
import { useLocation } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
    const location = useLocation();
    console.log("Hero",location)
    return (
        <div className="min-h-screen flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">
            {/* Main content */}
            <div className="max-w-4xl mx-auto text-center">
                {/* Heading */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Hi, I'm{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-orange-500">
                        Arbaz
                    </span>
                    ,
                    <br className="hidden sm:inline" />
                    another{" "}
                    <i className="italic underline decoration-orange-500">
                        frontend
                    </i>{" "}
                    developer.
                </h1>

                {/* Subtext and CTA */}
                <div className="flex flex-col items-center mt-6 sm:mt-8 md:mt-10">
                    <div className="border-2 font-bold border-white rounded-full px-3 py-1 text-sm xs:text-base sm:px-4 sm:py-2 md:text-lg lg:text-xl uppercase tracking-wider whitespace-nowrap">
                        <ReactTyped
                            loop
                            strings={[
                                " front-end-developer",
                                "full-stack-developer",
                            ]}
                            typeSpeed={90}
                            backSpeed={50}
                        />
                    </div>
                    <div className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl animate-bounce">
                        ⬇
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

import React from "react";
import Hero from "../components/Hero";
import Service from "../components/Service";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";

const Home = () => {
    return (
        <div className="bg-gray-900 text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
            <Hero />
            <About />
            <Service />
            <Skills />
            <Projects />
        </div>
    );
};

export default Home;

// className =
// "bg-gray-900 text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed";

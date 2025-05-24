import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_c1m7qrq", "template_f2fabri", form.current, {
                publicKey: "X6tmluzP4DUhyJNgm",
            })
            .then(
                () => {
                    console.log("SUCCESS!");
                },
                (error) => {
                    console.log("FAILED...", error.text);
                }
            );
    };

    

    return (
        <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900">
            <div className="w-full max-w-4xl mx-auto bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                    Let's Talk About Your Great Project Together
                </h2>

                {/* Responsive Iframe */}
                <div className="w-full h-64 xs:h-72 sm:h-80 md:h-96 overflow-hidden rounded-lg mb-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.302974147264!2d77.32670902455924!3d28.6805822318987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbaa7c42d9bb%3A0xcb094761a00ca0a5!2sOld%20Seemapuri%2C%20Delhi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1742469051595!5m2!1sen!2sin"
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Form */}
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base font-medium text-gray-300"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="mt-1 w-full p-2 xs:p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs sm:text-sm md:text-base font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="mt-1 w-full p-2 xs:p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-xs sm:text-sm md:text-base font-medium text-gray-300"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="3 xs:rows-4 sm:rows-5"
                            className="mt-1 w-full p-2 xs:p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 resize-y text-sm sm:text-base"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 xs:p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-semibold text-sm sm:text-base md:text-lg"
                    >
                        Send Message
                    </button>
                </form>

                {/* Status Message */}
                {status && (
                    <p
                        className={`mt-4 text-center text-xs sm:text-sm md:text-base ${
                            status.includes("success")
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ContactForm;

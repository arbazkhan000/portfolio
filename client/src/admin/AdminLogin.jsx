import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";
import axiosInstance from "../utils/axiosInstance";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                username,
                password,
            });


            if (data.success) {
                if (data.user.role === "admin") {
                    login(data.user);
                    navigate("/admin/dashboard"); 
                } else {
                    alert("You don't have admin privileges");
                    setError("You don't have admin privileges");
                }
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center  bg-[#F3F4F6]">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-900 w-[600px] space-y-5 p-4 rounded-xl"
            >
                <div className="text-black">
                    <label
                        htmlFor="username"
                        className="block text-xs sm:text-sm md:text-base font-medium "
                    >
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Your username Here...."
                        className="mt-1 w-full p-2 xs:p-3 rounded bg-gray-300  border border-gray-600 focus:outline-none focus:border-orange-500 text-sm sm:text-base"
                    />
                </div>

                <div className="text-black">
                    <label
                        htmlFor="password"
                        className="block text-xs sm:text-sm md:text-base font-medium"
                    >
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your Password Here...."
                        className="mt-1 w-full p-2 xs:p-3 rounded bg-gray-300  border border-gray-600 focus:outline-none focus:border-orange-500 text-sm sm:text-base"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full p-2 xs:p-3 bg-orange-500 text-[#D1D5DC] rounded hover:bg-orange-600 transition-colors font-semibold text-sm sm:text-base md:text-lg"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;

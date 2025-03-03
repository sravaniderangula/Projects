import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export default function SignUp() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(userDetails);
            const data = await response.json();
            if (!response.ok) {
                setError("Error during Registration. Please try again later.");
                return;
            }
            setMessage("User Registered Successfully");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mx-auto w-full max-w-lg h-screen">
            <form onSubmit={handleSignUp} className="bg-white p-4 border rounded-md shadow-lg">
                <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="w-full p-4 my-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="w-full p-4 my-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    className="w-full p-4 my-2 border rounded"
                />
                <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    placeholder="Enter your mobile number"
                    onChange={handleChange}
                    className="w-full p-4 my-2 border rounded"
                />
                <input
                    type="text"
                    name="address"
                    value={userDetails.address}
                    placeholder="Enter your Address"
                    onChange={handleChange}
                    className="w-full p-4 my-2 border rounded"
                />
                <select
                    value={userDetails.role}
                    name="role"
                    className="w-full max-w-sm p-4 my-3 border rounded"
                    onChange={handleChange}
                >
                    <option value="">Select Your Role</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
                    Register
                </button>
            </form>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-rose-700">{error}</p>}
        </div>
    );
}

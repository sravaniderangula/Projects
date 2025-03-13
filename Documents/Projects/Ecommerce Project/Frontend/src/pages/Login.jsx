import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const {loginUser}=useContext(AuthContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(userDetails);

        setError("");
        setMessage("");
        try {
            const response = await login(userDetails);
            const data = await response.json();
            console.log("response from api",data)

            if (!response.ok) {
                setError(data.message || "Error during Login. Please Try again Later");
                return;
            }
            setMessage("Login Successful! Redirecting to HomePage...");
            localStorage.setItem("user", JSON.stringify(data.user));
            loginUser(data.user,data.token);
              setTimeout(() => navigate("/home"), 2000);
        } catch (error) {
            console.log("response from api",error)

            setError("Internal Server Error. Please try again later.");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 border rounded-md shadow-lg">
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-3 my-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full p-3 my-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white w-full p-3 rounded  transition-transform duration-150 active:scale-90 active:bg-blue-900">
                    Login
                </button>
            </form>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

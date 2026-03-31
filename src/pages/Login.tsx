import { useState } from "react";
import API from "../services/api";
import { useDispatch, UseDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispach = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            dispach(loginSuccess(res.data));

            const role = res.data.user.role;

            if (role === "MASTER") navigate("/master/dashboard");
            else if (role === "TEACHER") navigate("/teacher/dashboard");
            else if (role === 'STUDENT') navigate('/student/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="p-6 bg-white shadow-md rounded">
                <h2 className="text-xl mb-4">Login</h2>

                <input type="email" className="border p-2 mb-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="border p-2 mb-2 w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <p className='text-sm mt-2'>
                    Don't have an account?{" "}
                    <span
                        className={"text-blue-500 cursor-pointer"}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

                <button className="namebg-blue-500 text-black px-4 py-2 w-full" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;

import { ChangeEvent, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
    });

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", form);
            alert("User Registered Successfully");
            navigate("/login");
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || error.response?.data?.error || "Registration failed");
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="p-6 bg-white shadow-md rounded w-80">
                <h2 className="text-xl mb-4">Register</h2>

                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 mb-2 w-full"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 mb-2 w-full"
                    value={form.email}
                    onChange={handleChange}
                />

                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    className="border p-2 mb-2 w-full"
                    value={form.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="border p-2 mb-2 w-full"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="MASTER">Master</option>
                </select>

                <button
                    className="border p-2 mb-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
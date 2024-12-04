import React, { useState } from "react";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      alert("Login Successful!");
      console.log("Redirecting to /user-dashboard");
      onLogin();
      navigate("/user-dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <span className="text-xs text-red-500">
          Note: without login you can't access user_dashboard
        </span>
        <div className="mb-4 mt-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4"
          />
        </div>
        <div className="mb-6">
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-4"
          />
        </div>
        <Button type="primary" className="w-full mb-4" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-500 underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

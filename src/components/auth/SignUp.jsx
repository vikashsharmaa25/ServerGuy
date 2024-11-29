import React, { useState } from "react";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      alert("Sign Up Successful!");
      setEmail("");
      setPassword("");
      navigate("/login");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
        <div className="mb-4">
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
        <Button type="primary" className="w-full mb-4" onClick={handleSignUp}>
          Sign Up
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

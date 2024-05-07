import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContexts";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import "../register/index.css";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="container">
      <ToastContainer /> {/* Render ToastContainer at the root level */}
      {userLoggedIn && <Navigate to="/home" replace={true} />}
      <div className="login-form">
        <img
          src="https://clipground.com/images/images-logo-png-3.png"
          alt="Sales Admin"
          className="image"
          style={{ maxWidth: "100px" }}
        />

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`button-primary ${
              isSigningIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center justify-between">
          <hr className="w-full" />
          <p className="px-3 text-sm text-gray-600">or</p>
          <hr className="w-full" />
        </div>
        <button
          onClick={onGoogleSignIn}
          disabled={isSigningIn}
          className="button-secondary"
        >
          <img
            src="path-to-google-icon.svg"
            alt="Google sign-in"
            className="w-5 h-5 mr-3"
          />
          {isSigningIn ? "Signing In..." : "Continue with Google"}
        </button>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

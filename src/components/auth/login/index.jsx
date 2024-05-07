import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContexts/index";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import "../login/index.css"; // Import the CSS file with styles

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      toast.error(error.message); // Display error message as toast
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
    } catch (error) {
      toast.error(error.message); // Display error message as toast
    } finally {
      setIsSigningIn(false);
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
              id="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default Login;

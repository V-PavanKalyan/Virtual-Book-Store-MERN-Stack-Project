import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setMessage("Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6">
      <div className="w-full max-w-md premium-card p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-2">Welcome Back</h2>
          <p className="text-slate-500">Sign in to continue to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-secondary mb-2">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-secondary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="text-sm font-semibold text-secondary">
                Password
              </label>
              <Link to="#" className="text-xs font-semibold text-primary hover:text-primary-dark">Forgot Password?</Link>
            </div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-secondary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
            />
            {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password.message}</p>}
          </div>

          {message && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary w-full py-3.5"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="btn-secondary w-full py-3 flex items-center justify-center gap-3"
        >
          <FaGoogle className="text-rose-500" />
          <span>Google Workspace</span>
        </button>

        <p className="mt-10 text-center text-sm text-slate-500">
          New to Virtual Book Store? 
          <Link to="/register" className="text-primary hover:text-primary-dark font-bold ml-1.5 transition-colors underline underline-offset-4">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Register() {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefillEmail = location.state?.prefillEmail || "";
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: prefillEmail }
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      Swal.fire({
        icon: 'success',
        title: 'Welcome to Virtual Book Store!',
        text: 'Your account has been created successfully.',
        confirmButtonColor: '#6366f1'
      });
      navigate("/");
    } catch (error) {
      setMessage("Failed to create account. Email may already be in use.");
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
          <h2 className="text-3xl font-bold text-secondary mb-2">Create Account</h2>
          <p className="text-slate-500">Join our community of book lovers today</p>
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
            <label htmlFor="password" className="block text-sm font-semibold text-secondary mb-2">
              Password
            </label>
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" }
              })}
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
            Create Account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-medium">Or join with</span>
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
          Already a member? 
          <Link to="/login" className="text-primary hover:text-primary-dark font-bold ml-1.5 transition-colors underline underline-offset-4">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
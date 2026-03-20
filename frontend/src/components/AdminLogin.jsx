import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiUser, FiShield } from "react-icons/fi"
import Swal from 'sweetalert2'

export default function AdminLogin() {
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                // Set extraction time for token, e.g., 1 hour
                setTimeout(() => {
                    localStorage.removeItem('token')
                    Swal.fire({
                        title: "Session Expired",
                        text: "Your admin session has ended. Please log in again.",
                        icon: "info"
                    })
                    navigate("/")
                }, 3600 * 1000)
            }

            Swal.fire({
                title: "Access Granted",
                text: "Welcome to the Administration Panel",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/dashboard")

        } catch (error) {
            setMessage("Invalid administrator credentials")
            console.error(error)
            Swal.fire({
                title: "Access Denied",
                text: "Please check your credentials and try again.",
                icon: "error"
            })
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-950 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md mx-auto z-10 px-6">
                <div className="dark-glass p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6 border border-primary/20">
                            <FiShield className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-white">Admin Portal</h2>
                        <p className="text-slate-400 mt-2 text-sm font-medium">Secure entry for system administrators</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" htmlFor="username">Username</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
                                    <FiUser />
                                </span>
                                <input
                                    {...register("username", { required: "Username is required" })}
                                    type="text" id="username" placeholder="Admin username"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                />
                            </div>
                            {errors.username && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1">{errors.username.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1" htmlFor="password">Secret Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
                                    <FiLock />
                                </span>
                                <input
                                    {...register("password", { required: "Password is required" })}
                                    type="password" id="password" placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-600"
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1">{errors.password.message}</p>}
                        </div>

                        {message && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold py-3 px-4 rounded-xl text-center">
                                {message}
                            </div>
                        )}

                        <button type="submit" className="btn-primary w-full !py-4 text-lg font-black shadow-2xl shadow-amber-600/20 hover:scale-[1.02] transition-transform">
                            Authorize Entry
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                            © 2026 BookStore Intelligence Systems
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
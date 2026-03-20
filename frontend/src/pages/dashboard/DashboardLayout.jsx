import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineManageHistory, MdDashboard } from "react-icons/md";
import { FiBell, FiSearch, FiSettings } from "react-icons/fi";

export default function DashboardLayout() {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/")
    }

    return (
        <section className="flex bg-slate-50 min-h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex lg:flex-col w-24 bg-secondary text-white border-r border-white/5 shadow-2xl z-20">
                <Link to="/" className="inline-flex items-center justify-center h-24 w-full bg-primary/10 border-b border-white/5 group">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                         <span className="font-black text-xl">B</span>
                    </div>
                </Link>
                <div className="flex-grow flex flex-col justify-between py-10">
                    <nav className="flex flex-col items-center space-y-8">
                        <Link to="/dashboard" className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner group">
                            <MdDashboard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/dashboard/add-new-book" className="p-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
                            <HiViewGridAdd className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/dashboard/manage-books" className="p-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
                            <MdOutlineManageHistory className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </Link>
                    </nav>
                    <div className="flex flex-col items-center space-y-8">
                        <button className="p-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                             <FiSettings className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
                        >
                            <HiOutlineLogout className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-grow flex flex-col min-w-0">
                {/* Header */}
                <header className="h-24 px-8 lg:px-12 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-full max-w-lg group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search data, reports, books..." 
                            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                        />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button className="relative p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                            <FiBell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-10 w-px bg-slate-100 mx-2"></div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-secondary">Administrator</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Manager</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-slate-50 shadow-sm hover:border-primary/50 transition-all cursor-pointer">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </section>
    )
}
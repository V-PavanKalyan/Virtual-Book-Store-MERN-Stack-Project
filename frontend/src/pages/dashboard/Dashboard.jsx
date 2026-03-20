import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { FiBookOpen, FiDollarSign, FiTrendingUp, FiShoppingBag, FiUsers, FiLayers } from "react-icons/fi"
import RevenueChart from './RevenueChart';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <Loading />

    return (
        <div className="bg-slate-50/50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-secondary tracking-tight">Executive Overview</h1>
                        <p className="text-slate-500 font-medium">Real-time store performance analytics</p>
                    </div>
                </div>

                {/* Main Stats */}
                <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="premium-card p-8 bg-white flex items-center gap-6 group hover:border-primary/50 transition-all">
                        <div className="inline-flex h-16 w-16 text-indigo-600 bg-indigo-50 rounded-2xl items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            <FiBookOpen />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-secondary">{data?.totalBooks}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Inventory</p>
                        </div>
                    </div>

                    <div className="premium-card p-8 bg-white flex items-center gap-6 group hover:border-emerald-500/50 transition-all">
                        <div className="inline-flex h-16 w-16 text-emerald-600 bg-emerald-50 rounded-2xl items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            <FiDollarSign />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-secondary">${data?.totalSales?.toFixed(2)}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gross Revenue</p>
                        </div>
                    </div>

                    <div className="premium-card p-8 bg-white flex items-center gap-6 group hover:border-amber-500/50 transition-all">
                        <div className="inline-flex h-16 w-16 text-amber-600 bg-amber-50 rounded-2xl items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            <FiTrendingUp />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-3xl font-black text-secondary">{data?.trendingBooks}</h3>
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">HOT</span>
                            </div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Trending Books</p>
                        </div>
                    </div>

                    <div className="premium-card p-8 bg-white flex items-center gap-6 group hover:border-sky-500/50 transition-all">
                        <div className="inline-flex h-16 w-16 text-sky-600 bg-sky-50 rounded-2xl items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            <FiShoppingBag />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-secondary">{data?.totalOrders}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</p>
                        </div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Revenue Forecast */}
                    <div className="lg:col-span-2">
                        <div className="premium-card bg-white p-8 h-full">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-secondary">Revenue Streams</h2>
                                <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
                                    <option>Last 12 Months</option>
                                    <option>Last Quarter</option>
                                </select>
                            </div>
                            <div className="h-[400px]">
                                <RevenueChart data={data?.monthlySales} />
                            </div>
                        </div>
                    </div>

                    {/* Secondary Analytics */}
                    <div className="flex flex-col gap-8">
                        <div className="premium-card bg-secondary text-white p-8">
                            <h2 className="text-xl font-black mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => navigate('/dashboard/add-new-book')}
                                    className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5"
                                >
                                    <FiLayers className="text-primary w-6 h-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Book</span>
                                </button>
                                <button 
                                    onClick={() => navigate('/dashboard/manage-books')}
                                    className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5"
                                >
                                    <FiUsers className="text-emerald-400 w-6 h-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Inventory</span>
                                </button>
                            </div>
                        </div>

                        <div className="premium-card bg-white p-8 flex-1">
                            <h2 className="text-xl font-bold text-secondary mb-6">Store Health</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-400 uppercase">Server Status</span>
                                        <span className="text-emerald-500">OPERATIONAL</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full w-[98%] shadow-sm"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-400 uppercase">Database Load</span>
                                        <span className="text-amber-500">OPTIMAL</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-amber-500 h-full w-[45%] shadow-sm"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-400 uppercase">API Latency</span>
                                        <span className="text-sky-500">FAST (42ms)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-sky-500 h-full w-[15%] shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
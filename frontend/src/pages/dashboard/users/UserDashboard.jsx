import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { FiShoppingBag, FiCalendar, FiPackage, FiUser, FiActivity } from "react-icons/fi";

export default function UserDashboard() {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    if (isError) return <div className="text-center py-20 text-red-500 font-bold">Error loading dashboard data...</div>;

    const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2);

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl overflow-hidden border-4 border-white shadow-xl">
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <FiUser />
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black text-secondary">Hello, {currentUser?.displayName || 'Adventurous Reader'}!</h1>
                        <p className="text-slate-500 font-medium">Welcome back to your literary haven. Here's your activity overview.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="premium-card p-6 bg-white flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                            <FiShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
                            <h3 className="text-2xl font-black text-secondary">{orders.length}</h3>
                        </div>
                    </div>
                    <div className="premium-card p-6 bg-white flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <FiActivity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spent</p>
                            <h3 className="text-2xl font-black text-secondary">${totalSpent}</h3>
                        </div>
                    </div>
                    <div className="premium-card p-6 bg-white flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <FiPackage className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Books Bought</p>
                            <h3 className="text-2xl font-black text-secondary">
                                {orders.reduce((acc, order) => acc + order.productIds.length, 0)}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-secondary">Recent Order History</h2>
                    </div>

                    {orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="premium-card p-6 bg-white border border-slate-100 flex flex-wrap items-center justify-between gap-6 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                            <FiPackage className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary text-sm">Order #{order._id.slice(-6).toUpperCase()}</h4>
                                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                                <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" /> {new Date(order?.createdAt).toLocaleDateString()}</span>
                                                <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] uppercase font-bold text-slate-500">{order.status || 'Processing'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-300 uppercase">Amount</p>
                                            <p className="text-lg font-black text-primary">${order.totalPrice}</p>
                                        </div>
                                        <button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors">
                                            <FiActivity className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                             <p className="text-slate-400">No recent activity found.</p>
                             <button className="btn-primary mt-6">Browse Books</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
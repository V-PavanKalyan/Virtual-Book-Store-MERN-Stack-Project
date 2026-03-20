import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';
import { FiPackage, FiMapPin, FiClock, FiCheckCircle, FiUser } from "react-icons/fi";

export default function OrderPage() {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    if (isError) return <div className="text-center py-20 text-red-500 font-bold">Error loading your orders...</div>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <FiPackage className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-secondary">My Orders</h1>
                    <p className="text-slate-500">Track and manage your book purchases</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiPackage className="w-10 h-10 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary mb-2">No orders yet</h2>
                    <p className="text-slate-500 mb-8">Your order history will appear here once you make a purchase.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <div key={order._id} className="premium-card p-0 bg-white overflow-hidden border border-slate-100 transition-all hover:shadow-xl">
                            <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-secondary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                                        <h3 className="text-sm font-black text-secondary">{order._id}</h3>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        order.status === 'shipped' ? 'bg-emerald-100 text-emerald-600' :
                                        order.status === 'processing' ? 'bg-amber-100 text-amber-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {order.status || 'pending'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                                        <FiUser className="w-4 h-4" />
                                        <span>Customer Info</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-secondary">{order.name}</p>
                                        <p className="text-sm text-slate-500">{order.email}</p>
                                        <p className="text-sm text-slate-500">{order.phone}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>Shipping Address</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed capitalize">
                                        {order.address.street}<br />
                                        {order.address.city}, {order.address.state}<br />
                                        {order.address.country}, {order.address.zipcode}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                                        <FiCheckCircle className="w-4 h-4" />
                                        <span>Payment Details</span>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Total Paid</span>
                                            <span className="text-2xl font-black text-primary">${order.totalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 pb-8">
                                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase mb-4">
                                    <FiClock className="w-4 h-4" />
                                    <span>Ordered Products</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {order.productIds.map((productId) => (
                                        <span key={productId} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-medium font-mono">
                                            {productId}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
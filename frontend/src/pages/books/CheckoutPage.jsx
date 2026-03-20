import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { FiUser, FiMail, FiPhone, FiMapPin, FiTruck, FiBox, FiShield } from "react-icons/fi";
import { getImgUrl } from '../../utils/getImgUrl';

export default function CheckoutPage() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * (item.quantity || 1)), 0).toFixed(2);
    const { currentUser } = useAuth();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
                street: data.address
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: parseFloat(totalPrice),
        };
        
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Order Placed!",
                text: "Your order has been recorded successfully.",
                icon: "success",
                confirmButtonColor: "#6366f1",
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        }
    }

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-secondary">Complete Your Order</h1>
                    <p className="text-slate-500 mt-2">Finish your purchase by providing your delivery details.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Form */}
                    <div className="lg:col-span-2">
                        <div className="premium-card p-8 bg-white">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                                        <FiUser />
                                        <span>Personal Information</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-semibold text-secondary">Full Name</label>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                type="text" id="name" placeholder="John Doe"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                            {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-semibold text-secondary">Email Address</label>
                                            <input
                                                type="email" id="email" 
                                                defaultValue={currentUser?.email}
                                                disabled
                                                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-slate-500 cursor-not-allowed" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-secondary">Phone Number</label>
                                        <input
                                            {...register("phone", { required: "Phone number is required" })}
                                            type="tel" id="phone" placeholder="+1 (555) 000-0000"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                        {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                                        <FiMapPin />
                                        <span>Shipping Address</span>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="address" className="text-sm font-semibold text-secondary">Street Address</label>
                                        <input
                                            {...register("address", { required: "Address is required" })}
                                            type="text" id="address" placeholder="123 Main St, Apt 4"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="col-span-1 md:col-span-2 space-y-2">
                                            <label htmlFor="city" className="text-sm font-semibold text-secondary">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text" id="city" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                        </div>
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="state" className="text-sm font-semibold text-secondary">State</label>
                                            <input
                                                {...register("state", { required: true })}
                                                type="text" id="state" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                        </div>
                                        <div className="col-span-1 space-y-2">
                                            <label htmlFor="zipcode" className="text-sm font-semibold text-secondary">Zipcode</label>
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text" id="zipcode" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="country" className="text-sm font-semibold text-secondary">Country</label>
                                        <input
                                            {...register("country", { required: true })}
                                            type="text" id="country" placeholder="United States"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                            type="checkbox" 
                                            className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary transition-all" 
                                        />
                                        <span className="text-sm text-slate-600 group-hover:text-secondary transition-colors">
                                            I agree to the <Link className="text-primary hover:underline font-semibold">Terms & Conditions</Link>
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isChecked}
                                    className={`btn-primary w-full !py-4 text-lg shadow-xl shadow-amber-600/20 transition-all ${!isChecked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.02]'}`}
                                >
                                    Place Order Securely
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6 sticky top-28">
                            <div className="premium-card p-6 bg-secondary text-white">
                                <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <FiBox />
                                            <span>Items ({cartItems.length})</span>
                                        </div>
                                        <span className="text-white font-semibold">${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <FiTruck />
                                            <span>Shipping</span>
                                        </div>
                                        <span className="text-emerald-400 font-bold uppercase text-xs">Free</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                        <span className="font-bold text-white">Total Amount</span>
                                        <span className="text-3xl font-black text-primary">${totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="premium-card p-6 bg-white border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                    <FiShield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-secondary text-sm">Safe & Secure</h4>
                                    <p className="text-xs text-slate-500">Your transaction is encrypted</p>
                                </div>
                            </div>

                            <div className="px-2">
                                <h3 className="text-sm font-bold text-secondary mb-4 uppercase tracking-widest text-center">Items in Cart</h3>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item._id} className="flex gap-4 items-center">
                                            <div className="w-12 h-16 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                                                <img src={getImgUrl(item.coverImage)} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h5 className="text-xs font-bold text-secondary truncate">{item.title}</h5>
                                                <p className="text-[10px] text-slate-500">Qty: {item.quantity || 1} × ${item.newPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
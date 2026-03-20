import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FiMail, FiArrowRight, FiCheckCircle, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Footer() {
    const { currentUser, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

    const handleSubscribe = () => {
        // If auth is still loading, do nothing
        if (loading) return;

        if (currentUser) {
            // ✅ Already has an account — show info alert
            Swal.fire({
                icon: "info",
                title: "You already have an account!",
                html: `You're signed in as <strong style="color:#d97706">${currentUser.email}</strong>.<br/><br/>You're already part of our community and will receive all updates!`,
                confirmButtonColor: "#d97706",
                confirmButtonText: "Got it!",
            });
        } else {
            // 🔐 No account — validate email then navigate to register
            if (!email.trim()) {
                setEmailError("Please enter your email first.");
                return;
            }
            if (!isValidEmail(email)) {
                setEmailError("Please enter a valid email address.");
                return;
            }
            setEmailError("");
            navigate("/register", { state: { prefillEmail: email.trim() } });
        }
    };

    const renderNewsletterSection = () => {
        // While Firebase is resolving auth, show a subtle skeleton
        if (loading) {
            return (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-3 animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                        <div className="h-3 bg-white/10 rounded-full w-3/4" />
                        <div className="h-3 bg-white/10 rounded-full w-1/2" />
                    </div>
                </div>
            );
        }

        if (currentUser) {
            // ✅ Logged-in: show "already have account" panel
            return (
                <div className="bg-white/5 border border-primary/30 rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary mt-0.5">
                        <FiCheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm mb-1">You already have an account!</p>
                        <p className="text-slate-400 text-xs leading-relaxed mb-3">
                            Signed in as{" "}
                            <span className="text-primary font-semibold truncate block max-w-full">
                                {currentUser.email}
                            </span>
                        </p>
                        <button
                            onClick={handleSubscribe}
                            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/10 transition-all"
                        >
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            You're subscribed ✓
                        </button>
                    </div>
                </div>
            );
        }

        // 👤 Guest: show email input + subscribe button
        return (
            <>
                <p className="text-slate-400 text-sm mb-6">
                    Stay ahead with early access to new releases and exclusive literary insights.
                </p>
                <div className="relative group">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors z-10" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                        }}
                        placeholder="Your primary email"
                        className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-32 outline-none text-white placeholder:text-slate-500 focus:ring-4 focus:ring-primary/10 transition-all font-medium ${
                            emailError ? "border-red-500" : "border-white/10 focus:border-primary"
                        }`}
                        onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    />
                    <button
                        onClick={handleSubscribe}
                        className="absolute right-2 top-2 bottom-2 bg-primary px-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark active:scale-95 transition-all shadow-lg shadow-amber-600/20 text-white"
                    >
                        Subscribe
                    </button>
                </div>
                {emailError && (
                    <p className="text-red-400 text-[11px] font-semibold mt-2 ml-1">{emailError}</p>
                )}
                <p className="text-slate-600 text-[11px] mt-3 font-medium">
                    No account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-primary hover:underline font-bold underline-offset-2 transition-colors"
                    >
                        Create one free →
                    </button>
                </p>
            </>
        );
    };

    return (
        <footer className="bg-secondary text-white pt-24 pb-12 px-6 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand & Mission */}
                    <div className="lg:col-span-5 space-y-8">
                        <h2 className="text-2xl font-black tracking-tight text-white">
                            Virtual <span className="text-primary">Book Store</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Enriching lives through the power of literature. We curate the world's most
                            influential books to inspire your next great discovery.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Library</h4>
                        <ul className="space-y-4">
                            {["Top Sellers", "New Releases", "Recommended", "Categories", "Gift Cards"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group"
                                    >
                                        <FiArrowRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all text-primary mr-0 group-hover:mr-2" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Account Section */}
                    <div className="lg:col-span-4">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Newsletter</h4>
                        {renderNewsletterSection()}
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    <p>© 2026 Virtual Book Store. All global rights reserved.</p>
                    <div className="flex gap-8 items-center cursor-pointer">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
                        <button 
                            onClick={() => navigate("/admin")} 
                            className="hover:text-primary transition-colors uppercase font-bold tracking-[0.2em]"
                        >
                            Admin
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
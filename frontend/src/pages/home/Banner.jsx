import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner.png";

export default function Banner() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded-3xl bg-secondary py-16 lg:py-24">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>
      
      <section className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between px-8 lg:px-20 gap-12">
        {/* Right side Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={bannerImg}
              alt="Premium Books Collection"
              className="relative w-full max-w-sm lg:max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary text-xs font-bold uppercase tracking-widest border border-white/10">
              Curated Selection
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
              Explore The World <br /> 
              <span className="text-primary italic">Through Pages</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Immerse yourself in our collection of global bestsellers. From soul-stirring literature to game-changing business insights, your next adventure starts here.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate('/cart')}
              className="btn-primary !px-10 !py-4 shadow-2xl"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('top-sellers');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary !border-white/20 !text-white hover:!bg-white/10 !bg-transparent"
            >
              New Releases
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
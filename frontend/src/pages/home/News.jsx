import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// Import news images
import news1 from "../../assets/news/news-1.png"
import news2 from "../../assets/news/news-2.png"
import news3 from "../../assets/news/news-3.png"
import news4 from "../../assets/news/news-4.png"

const news = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
        "image": news1,
        "date": "Oct 12, 2024"
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
        "image": news2,
        "date": "Oct 10, 2024"
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
        "image": news3,
        "date": "Oct 08, 2024"
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
        "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
        "image": news4,
        "date": "Oct 05, 2024"
    }
]

export default function News() {
    return (
        <section className="py-20">
            <div className="flex items-center justify-between mb-12">
                <div>
                   <h2 className="text-3xl font-black text-secondary tracking-tight">Literary News</h2>
                   <div className="w-12 h-1 bg-primary mt-2 rounded-full"></div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline underline-offset-4">
                    View Archive
                </button>
            </div>

            <Swiper
                navigation={true}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 30 },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {news.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="premium-card bg-white overflow-hidden group">
                            <div className="flex flex-col md:flex-row gap-8 p-6 lg:p-10">
                                <div className="md:w-3/5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Editorial</span>
                                        <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">{item.date}</span>
                                    </div>
                                    <Link to="/">
                                        <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                                    </Link>
                                    <p className="text-slate-500 leading-relaxed text-sm line-clamp-3">
                                        {item.description}
                                    </p>
                                    <div className="pt-4">
                                        <Link to="/" className="inline-flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-widest border-b-2 border-primary/20 group-hover:border-primary transition-all pb-1">
                                            Read Article
                                        </Link>
                                    </div>
                                </div>
                                <div className="md:w-2/5 flex-shrink-0">
                                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
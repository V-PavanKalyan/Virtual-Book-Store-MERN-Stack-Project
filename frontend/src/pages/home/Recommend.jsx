import React from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

export default function Recommend() {
    const { data: books = [] } = useFetchAllBooksQuery();
    
    return (
        <section className="py-20">
            <div className="flex items-center justify-between mb-12">
                <div>
                   <h2 className="text-3xl font-black text-secondary tracking-tight">Personal Picks</h2>
                   <div className="w-12 h-1 bg-primary mt-2 rounded-full"></div>
                </div>
                <div className="hidden sm:block text-slate-400 font-bold text-xs uppercase tracking-widest">
                    Based on your reading history
                </div>
            </div>

            <Swiper
                navigation={true}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 40 },
                }}
                modules={[Navigation]}
                className="mySwiper !pb-4"
            >
                {books.slice(8, 18).map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
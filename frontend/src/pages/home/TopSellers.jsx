import React, { useEffect, useState } from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = ["All Genre", "Business", "Fiction", "Horror", "Adventure", "Marketing"];

export default function TopSellers() {
  const [selectedCategory, setSelectedCategory] = useState("All Genre");
  const { data: books = [], isLoading } = useFetchAllBooksQuery();
  
  const filteredBooks =
    selectedCategory === "All Genre"
      ? books
      : books.filter((book) => book.category === selectedCategory.toLowerCase());

  if (isLoading) return <div className="h-96 flex items-center justify-center">Loading books...</div>;

  return (
    <div id="top-sellers" className="py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-4xl font-black text-secondary mb-4">Top Sellers</h2>
          <p className="text-slate-500">Discover our most popular titles across all genres</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg shadow-orange-500/30"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <Swiper
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 40 },
          1280: { slidesPerView: 3, spaceBetween: 40 },
        }}
        modules={[Pagination, Navigation]}
        className="pb-16"
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <SwiperSlide key={book._id || index}>
              <div className="px-2">
                <BookCard book={book} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="py-20 text-center text-slate-400 font-medium">No books found in this category</div>
        )}
      </Swiper>
    </div>
  );
}
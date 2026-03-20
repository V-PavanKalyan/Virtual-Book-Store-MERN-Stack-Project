import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl.js';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

export default function BookCard({ book }) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="premium-card p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/5 hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-[140px] flex-shrink-0 relative group overflow-hidden rounded-xl bg-slate-50 shadow-inner">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={getImgUrl(book.coverImage)}
                            alt={book.title}
                            className="w-full h-[180px] sm:h-[190px] object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-secondary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <FiEye className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                         {book.category}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                        <Link to={`/books/${book._id}`}>
                            <h3 className="text-lg font-black text-secondary hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight">
                                {book.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-4 leading-relaxed italic">
                            {book.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-secondary">${book.newPrice}</span>
                            {book.oldPrice && (
                                <span className="text-sm text-slate-300 font-bold line-through">${book.oldPrice}</span>
                            )}
                        </div>

                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary w-full !py-3 !text-xs !font-black uppercase tracking-widest flex items-center justify-center gap-2 group relative overflow-hidden active:scale-95 transition-all"
                        >
                            <FiShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
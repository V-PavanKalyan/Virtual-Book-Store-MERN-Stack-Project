import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery, useAddReviewMutation } from "../../redux/features/books/booksApi";
import { FiShoppingCart, FiStar, FiCalendar, FiTag, FiUser } from "react-icons/fi";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SingleBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const [addReview] = useAddReviewMutation();

  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      Swal.fire("Error", "Please login to add a review", "error");
      return;
    }
    try {
      await addReview({
        id,
        user: currentUser.email,
        comment: reviewComment,
        rating: reviewRating
      }).unwrap();
      setReviewComment("");
      Swal.fire("Success", "Review added successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to add review", "error");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );
  if (isError) return <div className="text-center py-20 text-red-500 font-bold">Error loading book details...</div>;
  if (!book) return <div className="text-center py-20">Book not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image */}
        <div className="sticky top-28">
          <div className="premium-card p-4 bg-white">
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title}
              className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {book?.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <FiStar className="fill-current" />
                <span className="text-sm font-bold">{book?.rating || "New"}</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-secondary leading-tight mb-4">
              {book?.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-500 text-sm border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2">
                <FiUser className="text-primary" />
                <span>By admin</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-primary" />
                <span>{new Date(book?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTag className="text-primary" />
                <span className="capitalize">{book?.category}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-secondary">Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {book?.description}
            </p>
          </div>

          <div className="flex items-center gap-8 py-6 border-y border-slate-100">
            <div className="flex flex-col">
              <span className="text-slate-400 text-sm mb-1">Current Price</span>
              <span className="text-4xl font-black text-primary">${book?.newPrice}</span>
            </div>
            {book?.oldPrice && (
              <div className="flex flex-col opacity-50">
                <span className="text-slate-400 text-sm mb-1">Old Price</span>
                <span className="text-2xl font-bold line-through">${book?.oldPrice}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleAddToCart(book)}
              className="btn-primary flex-1 !py-4 flex items-center justify-center gap-3 text-lg"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span>Add to Shopping Cart</span>
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-20 pt-12 border-t border-slate-100">
            <h2 className="text-3xl font-bold text-secondary mb-10">Customer Reviews</h2>
            
            <div className="space-y-8 mb-16">
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((rev, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-secondary">{rev.user}</h4>
                        <p className="text-xs text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, idx) => (
                          <FiStar key={idx} className={idx < rev.rating ? "fill-current" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No reviews yet. Be the first to share your thoughts!</p>
              )}
            </div>

            {/* Add Review Form */}
            {currentUser && (
              <div className="premium-card p-8 bg-slate-50/50">
                <h3 className="text-xl font-bold text-secondary mb-6">Leave a Review</h3>
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Your Rating</label>
                    <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setReviewRating(num)}
                          className={`p-2 rounded-lg transition-all ${reviewRating >= num ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          <FiStar className={`w-6 h-6 ${reviewRating >= num ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Your Comment</label>
                    <textarea
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you think about this book?"
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none min-h-[120px]"
                    />
                  </div>
                  <button type="submit" className="btn-primary !px-10">
                    Post My Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
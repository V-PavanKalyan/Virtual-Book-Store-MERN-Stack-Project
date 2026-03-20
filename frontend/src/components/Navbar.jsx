import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";
import { getImgUrl } from "../utils/getImgUrl";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks = searchQuery.trim() === "" 
    ? [] 
    : books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <nav className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center gap-6 md:gap-12">
          <Link to="/" className="text-secondary hover:text-primary transition-colors flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Virtual <span className="text-primary font-black">Book Store</span></h1>
          </Link>
          
          <div className="relative group hidden sm:block" ref={searchRef}>
            <IoSearchOutline className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-primary' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search library..."
              className="bg-slate-100/50 w-72 lg:w-96 py-2.5 pl-11 pr-4 rounded-xl border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium"
            />
            
            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white shadow-2xl rounded-2xl p-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                {filteredBooks.length > 0 ? (
                  <div className="space-y-1">
                    {filteredBooks.map(book => (
                      <Link
                        key={book._id}
                        to={`/books/${book._id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <img src={getImgUrl(book.coverImage)} alt="" className="w-10 h-14 object-cover rounded-md flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-secondary truncate">{book.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{book.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-400 text-sm font-medium">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
             {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={currentUser?.photoURL || avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-all p-0.5"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl p-2 z-50 border border-slate-100 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-semibold truncate text-secondary">{currentUser?.email}</p>
                    </div>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button 
                      onClick={handleLogOut}
                      className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/50 rounded-xl transition-colors font-black uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-2 text-slate-600 hover:text-primary transition-colors">
                <HiOutlineUser className="w-6 h-6" />
              </Link>
            )}

            <button className="p-2 text-slate-600 hover:text-rose-500 transition-colors hidden lg:block">
              <LuHeart className="w-6 h-6" />
            </button>
          </div>

          <Link
            to="/cart"
            className="btn-primary !px-5 !py-2.5 !rounded-full flex items-center gap-2.5 shadow-amber-600/20"
          >
            <HiOutlineShoppingCart className="w-5 h-5" />
            <span className="text-sm font-black">{cartItems.length}</span>
          </Link>

          <button className="sm:hidden p-2 text-slate-600">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
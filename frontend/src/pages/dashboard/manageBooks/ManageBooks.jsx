import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2';
import { getImgUrl } from '../../../utils/getImgUrl';

export default function ManageBooks() {
    const { data: books, refetch, isLoading } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDeleteBook = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteBook(id).unwrap();
                Swal.fire('Deleted!', 'The book has been removed.', 'success');
                refetch();
            } catch (error) {
                console.error('Failed to delete book:', error);
                if (error.status === 403 || error.status === 401 || error.message?.includes('403') || error.message?.includes('401')) {
                    Swal.fire('Session Expired', 'Your admin session has expired. Please log in again.', 'error');
                    localStorage.removeItem('token');
                    window.location.href = "/admin";
                } else {
                    Swal.fire('Error', 'Failed to delete book. Please try again.', 'error');
                }
            }
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Inventory Management</h1>
                    <p className="text-slate-500 font-medium">Manage and update your book catalog</p>
                </div>
                <Link to="/dashboard/add-new-book" className="btn-primary !py-3 !px-6 flex items-center gap-2 shadow-lg shadow-amber-600/20 hover:scale-105 transition-transform">
                    <FiPlus />
                    <span>Add New Publication</span>
                </Link>
            </div>

            <div className="premium-card bg-white overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">#</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Book Details</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Price</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {books && books.map((book, index) => (
                                <tr key={book._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6 text-sm font-bold text-slate-300">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-14 bg-slate-100 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                                                <img src={getImgUrl(book.coverImage)} alt={book.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-secondary truncate max-w-[200px]">{book.title}</p>
                                                <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">ID: {book._id.slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-secondary">
                                        ${book.newPrice.toFixed(2)}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link 
                                                to={`/dashboard/edit-book/${book._id}`} 
                                                className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                title="Edit Book"
                                            >
                                                <FiEdit className="w-5 h-5" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                                                title="Delete Book"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
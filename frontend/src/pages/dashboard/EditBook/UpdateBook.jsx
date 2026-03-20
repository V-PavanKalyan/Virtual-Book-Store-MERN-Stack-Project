import { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { FiEdit3, FiSave, FiArrowLeft } from "react-icons/fi";

export default function UpdateBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData?.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            setValue('coverImage', bookData.coverImage)
        }
    }, [bookData, setValue])

    const onSubmit = async (data) => {
        const updatedBookData = {
            ...data,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
        };
        
        try {
            await updateBook({ id, ...updatedBookData }).unwrap();
            Swal.fire({
                title: "Revision Successful",
                text: "The book details have been updated in the master registry.",
                icon: "success",
                confirmButtonColor: "#6366f1",
            });
            await refetch();
            navigate("/dashboard/manage-books");
        } catch (error) {
            console.error("Failed to update book:", error);
            Swal.fire("Update Error", "Could not synchronize changes with the server.", "error");
        }
    }

    if (isLoading) return <Loading />
    if (isError) return (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-red-500 font-bold">Master record not found or inaccessible.</p>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
                >
                    <FiArrowLeft />
                    <span>Back to Registry</span>
                </button>
            </div>

            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <FiEdit3 className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">Edit Publication</h1>
                <p className="text-slate-500 max-w-md mx-auto">Modify the existing record for <span className="text-secondary font-bold">"{bookData?.title}"</span></p>
            </div>

            <div className="premium-card p-10 bg-white shadow-2xl shadow-slate-200/50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <InputField
                                label="Publication Title"
                                name="title"
                                placeholder="Enter book title"
                                register={register}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputField
                                label="Abstract / Description"
                                name="description"
                                placeholder="Enter book description"
                                type="textarea"
                                register={register}
                            />
                        </div>

                        <SelectField
                            label="Genre / Category"
                            name="category"
                            options={[
                                { value: '', label: 'Select Genre' },
                                { value: 'business', label: 'Business & Finance' },
                                { value: 'technology', label: 'Technology & AI' },
                                { value: 'fiction', label: 'Literary Fiction' },
                                { value: 'horror', label: 'Horror & Suspense' },
                                { value: 'adventure', label: 'Action & Adventure' },
                            ]}
                            register={register}
                        />

                        <div className="flex items-end pb-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register('trending')}
                                    className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary transition-all"
                                />
                                <span className="text-sm font-bold text-slate-600 group-hover:text-secondary transition-colors">Featured in Trending</span>
                            </label>
                        </div>

                        <InputField
                            label="Baseline Price ($)"
                            name="oldPrice"
                            type="number"
                            placeholder="0.00"
                            register={register}
                        />

                        <InputField
                            label="Current Offer ($)"
                            name="newPrice"
                            type="number"
                            placeholder="0.00"
                            register={register}
                        />

                        <div className="md:col-span-2">
                            <InputField
                                label="Cover Resource URL"
                                name="coverImage"
                                type="text"
                                placeholder="https://resource-link.com/image.jpg"
                                register={register}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="btn-primary w-full !py-4 text-lg flex items-center justify-center gap-3 shadow-xl shadow-amber-600/20 hover:scale-[1.01] transition-all disabled:opacity-70"
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Synchronizing...</span>
                            </>
                        ) : (
                            <>
                                <FiSave className="w-6 h-6" />
                                <span>Commit Changes</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
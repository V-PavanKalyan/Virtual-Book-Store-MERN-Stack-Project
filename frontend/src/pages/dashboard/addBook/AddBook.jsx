import { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import { FiUploadCloud, FiBook, FiCheckCircle } from "react-icons/fi";

export default function AddBook() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, { isLoading }] = useAddBookMutation();
    const [imageFileName, setimageFileName] = useState('');

    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName || "placeholder.jpg", // Default placeholder
            newPrice: Number(data.newPrice),
            oldPrice: Number(data.oldPrice),
        }
        
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book Catalog updated",
                text: "Your new masterpiece has been successfully uploaded.",
                icon: "success",
                confirmButtonColor: "#6366f1",
            });
            reset();
            setimageFileName('')
            setimageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to add book. Please try again.", "error");
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <FiBook className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">Add New Publication</h1>
                <p className="text-slate-500 max-w-md mx-auto">Expand your digital library by providing the details of the new book below.</p>
            </div>

            <div className="premium-card p-10 bg-white shadow-2xl shadow-slate-200/50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                            <InputField
                                label="Book Title"
                                name="title"
                                placeholder="e.g. The Art of Digital Wisdom"
                                register={register}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputField
                                label="Description"
                                name="description"
                                placeholder="Brief summary of the book content..."
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
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        {...register('trending')}
                                        className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary transition-all"
                                    />
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-secondary transition-colors">Mark as Trending</span>
                            </label>
                        </div>

                        <InputField
                            label="Original Price ($)"
                            name="oldPrice"
                            type="number"
                            placeholder="0.00"
                            register={register}
                        />

                        <InputField
                            label="Sale Price ($)"
                            name="newPrice"
                            type="number"
                            placeholder="0.00"
                            register={register}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-secondary uppercase tracking-widest ml-1">Cover Imagery</label>
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 group-hover:border-primary transition-all bg-slate-50/50 group-hover:bg-primary/5">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary shadow-sm transition-colors">
                                    <FiUploadCloud className="w-6 h-6" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-secondary">{imageFileName || "Click or drag to upload cover"}</p>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full !py-4 text-lg flex items-center justify-center gap-3 shadow-xl shadow-amber-600/20 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:grayscale"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Uploading Mastery...</span>
                            </>
                        ) : (
                            <>
                                <FiCheckCircle className="w-6 h-6" />
                                <span>Publish Publication</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

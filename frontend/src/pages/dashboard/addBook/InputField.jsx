import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, error }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-secondary uppercase tracking-widest ml-1">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    {...register(name, { required: true })}
                    className={`w-full bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-3 px-4 text-secondary font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none min-h-[120px]`}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    {...register(name, { required: true })}
                    className={`w-full bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-3 px-4 text-secondary font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none`}
                    placeholder={placeholder}
                />
            )}
            {error && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{label} is required</p>}
        </div>
    );
};

export default InputField;
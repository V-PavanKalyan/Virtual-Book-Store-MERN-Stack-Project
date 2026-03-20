import React from 'react';

const SelectField = ({ label, name, options, register, error }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-secondary uppercase tracking-widest ml-1">
                {label}
            </label>
            <select
                {...register(name, { required: true })}
                className={`w-full bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-3 px-4 text-secondary font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{label} is required</p>}
        </div>
    );
};

export default SelectField;
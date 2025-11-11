import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[15px] font-medium text-gray-900 mb-3">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full min-h-[48px] px-4 py-3.5 rounded-xl border-2
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-emerald-500'}
            bg-white text-gray-900 text-[17px]
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-all
            placeholder:text-gray-400
            shadow-sm
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-[15px] text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-[15px] text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

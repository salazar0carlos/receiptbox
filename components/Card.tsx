import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'shadow';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'medium',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow',
    bordered: 'bg-white border-2 border-gray-100 hover:border-gray-200 transition-colors',
    shadow: 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow',
  };

  const paddingStyles = {
    none: 'p-0',
    small: 'p-6',
    medium: 'p-8',
    large: 'p-12',
  };

  return (
    <div
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

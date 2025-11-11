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
    default: 'bg-white shadow-sm',
    bordered: 'bg-white border border-gray-200',
    shadow: 'bg-white shadow-md',
  };

  const paddingStyles = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={`rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

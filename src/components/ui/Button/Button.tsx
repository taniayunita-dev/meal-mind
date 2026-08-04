import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: ReactNode;

}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-hover',
    danger: 'bg-error text-white hover:bg-red-700',
    ghost: 'bg-transparent text-text border border-border hover:bg-gray-50',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-caption px-sm py-1',
    md: 'text-body px-md py-2',
    lg: 'text-body px-lg py-3',
};

const Spinner = () => {
    return <svg
        className="animate-spin h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>;
};

const Button = ({ variant = 'primary', size = 'md', isLoading = false, disabled, className, children, ...props }: ButtonProps) => {
    const isDisabled = disabled || isLoading;
    return (
        <button
            className={clsx(
                'rounded font-medium transition-colors duration-150',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={isDisabled}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span>Memproses...</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
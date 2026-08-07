// src/components/ui/Input/Input.tsx

import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, errorMessage, hint, className, id, ...rest }, ref) => {
        const generatedId = useId();
        const inputId = id ?? generatedId;
        const errorId = `${inputId}-error`;
        const hintId = `${inputId}-hint`;
        const hasError = Boolean(errorMessage);

        return (
            <div className="flex flex-col gap-1">
                <label htmlFor={inputId} className="text-caption font-medium text-text">
                    {label}
                </label>

                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full rounded border px-3 py-2 text-body text-text bg-surface',
                        'transition-colors duration-150',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                        hasError ? 'border-error' : 'border-border',
                        'disabled:bg-gray-100 disabled:cursor-not-allowed',
                        className
                    )}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? errorId : hint ? hintId : undefined}
                    {...rest}
                />

                {hint && !hasError && (
                    <p id={hintId} className="text-caption text-text-muted">
                        {hint}
                    </p>
                )}

                {hasError && (
                    <p id={errorId} role="alert" className="text-caption text-error flex items-center gap-1">
                        <ErrorIcon />
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

function ErrorIcon() {
    return (
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
            />
        </svg>
    );
}
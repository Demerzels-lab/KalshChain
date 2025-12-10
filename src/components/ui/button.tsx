import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Added: tracking-wide, shadow-sm, slightly more rounded
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide',
  {
    variants: {
      variant: {
        // High-tech Primary: Gradient + Shadow + Hover Lift
        default: 'bg-gradient-to-r from-cyan-primary-600 to-cyan-primary-500 text-white shadow-lg shadow-cyan-primary-500/25 hover:shadow-cyan-primary-500/40 hover:-translate-y-0.5 border border-cyan-primary-400/20',
        
        // Semantic Actions
        yes: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5',
        no: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5',
        
        // Technical Outline
        outline: 'border border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-slate-50 text-slate-700 hover:border-cyan-primary-300 hover:text-cyan-primary-700',
        
        ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900',
        link: 'text-cyan-primary-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
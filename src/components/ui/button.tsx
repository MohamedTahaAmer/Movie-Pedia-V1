import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-foreground disabled:pointer-events-none dark:focus:ring-offset-foreground',
	{
		variants: {
			variant: {
				default: 'bg-foreground text-background hover:bg-foreground',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'bg-background text-foreground hover:bg-background outline outline-1 outline-background',
				subtle: 'hover:bg-background bg-background text-foreground',
				ghost:
					'bg-transparent hover:bg-background text-foreground data-[state=open]:bg-transparent data-[state=open]:bg-transparent',
				transparent:
					'hover:bg-transparent focus:ring-transparent focus:ring-offset-0',
				link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-foreground dark:text-background hover:bg-transparent dark:hover:bg-transparent',
			},
			size: {
				default: 'h-10 py-2 px-4',
				sm: 'h-9 px-2 rounded-md',
				xs: 'h-8 px-1.5 rounded-sm',
				lg: 'h-11 px-8 rounded-md',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, isLoading, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
				{children}
			</button>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
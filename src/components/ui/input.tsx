import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
	'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: '',
				underLine:
					'relative z-20 h-12 rounded-none shadow-shadow/10 dark:shadow-shadow/30 border-0 border-b-2 border-foreground bg-background shadow-sm focus-visible:ring-transparent   group-data-[state=error]:border-red-500',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input, inputVariants };

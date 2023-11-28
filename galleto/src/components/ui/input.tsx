import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex text-black h-10 w-full rounded-md border border-secondary bg-background px-3 py-2 text-sm ring-offset placeholder:text-[#1C020C]/60 focus:ring-1 focus:ring-primary focus:border-secondary',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };

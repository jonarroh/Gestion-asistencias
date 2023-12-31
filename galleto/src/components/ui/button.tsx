import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-black hover:bg-primary/80',
				destructive:
					'bg-secondary/60 text-black text-bold hover:bg-secondary/50',
				middle: 'bg-secondary/50 text-black hover:bg-secondary/40',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-primary-foreground hover:border-primary',
				outline_primary:
					'border border-primary bg-secondary hover:bg-[#FF8300]/70 hover:text-accent-foreground text-black hover:border-primary',
				secondary: 'bg-secondary/80 text-black hover:bg-secondary/70',
				ghost:
					'hover:bg-primary hover:text-accent-foreground text-primary-foreground',
				link: 'text-primary underline-offset-4 hover:underline text-primary-foreground'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				selectorFunction: 'h-[80px] w-[80px] rounded-lg',
				selector: 'h-[200px] w-[200px] rounded-full',
				selector2: 'h-[75px] w-[75px] rounded-full'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };

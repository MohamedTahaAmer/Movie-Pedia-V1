import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { EditMovieForm } from './components/EditMovieForm';

const Page = async ({}: {}) => {
	return (
		<>
			<div className='mx-auto max-w-[700px] p-10 '>
				<Link
					href='/'
					className={cn(buttonVariants({ variant: 'ghost' }), 'my-10')}
				>
					<ChevronLeft className='mr-2 h-4 w-4' />
					Home
				</Link>
				<EditMovieForm />
			</div>
		</>
	);
};

export default Page;
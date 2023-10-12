import { getMovie } from '@/actions/actions.movie';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditMovieForm } from './components/EditMovieForm';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Page = async ({
	params: { movieId },
}: {
	params: { movieId: string };
}) => {
	// console.log(movieId);
	// return <div>page</div>;
	const movie = await getMovie(movieId);
	// if (!movie) return null;
	if (!movie) return notFound();
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
				<EditMovieForm movie={movie} />
			</div>
		</>
	);
};

export default Page;

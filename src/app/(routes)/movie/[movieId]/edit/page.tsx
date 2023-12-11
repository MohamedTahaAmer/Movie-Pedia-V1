import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { EditMovieForm } from './_components/EditMovieForm';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { isUUID } from '@/lib/utils/funtions';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
const Page = async ({
	params: { movieId = '' },
}: {
	params: { movieId?: string };
}) => {
	if (!isUUID(movieId)) redirect('/');
	// const movie = await getMovie(movieId);
	const movie = await db.movie.findUnique({
		where: {
			id: movieId,
		},
	});
	if (!movie) return notFound();
	return (
		<>
			<div className='mx-auto max-w-[700px] p-2 sm:p-4 md:p-10'>
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

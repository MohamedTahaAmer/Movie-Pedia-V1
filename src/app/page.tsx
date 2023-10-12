import { getAllMovies } from '@/actions/actions.movie';
import { MovieClient } from '@/components/table/client';

const MoviesPage = async () => {
	const movies = await getAllMovies();
	const csvData = movies.map((movie) => ({
		...movie,
		duration: movie.duration.toFixed(2),
		rating: movie.rating.toFixed(2),
		createddAt: undefined,
		updatedAt: undefined,
	}));
	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<MovieClient data={csvData} />
			</div>
		</div>
	);
};

export default MoviesPage;

'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { generalErrors } from '@/lib/errorMessages';
import { z } from 'zod';
import { movieValidator, updateMovieValidator } from '@/lib/validators/movie';
import { fromZodError } from 'zod-validation-error';

type createMoviePops = {
	name: string;
	duration: number;
	rating: number;
};

export async function createMovie({ name, duration, rating }: createMoviePops) {
	try {
		movieValidator.parse({ name, duration, rating });
		const movie = await db.movie.create({
			data: {
				name,
				rating,
				duration,
			},
		});
		revalidatePath('/');
		return movie;
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			const validationError = fromZodError(error);
			return new Response(validationError.message);
		}
		throw new Error(generalErrors.someWentWrong);
	}
}

type updateMoviePops = {
	id: string;
	name: string;
	duration: number;
	rating: number;
};

export async function updateMovie({
	name,
	duration,
	rating,
	id,
}: updateMoviePops) {
	try {
		updateMovieValidator.parse({ name, duration, rating, id });
		const movie = await db.movie.update({
			where: { id },
			data: {
				name,
				rating,
				duration,
			},
		});
		revalidatePath('/');
		return movie;
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			const validationError = fromZodError(error);
			return new Response(validationError.message);
		}
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function deleteMovie(id: string) {
	try {
		const movie = await db.movie.delete({ where: { id } });
		revalidatePath('/');
		return movie;
	} catch (error: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function getMovie(id: string) {
	try {
		const movie = await db.movie.findUnique({
			where: {
				id,
			},
		});
		revalidatePath('/');
		return movie;
	} catch (error: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function getAllMovies() {
	try {
		const movies = await db.movie.findMany({});
		revalidatePath('/');
		return movies;
	} catch (error: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function getMoviesByName(name: string) {
	try {
		const movies = await db.movie.findMany({
			where: {
				name: {
					mode: 'insensitive',
					// contains: name,
					// equals: name,
					startsWith: name,
				},
			},
		});
		revalidatePath('/');
		return movies;
	} catch (error: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

type getMoviesByRatingProps = {
	min: number;
	max: number;
};
export async function getMoviesByRating({ min, max }: getMoviesByRatingProps) {
	try {
		const movies = await db.movie.findMany({
			where: {
				rating: { gt: min, lt: max },
			},
		});
		revalidatePath('/');
		return movies;
	} catch (error: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

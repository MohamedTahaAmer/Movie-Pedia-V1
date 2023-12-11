import { z } from 'zod';

const regex = /^\d+(\.\d+)?[mh]$/;
export const movieValidator = z.object({
	name: z.string().min(2).max(100),
	duration: z
		.string()
		.regex(regex, { message: 'Follow This Format: 120.2m || 2.4h' }),
	rating: z.number().gte(0).lte(10),
});

export type MovieValidator = z.infer<typeof movieValidator>;

export const updateMovieValidator = z.object({
	name: z.string().min(2).max(100),
	duration: z
		.string()
		.regex(regex, { message: 'Follow This Format: 120.2m || 2.4h' }),
	rating: z.number().gte(0).lte(10),
	id: z.string(),
});

export const updateMovieValidatorBackEnd = z.object({
	name: z.string().min(2).max(100),
	duration: z.number().gte(0).lte(12),

	rating: z.number().gte(0).lte(10),
	id: z.string(),
});

export const movieValidatorBackEnd = z.object({
	name: z.string().min(2).max(100),
	duration: z.number().gte(0).lte(12),
	rating: z.number().gte(0).lte(10),
});

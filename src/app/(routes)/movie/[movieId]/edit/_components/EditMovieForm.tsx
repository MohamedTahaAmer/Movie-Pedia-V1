'use client';

import { updateMovie } from '@/actions/actions.movie';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { MovieValidator, movieValidator } from '@/lib/validators/movie';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Movie } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function EditMovieForm({ movie }: { movie: Movie }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<MovieValidator>({
		resolver: zodResolver(movieValidator),
		defaultValues: {
			...movie,
			duration: +movie.duration.toFixed(2) + 'h',
			rating: +movie.rating.toFixed(2),
		},
	});

	const handleUpdateMovie = async (
		movie: Pick<Movie, 'name' | 'duration' | 'rating' | 'id'>,
	) => {
		console.log('in');
		try {
			setLoading(true);
			await updateMovie(movie);
			toast({ title: 'Movie Updated Successfully.' });
			router.push('/');
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Update Movie</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((e) => {
						const rating = +e.rating.toFixed(2);

						const unite = e.duration.slice(-1);
						const userDuration = +e.duration.slice(0, -1);
						let duration = +userDuration.toFixed(2);
						if (unite === 'm') {
							duration = userDuration / 60;
						}

						if (duration <= 0) {
							toast({
								variant: 'destructive',
								title: `The Movie Duration Can't Be 0 Or Less`,
							});
							return;
						}
						if (duration > 12) {
							toast({
								variant: 'destructive',
								title: `The Movie Duration Can't Be Longer Than 12H`,
							});
							return;
						}
						return handleUpdateMovie({
							...e,
							id: movie.id,
							duration,
							rating,
						});
					})}
				>
					<CardContent className='flex flex-col items-stretch justify-center gap-14'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem
									className={`group relative duration-500 ${
										form.formState.errors.name && '-translate-y-1/3 '
									}`}
									data-state={`${form.formState.errors.name && 'error'}`}
								>
									<FormLabel className='duration-500'>Name</FormLabel>

									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='Name'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='duration'
							render={({ field }) => (
								<FormItem
									className={`group relative duration-500 ${
										form.formState.errors.duration && '-translate-y-1/3 '
									}`}
									data-state={`${form.formState.errors.duration && 'error'}`}
								>
									<FormLabel className='duration-500'>Duration</FormLabel>

									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='120m || 2h'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='rating'
							render={({ field }) => (
								<FormItem
									className={`group relative duration-500 ${
										form.formState.errors.rating && '-translate-y-1/3 '
									}`}
									data-state={`${form.formState.errors.rating && 'error'}`}
								>
									<FormLabel className='duration-500'>Rating</FormLabel>

									<FormControl>
										<Input
											type='number'
											variant='underLine'
											disabled={loading}
											placeholder='Movie Rating'
											{...field}
											onChange={(event) =>
												field.onChange(
													event.target.value && +event.target.value,
												)
											}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className='mt-4 flex items-center justify-center'>
						<Button isLoading={loading} type='submit'>
							Submit
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

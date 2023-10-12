'use client';

import {
	ClipboardEditIcon as Edit,
	Loader2,
	MoreHorizontal,
	Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { toast } from '@/hooks/use-toast';
import { deleteMovie } from '@/actions/actions.movie';
import { FormatedMovie } from '@/Types';

interface CellActionProps {
	data: FormatedMovie;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleDelete = async (id: string) => {
		try {
			setLoading(true);
			await deleteMovie(id);
			toast({ title: 'Movei Deleted Successfully.' });
			router.refresh();
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='subtle' className='h-8 w-8 rounded-full p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => router.push(`/movie/${data.id}/edit`)}
					>
						<div className='flex items-center justify-center gap-2'>
							<Edit className=' h-4 w-4' /> Edit
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleDelete(data.id)}>
						<div className='flex items-center justify-center gap-4'>
							<button className='flex items-center justify-center gap-2 hover:cursor-pointer'>
								<Trash className='h-4 w-4' /> Delete
							</button>
							<div>
								{loading ? (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								) : null}
							</div>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

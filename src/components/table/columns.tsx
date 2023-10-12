'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { CellAction } from './cell-action';
import { FormatedMovie } from '@/Types';
import { useState } from 'react';

const RatingHeader = ({ column }: { column: any }) => {
	const [buttonClicks, setButtonClicks] = useState(0);
	const handleButtonClick = () => {
		if (buttonClicks === 0) {
			column.toggleSorting(true);
			setButtonClicks(1);
		} else if (buttonClicks === 1) {
			column.toggleSorting(false);
			setButtonClicks(2);
		} else if (buttonClicks === 2) {
			column.clearSorting();
			setButtonClicks(0);
		}
	};
	return (
		<Button className='pl-0 ' variant='transparent' onClick={handleButtonClick}>
			Rating
			{buttonClicks === 0 && <ArrowUpDown className='ml-2 h-4 w-4' />}
			{buttonClicks === 1 && <ArrowUp className='ml-2 h-4 w-4' />}
			{buttonClicks === 2 && <ArrowDown className='ml-2 h-4 w-4' />}
		</Button>
	);
};
export const columns: ColumnDef<FormatedMovie>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'duration',
		header: 'Duration (h)',
	},
	{
		accessorKey: 'rating',
		header: RatingHeader,
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];

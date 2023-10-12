'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { FormatedMovie } from '@/Types';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Download } from '../Download';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<FormatedMovie, TValue>[];
	data: FormatedMovie[];
	searchKey: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			sorting,
		},
	});

	return (
		<div>
			<div className='flex flex-wrap items-center justify-between'>
				<div className='flex items-center py-4'>
					<Input
						placeholder='Search'
						value={
							(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn(searchKey)?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>

					<Select
						onValueChange={(e) => {
							table.setPageSize(+e);
						}}
						defaultValue='10'
					>
						<SelectTrigger className='ml-4 w-[180px]'>
							<SelectValue placeholder='Show 10' />
						</SelectTrigger>
						<SelectContent>
							{[1, 2, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={'' + pageSize}>
									Show {pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex-1 py-4'>
					<div className='flex justify-end gap-4'>
						<Link
							href='/movie/create'
							className={cn(buttonVariants({ variant: 'default' }))}
						>
							<PlusCircle className='mr-2 h-4 w-4' />
							Add
						</Link>
						<Download data={data} />
					</div>
				</div>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className='grid-auto' key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className='h-fit p-0 px-4' key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className='grid-auto'
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='truncate p-0 px-4' key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className='grid-auto'>
								<TableCell className='flex h-full items-center justify-center bg-background p-0 font-medium '>
									<div>No results.</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='transparent'
					size='sm'
					onClick={table.previousPage}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant='transparent'
					size='sm'
					onClick={table.nextPage}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}

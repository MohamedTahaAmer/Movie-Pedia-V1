'use client';

import { DownloadCloudIcon, Table, Text } from 'lucide-react';
import CsvDownloader from 'react-csv-downloader';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FormatedMovie } from '@/Types';
import { cn } from '@/lib/utils';

interface DownloadProps {
	data: FormatedMovie[];
}

export const Download: React.FC<DownloadProps> = ({ data }) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='default'>
						<span className='sr-only'>Open menu</span>
						<DownloadCloudIcon className='mr-2 h-4 w-4' />
						Download
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem>
						<div className='flex items-center justify-center gap-2 pt-4'>
							<CsvDownloader
								filename='MovieList'
								extension='.csv'
								separator=';'
								wrapColumnChar="'"
								datas={data}
								className={cn(
									buttonVariants({ variant: 'default' }),
									'flex items-center justify-center gap-2 hover:cursor-pointer',
								)}
							>
								<Table className=' h-4 w-4' />
								CSV
							</CsvDownloader>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className='flex items-center justify-center gap-4'>
							<CsvDownloader
								filename='MovieList'
								extension='.txt'
								separator=';'
								wrapColumnChar="'"
								datas={data}
								className={cn(
									buttonVariants({ variant: 'default' }),
									'flex items-center justify-center gap-2 hover:cursor-pointer',
								)}
							>
								<Text className='h-4 w-4' />
								TXT
							</CsvDownloader>
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

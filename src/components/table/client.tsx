'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns } from './columns';
import { FormatedMovie } from '@/Types';

interface MovieClientProps {
	data: FormatedMovie[];
}

export const MovieClient: React.FC<MovieClientProps> = ({ data }) => {
	return (
		<>
			<Heading
				title={`Movies Pedia `}
				description={`Welcome to the Movies DB: (${data.length}) Movie`}
			/>
			<Separator />
			<DataTable searchKey='name' columns={columns} data={data} />
		</>
	);
};

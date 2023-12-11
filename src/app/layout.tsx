import { Toaster } from '@/components/ui/toaster';
import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import ThemeToggleInLine from '@/components/ThemeToggleInLine';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MoviePedia',
	description: 'A Movie Library',
	icons: '/favicon.svg',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<div className='absolute right-4 top-4'>
						<ThemeToggleInLine />
					</div>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}

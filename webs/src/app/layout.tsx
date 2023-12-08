import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'UTL - Control Escolar',
	description: 'Control Escolar',
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<Head>
				<link rel="icon" href="/webs/public/android-chrome-192x192.png" />
			</Head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}

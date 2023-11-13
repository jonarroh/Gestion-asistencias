import type { MetaFunction } from '@remix-run/node';
import { Link, useRouteError } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' }
	];
};

export default function Index() {
	return (
		<div
			style={{
				fontFamily: 'system-ui, sans-serif',
				lineHeight: '1.8'
			}}>
			<h1 className="text-4xl text-center text-red-500">
				Welcome to Remix
			</h1>
			<ul>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/blog"
						rel="noreferrer">
						15m Quickstart Blog Tutorial
					</a>
				</li>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/jokes"
						rel="noreferrer">
						Deep Dive Jokes App Tutorial
					</a>
				</li>
				<li>
					<Link to="/about" className="text-blue-500">
						About Pages
					</Link>
				</li>
			</ul>
		</div>
	);
}

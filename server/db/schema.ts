import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { type } from 'os';

export const movies = sqliteTable('movies', {
	id: integer('id').primaryKey(),
	title: text('name'),
	releaseYear: integer('release_year')
});

export const actors = sqliteTable('actors', {
	id: integer('id').primaryKey(),
	name: text('name'),
	comment: text('comment', { mode: 'json' }).$type<type>(),
	birthdate: text('birthdate'),
	movieId: integer('movie_id').references(() => movies.id)
});

// enum roles 'actor' 'director'
type roles = 'actor' | 'director';
interface type {
	type: roles;
	name: string;
}

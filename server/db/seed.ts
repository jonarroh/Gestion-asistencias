import { db } from './db';
import * as schema from './schema';

await db.insert(schema.movies).values([
	{
		title: 'The Matrix',
		releaseYear: 1999
	},

	{
		title: 'The Matrix Reloaded',
		releaseYear: 2003
	},

	{
		title: 'The Matrix Revolutions',
		releaseYear: 2003
	}
]);

await db.insert(schema.actors).values([
	{
		name: 'Keanu Reeves',
		comment: { type: 'actor', name: 'Keanu Reeves' },
		birthdate: '1964-09-02',
		movieId: 1
	},
	{
		name: 'Laurence Fishburne',
		comment: { type: 'actor', name: 'Laurence Fishburne' },
		birthdate: '1961-07-30',
		movieId: 1
	},
	{
		comment: { type: 'director', name: 'Lana Wachowski' },
		name: 'Lana Wachowski',
		birthdate: '1965-06-21',
		movieId: 1
	}
]);

console.log('Movies seeded');

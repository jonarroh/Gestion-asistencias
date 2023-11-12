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
	},
	{
		comment: { type: 'director', name: 'Lilly Wachowski' },
		name: 'Lilly Wachowski',
		birthdate: '1967-12-29',
		movieId: 1
	},
	{
		name: 'Carrie-Anne Moss',
		comment: { type: 'actor', name: 'Carrie-Anne Moss' },
		birthdate: '1967-08-21',
		movieId: 1
	},
	{
		name: 'Hugo Weaving',
		comment: { type: 'actor', name: 'Hugo Weaving' },
		birthdate: '1960-04-04',
		movieId: 1
	},
	{
		name: 'Emil Eifrem',
		comment: { type: 'actor', name: 'Emil Eifrem' },
		birthdate: '1978-12-21',
		movieId: 1
	},
	{
		name: 'Hugo Weaving',
		comment: { type: 'actor', name: 'Hugo Weaving' },
		birthdate: '1960-04-04',
		movieId: 2
	},
	{
		name: 'Keanu Reeves',
		comment: { type: 'actor', name: 'Keanu Reeves' },
		birthdate: '1964-09-02',
		movieId: 2
	},
	{
		name: 'Laurence Fishburne',
		comment: { type: 'actor', name: 'Laurence Fishburne' },
		birthdate: '1961-07-30',
		movieId: 2
	},
	{
		name: 'Carrie-Anne Moss',
		comment: { type: 'actor', name: 'Carrie-Anne Moss' },
		birthdate: '1967-08-21',
		movieId: 2
	},
	{
		name: 'Lana Wachowski',
		comment: { type: 'director', name: 'Lana Wachowski' },
		birthdate: '1965-06-21',
		movieId: 2
	}
]);

console.log('Movies seeded');

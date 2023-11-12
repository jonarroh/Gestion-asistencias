import fs from 'node:fs';
import * as path from 'node:path'; // Corrección aquí
import { execSync } from 'node:child_process';

// borrar la carpeta drizzle
const pathDrizzleFolder = path.join(process.cwd(), 'drizzle');
if (fs.existsSync(pathDrizzleFolder)) {
	fs.rmSync(pathDrizzleFolder, { recursive: true });
}
//borrar el archivo ../db/sqlite.db

const pathSqliteFile = path.join(process.cwd(), '../db/sqlite.db');
if (fs.existsSync(pathSqliteFile)) {
	fs.rmSync(pathSqliteFile);
}

migrateDB();

function migrateDB() {
	// ejecutar el comando de migración
	execSync('bunx drizzle-kit generate:sqlite --schema db/schema.ts');
	execSync('bun run db/migrate.ts');
	execSync('bun run db/seed.ts');
}

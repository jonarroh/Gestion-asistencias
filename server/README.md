# inicializar base de datos

```bash
bunx drizzle-kit generate:sqlite --schema db/schema.ts
bun run migrate.ts
bun run seed.ts
```

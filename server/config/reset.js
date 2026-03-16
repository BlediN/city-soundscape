import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
	ssl: {
		rejectUnauthorized: false
	}
})

const createTables = async () => {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS locations (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			slug TEXT NOT NULL UNIQUE,
			address TEXT NOT NULL,
			city TEXT NOT NULL,
			state TEXT NOT NULL,
			zip TEXT NOT NULL,
			image TEXT NOT NULL,
			description TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS events (
			id SERIAL PRIMARY KEY,
			location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
			title TEXT NOT NULL,
			description TEXT NOT NULL,
			genre TEXT NOT NULL,
			image TEXT NOT NULL,
			event_date TIMESTAMPTZ NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`)
}
try {
	await createTables()
	console.log('Database schema ready. No sample data inserted.')
} catch (error) {
	console.error('Database schema setup failed.', error)
	process.exitCode = 1
} finally {
	await pool.end()
}

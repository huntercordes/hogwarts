// read values from .env file
import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

export default pool;
// This file sets up a connection pool to the PostgreSQL database using the 'pg' library. It reads the database connection string from the .env file and exports the pool for use in other parts of the application.

import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
});

// Initialize Drizzle ORM with the PostgreSQL pool
export const db = drizzle(pool);

// Define the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
});

// Define the food table
export const food = pgTable("food", {
    id: serial("id").primaryKey(),
    name: text("name"),
    stock: integer("stock"),
    price: integer("price"),
    image: text("image"),   
    userId: text("user_id").references(() => users.email),
});

// Connectivity check function
const checkDatabaseConnection = async () => {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      console.log('Connected to the database:', res.rows[0].now);
      client.release();
    } catch (err) {
      console.error('Database connection error:', err);
    }
};
  
checkDatabaseConnection();
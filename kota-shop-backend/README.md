## TO run the server

```bash
npm start
```

## Features

- **Food Inventory Management**: Add, update, and delete food items.
- **Dashboard**: Display current inventory levels.
- **User Authentication**: Registration and login system.
- **PostgreSQL Database (Amazon RDS)**: Integrated with PostgreSQL on Amazon RDS for reliable data storage.
- **Image Storage (Amazon S3)**: Images of food items are stored securely using Amazon S3.


# Postgresql Commands for Table

## Users table

```SQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT
);
```

## Invetory table
```SQL
CREATE TABLE food (id SERIAL PRIMARY KEY, name TEXT NOT NULL, stock INTEGER NOT NULL,price INTEGER NOT NULl, image TEXT NOT NULL, user_email TEXT NOT NULL,FOREIGN KEY (user_email) REFERENCES users(email) );
```

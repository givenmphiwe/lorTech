## TO run the server

```bash
npm start
```

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


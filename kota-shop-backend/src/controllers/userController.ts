//src/controllers/userController.ts
import { Context } from 'hono';
import { db, users } from '../db';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// Register user
export const registerUser = async (c: Context) => {
    try {
      const rawBody = await c.req.text();
      console.log('Received body:', rawBody);
  
      const { email, password } = JSON.parse(rawBody);
  
      if (!email || !password) {
        return c.json({ message: 'Email and password are required' }, 400);
      }
  
      // Check if the email already exists in the database
      const existingUser = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
  
      if (existingUser.length > 0) {
        return c.json({ message: 'User already exists' }, 409); // Conflict
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await db.insert(users)
        .values({ email, password: hashedPassword })
        .execute();
  
      return c.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return c.json({ message: 'Invalid JSON input' }, 400);
    }
  };


const JWT_SECRET = '70cd94f8bbcd28771a7f604d9c9a2b211105127d81e06255b16ae4bfd93b66cc183b9d5ef63150fa4175c95b25d4fd59c4beb3bafe05094144ff05cb478538e2';

// Login user with JWT
export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json();

  const user = await db.select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return c.json({ message: 'User not found' }, 404);
  }

  // Check if the stored password is not null and validate it
  const storedPassword = user[0].password;
  if (storedPassword && (await bcrypt.compare(password, storedPassword))) {
    
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return token and success message
    return c.json({ message: 'Login successful', token });
  } else {
    return c.json({ message: 'Invalid credentials' }, 401);
  }
};
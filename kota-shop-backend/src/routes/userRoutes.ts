
import { Hono } from 'hono';
import { registerUser, loginUser } from '../controllers/userController';

const userRoutes = new Hono();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

export { userRoutes };

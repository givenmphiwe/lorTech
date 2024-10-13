import { Hono } from 'hono';
import { addFood, updateFood, deleteFood, getFoodItems } from '../controllers/foodControllers';

const foodRoutes = new Hono();

foodRoutes.post('/add/:userId', addFood);         
foodRoutes.put('/update/:userId/:id', updateFood); 
foodRoutes.delete('/delete/:userId/:id', deleteFood); 
foodRoutes.get('/:userId', getFoodItems); 

export { foodRoutes };



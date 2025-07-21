import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
import restaurantRoutes from './Routes/restaurant.routes.js';
import cors from 'cors';
app.use(cors({
  origin: ["http://localhost:5173", "127.0.0.1:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Restaurant Useful API')
})

// Use the restaurant routes
app.use('/api/v1/restaurants', restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
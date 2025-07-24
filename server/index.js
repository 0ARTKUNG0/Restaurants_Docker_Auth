import express from 'express'
import dotenv from 'dotenv'
import restaurantRoutes from './Routes/restaurant.routes.js';
import authRoutes from './Routes/auth.routes.js';
import cors from 'cors';
import db from './model/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "127.0.0.1:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const initializeDatabase = async () => {
  try {
    // Sync all models and create tables
    // Set force: false in production or when you want to preserve data
    // await db.sequelize.sync({ force: false }); // Changed from true to false
    // console.log("Database synchronized");

    // Check if roles already exist before creating
    const Role = db.Role;
      // Only create roles if none exist
      await Role.bulkCreate([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" }
      ]);
      console.log("Default roles created");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

app.get('/', (req, res) => {
  res.send('Restaurant Useful API')
});

// Use the routes
app.use('/api/v1/restaurants', restaurantRoutes);
app.use("/api/auth", authRoutes);

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
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
    const Role = db.Role;
    
    // Check existing roles
    const existingRoles = await Role.findAll();
    const roleNames = existingRoles.map(role => role.name);

    // Define default roles
    const defaultRoles = ["user", "moderator", "admin"];
    
    // Filter out roles that don't exist yet
    const rolesToCreate = defaultRoles.filter(role => !roleNames.includes(role));

    if (rolesToCreate.length > 0) {
      await Role.bulkCreate(rolesToCreate.map(name => ({ name })));
      console.log("Created missing roles:", rolesToCreate);
    } else {
      console.log("All default roles already exist");
    }
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
import restaurantController from '../controllers/restaurant.controllers.js';
import express from 'express';
const router = express.Router();
//POST http://localhost:5000/api/v1/restaurants
router.post('/', restaurantController.restaurantCreate);

//GET http://localhost:5000/api/v1/restaurants
router.get('/', restaurantController.getAllRestaurants);

export default router;
import restaurantController from '../controllers/restaurant.controllers.js';
import authMiddleware from '../middleware/authjwt.js';

import express from 'express';
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurants
router.post('/', authMiddleware.verifytoken, restaurantController.restaurantCreate);

//GET http://localhost:5000/api/v1/restaurants - Public access
router.get('/', restaurantController.getAllRestaurants);

//GET http://localhost:5000/api/v1/restaurants/:id - Public access
router.get('/:id', restaurantController.getRestaurantById);

//PUT http://localhost:5000/api/v1/restaurants/:id - Moderator or Admin only
router.put('/:id', authMiddleware.verifytoken, authMiddleware.ModOrAdmin, restaurantController.UpdateRestaurant);

//DELETE http://localhost:5000/api/v1/restaurants/:id - Admin only
router.delete('/:id', authMiddleware.verifytoken, authMiddleware.isAdmin, restaurantController.deleteRestaurant);

export default router;
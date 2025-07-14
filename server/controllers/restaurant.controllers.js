import Restaurant from '../model/restaurant.model.js';
const restaurantController = {};

// Create and Save a new Restaurant
 restaurantController.restaurantCreate = async (req, res) => {
        const { title, type, img } = req.body;
        // Validate input
        if (!title || !type || !img) {
            return res.status(400).send({ message: "All fields are required" });
        }
        await Restaurant.findOne({ where: { name: title } })
            .then(async (restaurant) => {
                if (restaurant) {
                    return res.status(400).send({ message: "Restaurant already exists" });
                }
                const newRestaurant = {
                    name: title,
                    type: type,
                    imageURL: img
                };
                Restaurant.create(newRestaurant).then((data) => {
                    res.send((data));
                }
                ).catch((error) => {
                    res.status(500).send({ message: error.message || "Some error occurred while creating the Restaurant." });
                });
            })};
// Get all Restaurants
restaurantController.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving restaurants." });
    }
};

export default restaurantController;

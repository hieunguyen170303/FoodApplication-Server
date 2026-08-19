import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { SearchController } from "../controllers/searchController";

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Fetch food category list
 *     tags: [Restaurants & Food]
 *     responses:
 *       200:
 *         description: List of food categories
 */
router.get("/categories", RestaurantController.getCategories);

/**
 * @openapi
 * /api/search:
 *   get:
 *     summary: Search foods and restaurants by keyword and category
 *     tags: [Restaurants & Food]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered list of foods and restaurants
 */
router.get("/search", SearchController.search);

/**
 * @openapi
 * /api/restaurants:
 *   get:
 *     summary: Fetch restaurants with optional category and search filter
 *     tags: [Restaurants & Food]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered list of restaurants
 */
router.get("/restaurants", RestaurantController.getRestaurants);

/**
 * @openapi
 * /api/restaurants/{id}:
 *   get:
 *     summary: Fetch detailed restaurant info, menu sections, and option groups
 *     tags: [Restaurants & Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: r2
 *     responses:
 *       200:
 *         description: Restaurant details & customizable menu
 */
router.get("/restaurants/:id", RestaurantController.getRestaurantById);

export default router;

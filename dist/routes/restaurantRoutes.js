"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantController_1 = require("../controllers/restaurantController");
const searchController_1 = require("../controllers/searchController");
const router = (0, express_1.Router)();
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
router.get("/categories", restaurantController_1.RestaurantController.getCategories);
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
router.get("/search", searchController_1.SearchController.search);
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
router.get("/restaurants", restaurantController_1.RestaurantController.getRestaurants);
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
router.get("/restaurants/:id", restaurantController_1.RestaurantController.getRestaurantById);
exports.default = router;

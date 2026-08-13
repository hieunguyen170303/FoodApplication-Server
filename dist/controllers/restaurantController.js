"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurantService_1 = require("../services/restaurantService");
class RestaurantController {
    static async getCategories(req, res) {
        try {
            const categories = await restaurantService_1.RestaurantService.getCategories();
            res.status(200).json({ success: true, data: categories });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getRestaurants(req, res) {
        try {
            const { category, search } = req.query;
            const restaurants = await restaurantService_1.RestaurantService.getRestaurants(category, search);
            res.status(200).json({ success: true, data: restaurants });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getRestaurantById(req, res) {
        try {
            const { id } = req.params;
            const detail = await restaurantService_1.RestaurantService.getRestaurantDetail(id);
            res.status(200).json({ success: true, data: detail });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.RestaurantController = RestaurantController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const restaurantService_1 = require("../services/restaurantService");
class SearchController {
    static async search(req, res) {
        try {
            const { q, category } = req.query;
            const queryStr = q || "";
            const categoryStr = category || "";
            const result = await restaurantService_1.RestaurantService.searchFoodsAndStores(queryStr, categoryStr);
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.SearchController = SearchController;

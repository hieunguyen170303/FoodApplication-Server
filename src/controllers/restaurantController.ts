import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurantService";

export class RestaurantController {
  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await RestaurantService.getCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const { category, search } = req.query;
      const restaurants = await RestaurantService.getRestaurants(
        category as string,
        search as string
      );
      res.status(200).json({ success: true, data: restaurants });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const detail = await RestaurantService.getRestaurantDetail(id);
      res.status(200).json({ success: true, data: detail });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

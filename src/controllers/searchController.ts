import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurantService";

export class SearchController {
  static async search(req: Request, res: Response): Promise<void> {
    try {
      const { q, category } = req.query;
      const queryStr = (q as string) || "";
      const categoryStr = (category as string) || "";

      const result = await RestaurantService.searchFoodsAndStores(queryStr, categoryStr);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

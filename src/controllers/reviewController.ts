import { Request, Response } from "express";
import { ReviewService } from "../services/reviewService";

export class ReviewController {
  static async createReview(req: Request, res: Response): Promise<void> {
    try {
      const {
        orderId,
        storeName,
        restaurantRating,
        restaurantComment,
        restaurantTags,
        driverName,
        shipperRating,
        shipperComment,
        shipperTags,
        tipAmount,
      } = req.body;

      if (!orderId || !restaurantRating || !shipperRating) {
        res.status(400).json({
          success: false,
          error: "Vui lòng cung cấp mã đơn hàng (orderId), điểm đánh giá quán và điểm đánh giá tài xế!",
        });
        return;
      }

      const review = await ReviewService.createReview({
        orderId,
        storeName,
        restaurantRating,
        restaurantComment,
        restaurantTags,
        driverName,
        shipperRating,
        shipperComment,
        shipperTags,
        tipAmount,
      });

      res.status(201).json({
        success: true,
        message: "Gửi đánh giá đơn hàng thành công!",
        review,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getReview(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const review = await ReviewService.getReviewByOrderId(orderId);
      res.status(200).json({ success: true, review });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

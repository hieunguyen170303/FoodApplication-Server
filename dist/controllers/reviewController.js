"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviewService_1 = require("../services/reviewService");
class ReviewController {
    static async createReview(req, res) {
        try {
            const { orderId, storeName, restaurantRating, restaurantComment, restaurantTags, driverName, shipperRating, shipperComment, shipperTags, tipAmount, } = req.body;
            if (!orderId || !restaurantRating || !shipperRating) {
                res.status(400).json({
                    success: false,
                    error: "Vui lòng cung cấp mã đơn hàng (orderId), điểm đánh giá quán và điểm đánh giá tài xế!",
                });
                return;
            }
            const review = await reviewService_1.ReviewService.createReview({
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
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getReview(req, res) {
        try {
            const { orderId } = req.params;
            const review = await reviewService_1.ReviewService.getReviewByOrderId(orderId);
            res.status(200).json({ success: true, review });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.ReviewController = ReviewController;

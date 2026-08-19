"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const supabase_1 = require("../config/supabase");
let mockOrderReviews = {};
class ReviewService {
    static async createReview(dto) {
        const reviewId = `rev_${Date.now()}`;
        const reviewData = {
            id: reviewId,
            order_id: dto.orderId,
            user_id: dto.userId || null,
            store_name: dto.storeName || "Nhà hàng",
            restaurant_rating: dto.restaurantRating,
            restaurant_comment: dto.restaurantComment || "",
            restaurant_tags: dto.restaurantTags || [],
            driver_name: dto.driverName || "Tài xế",
            shipper_rating: dto.shipperRating,
            shipper_comment: dto.shipperComment || "",
            shipper_tags: dto.shipperTags || [],
            tip_amount: dto.tipAmount || 0,
            created_at: new Date().toISOString(),
        };
        // Save in local memory store
        mockOrderReviews[dto.orderId] = reviewData;
        console.log("⭐ Order Review Created for Order:", dto.orderId, reviewData);
        // Complete order in OrderService memory store so backend GET /api/orders/active clears it
        try {
            const { OrderService } = require("./orderService");
            OrderService.completeLiveOrder(dto.orderId);
        }
        catch (e) {
            console.warn("Could not complete live order in OrderService:", e);
        }
        // Try persisting to Supabase order_reviews table
        try {
            await supabase_1.supabaseAdmin.from("order_reviews").insert(reviewData);
        }
        catch (e) {
            console.warn("Supabase order_reviews insert async log");
        }
        return reviewData;
    }
    static async getReviewByOrderId(orderId) {
        if (mockOrderReviews[orderId]) {
            return mockOrderReviews[orderId];
        }
        try {
            const { data } = await supabase_1.supabaseAdmin
                .from("order_reviews")
                .select("*")
                .eq("order_id", orderId)
                .single();
            return data;
        }
        catch {
            return null;
        }
    }
}
exports.ReviewService = ReviewService;

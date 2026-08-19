import { supabaseAdmin } from "../config/supabase";

export interface CreateReviewDTO {
  orderId: string;
  userId?: string;
  storeName?: string;
  restaurantRating: number;
  restaurantComment?: string;
  restaurantTags?: string[];
  driverName?: string;
  shipperRating: number;
  shipperComment?: string;
  shipperTags?: string[];
  tipAmount?: number;
}

let mockOrderReviews: { [orderId: string]: any } = {};

export class ReviewService {
  static async createReview(dto: CreateReviewDTO) {
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
    } catch (e) {
      console.warn("Could not complete live order in OrderService:", e);
    }

    // Try persisting to Supabase order_reviews table
    try {
      await supabaseAdmin.from("order_reviews").insert(reviewData);
    } catch (e) {
      console.warn("Supabase order_reviews insert async log");
    }

    return reviewData;
  }

  static async getReviewByOrderId(orderId: string) {
    if (mockOrderReviews[orderId]) {
      return mockOrderReviews[orderId];
    }

    try {
      const { data } = await supabaseAdmin
        .from("order_reviews")
        .select("*")
        .eq("order_id", orderId)
        .single();
      return data;
    } catch {
      return null;
    }
  }
}

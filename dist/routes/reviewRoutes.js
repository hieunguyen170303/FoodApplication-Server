"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/reviews:
 *   post:
 *     summary: Submit a new order review for restaurant and shipper
 *     tags: [Reviews & Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, restaurantRating, shipperRating]
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: ORD-9821
 *               storeName:
 *                 type: string
 *                 example: Jollibee - EC Nguyễn Du
 *               restaurantRating:
 *                 type: integer
 *                 example: 5
 *               restaurantComment:
 *                 type: string
 *                 example: Món ăn ngon tuyệt, đóng gói cẩn thận!
 *               restaurantTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Ngon miệng", "Đóng gói đẹp", "Nóng hổi"]
 *               driverName:
 *                 type: string
 *                 example: Nguyễn Văn Hùng
 *               shipperRating:
 *                 type: integer
 *                 example: 5
 *               shipperComment:
 *                 type: string
 *                 example: Tài xế thân thiện, giao hàng rất nhanh!
 *               shipperTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Giao nhanh", "Thân thiện"]
 *               tipAmount:
 *                 type: number
 *                 example: 20000
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/reviews", reviewController_1.ReviewController.createReview);
/**
 * @openapi
 * /api/reviews/{orderId}:
 *   get:
 *     summary: Get order review details by order ID
 *     tags: [Reviews & Feedback]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: ORD-9821
 *     responses:
 *       200:
 *         description: Review details or null if unreviewed
 */
router.get("/reviews/:orderId", reviewController_1.ReviewController.getReview);
exports.default = router;

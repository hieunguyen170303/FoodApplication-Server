"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Place a new order from checkout
 *     tags: [Orders & Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [storeName, totalPrice, items]
 *             properties:
 *               storeName:
 *                 type: string
 *                 example: KFC - Tòa Nhà Sora Gardens SC
 *               totalPrice:
 *                 type: number
 *                 example: 79000
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/orders", orderController_1.OrderController.createOrder);
/**
 * @openapi
 * /api/orders/active:
 *   get:
 *     summary: Get live tracking active order progress
 *     tags: [Orders & Tracking]
 *     responses:
 *       200:
 *         description: Active live tracking order
 */
router.get("/orders/active", orderController_1.OrderController.getActiveOrder);
/**
 * @openapi
 * /api/orders/history:
 *   get:
 *     summary: Get past order history list
 *     tags: [Orders & Tracking]
 *     responses:
 *       200:
 *         description: List of completed/cancelled past orders
 */
router.get("/orders/history", orderController_1.OrderController.getOrderHistory);
exports.default = router;

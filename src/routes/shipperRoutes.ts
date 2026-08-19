import { Router } from "express";
import { ShipperController } from "../controllers/shipperController";

const router = Router();

/**
 * @openapi
 * /api/shipper/stats:
 *   get:
 *     summary: Fetch driver earnings and rating stats
 *     tags: [Shipper & Driver]
 *     responses:
 *       200:
 *         description: Shipper daily statistics
 */
router.get("/stats", ShipperController.getStats);

/**
 * @openapi
 * /api/shipper/orders/available:
 *   get:
 *     summary: Fetch unassigned incoming orders available for pickup
 *     tags: [Shipper & Driver]
 *     responses:
 *       200:
 *         description: Available order feed
 */
router.get("/orders/available", ShipperController.getAvailableOrders);

/**
 * @openapi
 * /api/shipper/orders/active:
 *   get:
 *     summary: Fetch active accepted delivery order
 *     tags: [Shipper & Driver]
 *     responses:
 *       200:
 *         description: Active order details
 */
router.get("/orders/active", ShipperController.getActiveOrder);

/**
 * @openapi
 * /api/shipper/orders/{id}/accept:
 *   post:
 *     summary: Accept an available order for delivery
 *     tags: [Shipper & Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order accepted
 */
router.post("/orders/:id/accept", ShipperController.acceptOrder);

/**
 * @openapi
 * /api/shipper/orders/{id}/status:
 *   put:
 *     summary: Update order status (ACCEPTED, PICKED_UP, DELIVERING, COMPLETED)
 *     tags: [Shipper & Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 example: DELIVERING
 *     responses:
 *       200:
 *         description: Status updated & WebSocket broadcast triggered
 */
router.put("/orders/:id/status", ShipperController.updateStatus);

/**
 * @openapi
 * /api/shipper/orders/history:
 *   get:
 *     summary: Fetch delivered orders history
 *     tags: [Shipper & Driver]
 *     responses:
 *       200:
 *         description: Order delivery history
 */
router.get("/orders/history", ShipperController.getHistory);

/**
 * @openapi
 * /api/shipper/messages/{orderId}:
 *   get:
 *     summary: Get chat messages between Shipper & Customer
 *     tags: [Shipper & Driver]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of chat messages
 *   post:
 *     summary: Send a chat message
 *     tags: [Shipper & Driver]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: Tôi đang đến giao cho bạn ạ!
 *     responses:
 *       201:
 *         description: Message sent & broadcasted via WebSocket
 */
router.get("/messages/:orderId", ShipperController.getMessages);
router.post("/messages/:orderId", ShipperController.sendMessage);

export default router;

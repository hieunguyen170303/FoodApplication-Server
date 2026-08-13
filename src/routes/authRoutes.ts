import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user & send 6-digit OTP email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Adrian Hajdin
 *               email:
 *                 type: string
 *                 example: anhpro120593@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: OTP 6-digit email sent successfully
 */
router.post("/register", AuthController.register);

/**
 * @openapi
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify 6-digit OTP email pin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, token]
 *             properties:
 *               email:
 *                 type: string
 *                 example: anhpro120593@gmail.com
 *               token:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Account verified and logged in
 */
router.post("/verify-otp", AuthController.verifyOtp);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in with verified email & password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: anhpro120593@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: User authenticated successfully
 */
router.post("/login", AuthController.login);

export default router;

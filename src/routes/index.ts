import { Router } from "express";
import authRoutes from "./authRoutes";
import restaurantRoutes from "./restaurantRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", restaurantRoutes);
router.use("/", orderRoutes);

export default router;

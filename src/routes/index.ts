import { Router } from "express";
import authRoutes from "./authRoutes";
import restaurantRoutes from "./restaurantRoutes";
import orderRoutes from "./orderRoutes";
import shipperRoutes from "./shipperRoutes";
import reviewRoutes from "./reviewRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shipper", shipperRoutes);
router.use("/", restaurantRoutes);
router.use("/", orderRoutes);
router.use("/", reviewRoutes);

export default router;

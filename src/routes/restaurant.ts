/**
 * project restaurant
 * あの有名なイタリアンレストランを再現
 */
import * as express from "express";
import { RestaurantController } from "../controllers/restaurantController";
export const router = express.Router();

const restaurantController = new RestaurantController();

router.get("/", restaurantController.get);
router.get("/all", restaurantController.getAll);

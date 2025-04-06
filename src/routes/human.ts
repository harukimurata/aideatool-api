/**
 * project human
 * 名前つけたり年齢を設定したり殴って治して
 * 自由にしたらどうなるだろう
 */
import * as express from "express";
import { HumanController } from "../controllers/humanController";
export const router = express.Router();

const humanController = new HumanController();

router.get("/", humanController.get);
router.post("/name", humanController.updateName);
router.post("/age", humanController.updateAge);
router.post("/status", humanController.updateStatus);

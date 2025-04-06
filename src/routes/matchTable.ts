/**
 * 対戦表を作ろう
 */
import * as express from "express";
import { MatchTableController } from "../controllers/matchTableController";
export const router = express.Router();

const matchTableController = new MatchTableController();

router.post("/get", matchTableController.get);
router.post("/create", matchTableController.post);
router.post("/update", matchTableController.update);
router.post("/auth", matchTableController.authCheck);

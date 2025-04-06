import * as express from "express";
import * as matchTable from "./matchTable";
import * as human from "./human";
import * as restaurant from "./restaurant";

export const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});

//project 対戦表
router.use("/matchTable", matchTable.router);
//project human
router.use("/human", human.router);
//project restaurant
router.use("/restaurant", restaurant.router);

import { Response, Request, NextFunction } from "express";
import * as typeGuard from "../helpers/typeGuard";
import {
  RestaurantRequest,
  RestaurantAllResponse,
  RestaurantResponse,
} from "../interfaces/restaurant";
import * as RestaurantService from "../services/restaurantService";

export class RestaurantController {
  /**
   * 商品全取得
   * @param req
   * @param res
   */
  async getAll(req: Request, res: Response) {
    try {
      const result: RestaurantAllResponse = await RestaurantService.getAll();
      res.status(200);
      res.send(result);
    } catch (e) {
      res.status(400);
      res.send({ message: "商品が見つかりませんでした。" });
    }
  }

  /**
   * 商品取得
   * @param req
   * @param res
   */
  async get(req: Request, res: Response) {
    let inputData: RestaurantRequest;
    if (!typeGuard.IsStringNumber(req.query.id)) {
      inputData = {
        id: Number(req.query.id),
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値を確認してください。" });
      return;
    }

    try {
      const result: RestaurantResponse = await RestaurantService.getById(
        inputData.id
      );
      res.status(200);
      res.send(result);
    } catch (e) {
      res.status(400);
      res.send({ message: "商品が見つかりませんでした。" });
    }
  }
}

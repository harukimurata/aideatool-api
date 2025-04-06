import { Response, Request, NextFunction } from "express";
import * as typeGuard from "../helpers/typeGuard";
import {
  HumanFullResponse,
  HumanNameUpdateRequest,
  HumanNameResponse,
  HumanAgeUpdateRequest,
  HumanAgeResponse,
  HumanStatusRequest,
  HumanStatusResponse,
  COMMAND,
} from "../interfaces/human";
import * as HumanService from "../services/humanService";

const MAXLENGTH = 20;
const MAXAGE = 1000;

export class HumanController {
  /**
   * 名前、年齢、ステータスを取得
   * @param req
   * @param res
   */
  async get(req: Request, res: Response) {
    try {
      const result: HumanFullResponse = await HumanService.getHumanData();
      res.status(200);
      res.send(result);
    } catch (e) {
      res.status(400);
      res.send({ message: "データの取得に失敗しました。" });
    }
  }

  /**
   * 名前更新
   * @param req
   * @param res
   * @returns
   */
  async updateName(req: Request, res: Response) {
    const body = req.body as HumanNameUpdateRequest;
    //作成に必要なデータの確認
    if (!body.name) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let inputData: HumanNameUpdateRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsString(body.name) &&
      typeGuard.IsMaxLength(body.name, MAXLENGTH)
    ) {
      inputData = {
        name: body.name,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      const result: HumanNameResponse = await HumanService.updateHumanName(
        inputData.name
      );
      res.status(200);
      res.send(result);
    } catch (e: any) {
      res.status(400);
      res.send({ message: "更新に失敗しました。" });
    }
  }

  /**
   * 年齢更新
   * @param req
   * @param res
   * @returns
   */
  async updateAge(req: Request, res: Response) {
    const body = req.body as HumanAgeUpdateRequest;
    //作成に必要なデータの確認
    if (!body.age) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let inputData: HumanAgeUpdateRequest;
    //パラメータの型チェック
    if (typeGuard.IsNumber(body.age) && typeGuard.IsMax(body.age, MAXAGE)) {
      inputData = {
        age: body.age,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      const result: HumanAgeResponse = await HumanService.updateHumanAge(
        inputData.age
      );
      res.status(200);
      res.send(result);
    } catch (e: any) {
      res.status(400);
      res.send({ message: "更新に失敗しました。" });
    }
  }

  /**
   * ステータス更新
   * @param req
   * @param res
   * @returns
   */
  async updateStatus(req: Request, res: Response) {
    const body = req.body as HumanStatusRequest;

    //作成に必要なデータの確認
    if (!body.command) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let inputData: HumanStatusRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsNumber(body.command) &&
      typeGuard.IsMin(body.command, COMMAND.HARDHIT) &&
      typeGuard.IsMax(body.command, COMMAND.HEAL)
    ) {
      inputData = {
        command: body.command,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      const result: HumanStatusResponse = await HumanService.updateHumanStatus(
        inputData.command
      );
      res.status(200);
      res.send(result);
    } catch (e: any) {
      res.status(400);
      res.send({ message: "更新に失敗しました。" });
    }
  }
}

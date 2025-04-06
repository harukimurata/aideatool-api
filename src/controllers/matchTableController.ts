import { NextFunction, Request, Response } from "express";
import * as typeGuard from "../helpers/typeGuard";
import { MatchTableOrderEntity } from "../interfaces/enttiry/matchTableOrder";
import { MatchTableResultEntity } from "../interfaces/enttiry/matchTableResult";
import {
  MatchTableCreateRequest,
  MatchTableData,
  MatchTableUpdateRequest,
  MathTableGetRequest,
  MathTableAuthCheckRequest,
} from "../interfaces/matchTable";
import { ConflictError } from "../interfaces/my-error";
import * as MatchTableService from "../services/matchTableService";

const TITLE_MAXLENGTH = 30;
const MATCHID_MAXLENGTH = 30;
const PASSWORD_MAXLENGTH = 30;

export class MatchTableController {
  /**
   * 大会情報作成
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as MatchTableCreateRequest;
    //作成に必要なデータの確認
    if (!body.title || !body.match_id || !body.password || !body.player) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let inputData: MatchTableCreateRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsString(body.title) &&
      typeGuard.IsMaxLength(body.title, TITLE_MAXLENGTH) &&
      typeGuard.IsString(body.match_id) &&
      typeGuard.IsMaxLength(body.match_id, MATCHID_MAXLENGTH) &&
      typeGuard.IsString(body.password) &&
      typeGuard.IsMaxLength(body.password, PASSWORD_MAXLENGTH) &&
      typeGuard.IsStringArray(body.player)
    ) {
      inputData = {
        title: body.title,
        match_id: body.match_id,
        password: body.password,
        player: body.player,
        auth_password: body.auth_password,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      await MatchTableService.create(inputData);
      res.status(200);
      res.send({ message: "大会データを作成しました。" });
    } catch (e: any) {
      if (e instanceof ConflictError) {
        res.status(409);
        res.send({ message: "大会データの作成に失敗しました。" });
      }

      res.status(400);
      res.send({ message: e.message });
    }
  }

  /**
   * 大会情報取得
   * @param req
   * @param res
   * @returns
   */
  async get(req: Request, res: Response) {
    const body = req.body as MathTableGetRequest;
    //作成に必要なデータの確認
    if (!body.match_id || !body.password) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    //パラメータの存在チェック
    let requestParm: MathTableGetRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsString(body.match_id) &&
      typeGuard.IsMaxLength(body.match_id, MATCHID_MAXLENGTH) &&
      typeGuard.IsString(body.password) &&
      typeGuard.IsMaxLength(body.password, PASSWORD_MAXLENGTH)
    ) {
      requestParm = {
        match_id: body.match_id,
        password: body.password,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      const result: MatchTableData = await MatchTableService.get(requestParm);
      res.status(200);
      res.send(result);
    } catch (e: any) {
      if (e instanceof ConflictError) {
        res.status(409);
        res.send({ message: "大会データの作成に失敗しました。" });
      }

      res.status(400);
      res.send({ message: e.message });
    }
  }

  /**
   * 大会情報更新
   * @param req
   * @param res
   * @returns
   */
  async update(req: Request, res: Response) {
    const body = req.body as MatchTableUpdateRequest;
    //更新に必要なデータの確認
    if (!body.match_id || !body.matchTableResult || !body.matchTableOrder) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let updateData: MatchTableUpdateRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsString(body.match_id) &&
      typeGuard.IsMaxLength(body.auth_password, PASSWORD_MAXLENGTH) &&
      typeGuard.IsOriginalType<MatchTableResultEntity[]>(
        body.matchTableResult
      ) &&
      typeGuard.IsOriginalType<MatchTableOrderEntity[]>(body.matchTableOrder)
    ) {
      updateData = {
        match_id: body.match_id,
        auth_password: body.auth_password,
        matchTableResult: body.matchTableResult,
        matchTableOrder: body.matchTableOrder,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      await MatchTableService.update(updateData);
      res.status(200);
      res.send({ message: "大会データを更新しました。" });
    } catch (e: any) {
      if (e instanceof ConflictError) {
        res.status(409);
        res.send({ message: "大会データの更新に失敗しました。" });
      }

      res.status(400);
      res.send({ message: e.message });
    }
  }

  /**
   * 認証チェック
   * @param req
   * @param res
   * @returns
   */
  async authCheck(req: Request, res: Response) {
    const body = req.body as MathTableAuthCheckRequest;
    //更新に必要なデータの確認
    if (!body.match_id || !body.auth_password) {
      res.status(400);
      res.send({ message: "パラメータが不正です。" });
      return;
    }

    let authData: MathTableAuthCheckRequest;
    //パラメータの型チェック
    if (
      typeGuard.IsString(body.match_id) &&
      typeGuard.IsMaxLength(body.auth_password, PASSWORD_MAXLENGTH)
    ) {
      authData = {
        match_id: body.match_id,
        auth_password: body.auth_password,
      };
    } else {
      res.status(400);
      res.send({ message: "パラメータの値が不正です。" });
      return;
    }

    try {
      await MatchTableService.authCheck(authData);
      res.status(200);
      res.send({ message: "認証を確認しました。" });
    } catch (e: any) {
      if (e instanceof ConflictError) {
        res.status(409);
        res.send({ message: "認証確認に失敗しました。" });
      }

      res.status(400);
      res.send({ message: e.message });
    }
  }

  /**
   * next(err)を投げるとapp.tsでエラーハンドリングできます。
   * https://expressjs.com/ja/guide/error-handling.html
   */
  errorResponse(req: Request, res: Response, next: NextFunction) {
    next(new Error("エラー発生"));
  }
}

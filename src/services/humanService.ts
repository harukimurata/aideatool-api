import {
  HumanStatusEntity,
  HumanAgeEntity,
  HumanNameEntity,
  HumanCommandLogEntity,
} from "../interfaces/enttiry/human";
import {
  HumanFullResponse,
  HumanAgeResponse,
  HumanNameResponse,
  HumanStatusResponse,
  COMMAND,
} from "../interfaces/human";
import { ConflictError, NotFoundError } from "../interfaces/my-error";
import * as HumanModel from "../models/humanModel";

/**
 * 現在の名前、年齢、ステータスを取得
 * @returns
 */
export async function getHumanData(): Promise<HumanFullResponse> {
  try {
    //優先度が最大値の名前を取得
    const humanName: HumanNameEntity = await HumanModel.getMaxPrioHumanName();
    //優先度が最大値の年齢を取得
    const humanAge: HumanAgeEntity = await HumanModel.getMaxPrioHumanAge();
    //ステータス取得
    const humanStatus: HumanStatusEntity = await HumanModel.getHumanStatus();

    const resData: HumanFullResponse = {
      name: humanName.name,
      age: humanAge.age,
      body: humanStatus.body,
      mental: humanStatus.mental,
    };

    return resData;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

/**
 * 名前の更新
 * @param name
 * @returns
 */
export async function updateHumanName(
  name: string
): Promise<HumanNameResponse> {
  try {
    //名前検索
    const humanNameData = await HumanModel.getHumanName(name);
    if (!humanNameData) {
      //ない場合は新しく作成
      await HumanModel.createHumanName(name, 1);
    } else {
      //ある場合は優先度を加算して更新
      const namePrio = humanNameData.prio + 1;
      await HumanModel.updateHumanName(name, namePrio);
    }
  } catch (e) {
    if (e instanceof ConflictError) {
      throw new ConflictError();
    }
  }

  try {
    //優先度が最大値の名前を取得
    const recode: HumanNameEntity = await HumanModel.getMaxPrioHumanName();
    const resData: HumanNameResponse = {
      name: recode.name,
    };
    return resData;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

/**
 * 年齢の更新
 * @param age
 * @returns
 */
export async function updateHumanAge(age: number): Promise<HumanAgeResponse> {
  try {
    //年齢検索
    const humanAgeData = await HumanModel.getHumanAge(age);
    if (!humanAgeData) {
      //ない場合は新しく作成
      await HumanModel.createHumanAge(age, 1);
    } else {
      //ある場合は優先度を加算して更新
      const agePrio = humanAgeData.prio + 1;
      await HumanModel.updateHumanAge(age, agePrio);
    }
  } catch (e) {
    if (e instanceof ConflictError) {
      throw new ConflictError();
    }
  }

  try {
    //優先度が最大値の年齢を取得
    const recode: HumanAgeEntity = await HumanModel.getMaxPrioHumanAge();
    const resData: HumanAgeResponse = {
      age: recode.age,
    };
    return resData;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

const COMMANDSCORE = {
  HARDHIT: 4,
  HIT: 2,
  CURE: 1,
  HEAL: 2,
};

const HITMENTAL = 2;

/**
 * 身体のステータス更新
 * @param command
 * @returns
 */
export async function updateHumanStatus(
  command: number
): Promise<HumanStatusResponse> {
  try {
    //現在のステータス取得
    const humanStatus: HumanStatusEntity = await HumanModel.getHumanStatus();
    const humanBodyStatusScore = humanStatus.body;
    const humanmentalStatusScore = humanStatus.mental;
    let updateBodyStatusScore, updateMentalStatusScore;

    //現在のコマンド実行数取得
    const commandLog: HumanCommandLogEntity =
      await HumanModel.getHumanCommandLog(command);
    const commandLogScore = commandLog.score;

    //入力コマンドで計算式を分岐
    switch (command) {
      case COMMAND.HARDHIT:
        updateBodyStatusScore = humanBodyStatusScore - COMMANDSCORE.HARDHIT;
        updateMentalStatusScore =
          humanmentalStatusScore - (COMMANDSCORE.HARDHIT + HITMENTAL);
        break;

      case COMMAND.HIT:
        updateBodyStatusScore = humanBodyStatusScore - COMMANDSCORE.HIT;
        updateMentalStatusScore =
          humanmentalStatusScore - (COMMANDSCORE.HARDHIT + HITMENTAL);
        break;

      case COMMAND.CURE:
        updateBodyStatusScore = humanBodyStatusScore + COMMANDSCORE.CURE;
        updateMentalStatusScore = humanmentalStatusScore + 0;
        break;

      case COMMAND.HEAL:
        updateBodyStatusScore = humanBodyStatusScore + COMMANDSCORE.HEAL;
        updateMentalStatusScore = humanmentalStatusScore + COMMANDSCORE.HEAL;
        break;

      default:
        updateBodyStatusScore = humanBodyStatusScore - COMMANDSCORE.HARDHIT;
        updateMentalStatusScore = humanmentalStatusScore - COMMANDSCORE.HARDHIT;
        break;
    }

    //身体のステータス更新
    await HumanModel.updateHumanStatus(
      updateBodyStatusScore,
      updateMentalStatusScore
    );

    const newCommandScore = commandLogScore + 1;
    //コマンド実行数加算
    await HumanModel.updateHumanCommandLog(command, newCommandScore);

    //更新後のステータス取得
    const newHumanStatus: HumanStatusEntity = await HumanModel.getHumanStatus();

    const resData: HumanStatusResponse = {
      body: newHumanStatus.body,
      mental: newHumanStatus.mental,
    };

    return resData;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

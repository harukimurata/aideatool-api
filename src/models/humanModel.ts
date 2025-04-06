import { OkPacket } from "mysql2";
import { dbPool } from "../helpers/db-helper";
import {
  HumanNameEntity,
  HumanAgeEntity,
  HumanStatusEntity,
  HumanCommandLogEntity,
} from "../interfaces/enttiry/human";
import { NotFoundError } from "../interfaces/my-error";

/**
 * 優先度が最大の名前取得
 * @returns
 */
export async function getMaxPrioHumanName() {
  const result: [any, any] = await dbPool.query(
    " SELECT * FROM humanName WHERE prio = (SELECT MAX(prio) FROM humanName);"
  );

  const recode: HumanNameEntity = result[0][0];

  return recode;
}

/**
 * 名前検索
 * @param name
 */
export async function getHumanName(name: string) {
  const result: [any, any] = await dbPool.query(
    "SELECT * FROM humanName WHERE name = ?",
    [name]
  );

  if (result[0].length == 0) {
    return false;
  }

  const recode: HumanNameEntity = result[0][0];
  return recode;
}

/**
 * 人気の名前更新
 * @param name
 * @param prio
 */
export async function updateHumanName(name: string, prio: number) {
  const result: [OkPacket, any] = await dbPool.query(
    "UPDATE humanName SET prio = ? WHERE name = ?",
    [prio, name]
  );

  if (result[0].affectedRows === 0) {
    throw new NotFoundError();
  }
}

/**
 * 名前作成
 * @param name
 * @param prio
 */
export async function createHumanName(name: string, prio: number) {
  await dbPool.query("INSERT INTO humanName (name, prio) values (?, ?)", [
    name,
    prio,
  ]);
}

/**
 * 年齢検索
 * @param age
 */
export async function getHumanAge(age: number) {
  const result: [any, any] = await dbPool.query(
    "SELECT * FROM humanAge WHERE age = ?",
    [age]
  );

  if (result[0].length == 0) {
    return false;
  }

  const recode: HumanAgeEntity = result[0][0];
  return recode;
}

/**
 * 年齢更新
 * @param age
 * @param prio
 */
export async function updateHumanAge(age: number, prio: number) {
  const result: [OkPacket, any] = await dbPool.query(
    "UPDATE humanAge SET prio = ? WHERE age = ?",
    [prio, age]
  );

  if (result[0].affectedRows === 0) {
    throw new NotFoundError();
  }
}

/**
 * 年齢作成
 * @param age
 * @param prio
 */
export async function createHumanAge(age: number, prio: number) {
  await dbPool.query("INSERT INTO humanAge (age, prio) values (?, ?)", [
    age,
    prio,
  ]);
}

/**
 * 優先度が最大の年齢取得
 * @returns
 */
export async function getMaxPrioHumanAge() {
  const result: [any, any] = await dbPool.query(
    " SELECT * FROM humanAge WHERE prio=(SELECT MAX(prio) FROM humanAge);"
  );

  const recode: HumanAgeEntity = result[0][0];
  return recode;
}

/**
 * 身体のスコア取得
 * @returns
 */
export async function getHumanStatus() {
  const result: [any, any] = await dbPool.query(
    "SELECT * FROM humanStatus WHERE id = 1"
  );
  const recode: HumanStatusEntity = result[0][0];
  return recode;
}

/**
 * 身体のスコア更新
 * @param score
 */
export async function updateHumanStatus(body: number, mental: number) {
  const result: [OkPacket, any] = await dbPool.query(
    "UPDATE humanStatus SET body = ?, mental = ? WHERE id = 1",
    [body, mental]
  );

  if (result[0].affectedRows === 0) {
    throw new NotFoundError();
  }
}

/**
 * コマンドログ取得
 * @param command
 * @returns
 */
export async function getHumanCommandLog(command: number) {
  const result: [any, any] = await dbPool.query(
    "SELECT * FROM humanCommandLog WHERE command = ?",
    [command]
  );
  const recode: HumanCommandLogEntity = result[0][0];
  return recode;
}

/**
 * コマンドログ更新
 * @param command
 * @param score
 */
export async function updateHumanCommandLog(command: number, score: number) {
  const result: [OkPacket, any] = await dbPool.query(
    "UPDATE humanCommandLog SET score = ? WHERE command = ?",
    [score, command]
  );

  if (result[0].affectedRows === 0) {
    throw new NotFoundError();
  }
}

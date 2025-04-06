import { OkPacket } from "mysql2";
import { dbPool } from "../helpers/db-helper";
import { RestaurantEntity } from "../interfaces/enttiry/restaurant";

/**
 * 商品を全件取得
 * @returns
 */
export async function getAll() {
  const result: [any, any] = await dbPool.query(
    "SELECT id, name, value FROM restaurant"
  );

  const recode: RestaurantEntity[] = result[0];

  return recode;
}

/**
 * 商品をIDで取得
 * @returns
 */
export async function getById(id: number) {
  const result: [any, any] = await dbPool.query(
    "SELECT * FROM restaurant WHERE id = ?",
    [id]
  );

  const recode: RestaurantEntity = result[0][0];

  return recode;
}

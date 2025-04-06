import { RestaurantEntity } from "../interfaces/enttiry/restaurant";
import {
  RestaurantAllResponse,
  RestaurantResponse,
} from "../interfaces/restaurant";
import { NotFoundError } from "../interfaces/my-error";
import * as RestaurantModel from "../models/restaurantModel";

/**
 * 商品を全件取得
 * @returns
 */
export async function getAll(): Promise<RestaurantAllResponse> {
  try {
    const restaurantProduct: RestaurantEntity[] =
      await RestaurantModel.getAll();

    const resData: RestaurantAllResponse = {
      data: restaurantProduct,
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
 * 商品をIDで取得
 * @returns
 */
export async function getById(id: number): Promise<RestaurantResponse> {
  try {
    const restaurantProduct: RestaurantEntity = await RestaurantModel.getById(
      id
    );

    const resData: RestaurantResponse = {
      id: restaurantProduct.id,
      name: restaurantProduct.name,
      value: restaurantProduct.value,
    };

    return resData;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new NotFoundError();
    }
    throw e;
  }
}

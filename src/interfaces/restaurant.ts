import { RestaurantEntity } from "./enttiry/restaurant";

export interface RestaurantRequest {
  id: number;
}

export interface RestaurantAllResponse {
  data: RestaurantEntity[];
}

export interface RestaurantResponse {
  id: number;
  name: string;
  value: number;
}

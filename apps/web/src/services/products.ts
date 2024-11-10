/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpFactory } from "../factories";
import { ProductDtoOut, ResponsePagination } from "../models";

const baseUrl = "/products";
const http = HttpFactory(baseUrl);

export const getProducts = (params: object) => {
  return http.get<ResponsePagination<ProductDtoOut>>("", params);
};

export const postProduct = (params: object) => {
  return http.post<ProductDtoOut>("", params);
} 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpFactory } from "../factories";
import {
  ProductDetailsDtoOut,
  ProductDtoOut,
  ResponsePagination,
} from "../../shared/models";

const baseUrl = "/products";
const http = HttpFactory(baseUrl);

export const getProducts = (params: object) => {
  return http.get<ResponsePagination<ProductDtoOut>>("", params);
};

export const getProductById = (id: string) => {
  return http.get<ProductDetailsDtoOut>(`${id}`);
};

export const postProduct = (params: object) => {
  return http.post<ProductDtoOut>("", params);
};

export const putProduct = (id: string, params: object) => {
  return http.put<ProductDtoOut>(`${id}`, params);
}

export const deleteProduct = (id: string) => {
  return http.delete(`${id}`);
}
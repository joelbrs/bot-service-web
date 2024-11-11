import { ResponsePagination, TemplateDtoOut } from "../../shared/models";
import { HttpFactory } from "../factories";

const baseUrl = "/template";
const http = HttpFactory(baseUrl);

export const getTemplates = (params: object) => {
  return http.get<ResponsePagination<TemplateDtoOut>>("", params);
};

export const getTemplatebyId = (id: string) => {
  return http.get<TemplateDtoOut>(`${id}`);
}

export const postTemplate = (params: object) => {
  return http.post<TemplateDtoOut>("", params);
};

export const putTemplate = (id: string, params: object) => {
  return http.put<TemplateDtoOut>(`${id}`, params);
}
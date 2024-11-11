import { ResponsePagination, TemplateDtoOut } from "../../shared/models";
import { HttpFactory } from "../factories";

const baseUrl = "/template";
const http = HttpFactory(baseUrl);

export const getTemplates = (params: object) => {
  return http.get<ResponsePagination<TemplateDtoOut>>("", params);
};

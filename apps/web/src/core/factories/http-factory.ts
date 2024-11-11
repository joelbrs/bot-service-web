import { AxiosAdapter, HttpClient } from "../infra";

export const HttpFactory = (baseUrl?: string): HttpClient => {
  return new AxiosAdapter(baseUrl);
};

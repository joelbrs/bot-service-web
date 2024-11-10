import { AxiosAdapter, HttpClient, HttpHandler } from "../infra";

export const HttpFactory = (baseUrl?: string): HttpClient => {
  const adapter = new AxiosAdapter();
  return new HttpHandler(adapter, baseUrl);
};

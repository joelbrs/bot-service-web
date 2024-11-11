import type { HttpClient } from "./http-client";

export class HttpHandler {
  constructor(
    private readonly _client: HttpClient,
    private readonly _baseUrl?: string
  ) {}

  private constructUrl(url: string) {
    if (this._baseUrl) {
      if (url.length) {
        url = url.startsWith("/") ? url : `/${url}`;
        return `${this._baseUrl}/${url}`;
      }
      return this._baseUrl
    }
    return `${url}`;
  }

  async get<T>(url: string, params?: object) {
    return await this._client.get<T>(this.constructUrl(url), params);
  }

  async post<T>(url: string, body?: object) {
    return await this._client.post<T>(this.constructUrl(url), body);
  }

  async put<T>(url: string, body?: object) {
    return await this._client.put<T>(this.constructUrl(url), body);
  }

  async patch<T>(url: string, body?: object) {
    return await this._client.patch<T>(this.constructUrl(url), body);
  }
}

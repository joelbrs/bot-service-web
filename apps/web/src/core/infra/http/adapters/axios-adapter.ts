import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import { HttpClient } from "../http-client";
import axios from "axios";
import { HttpHandler } from "../http-handler";

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true,
};

const $axios: AxiosInstance = axios.create(config);

$axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export class AxiosAdapter extends HttpHandler implements HttpClient {
  private _client: AxiosInstance = $axios;

  async get<T>(url: string, params?: object) {
    const { data } = await this._client.get<T>(this.constructUrl(url), {
      params,
    });
    return data;
  }

  async post<T>(url: string, body?: object): Promise<T> {
    const { data } = await this._client.post<T>(this.constructUrl(url), body);
    return data;
  }

  async put<T>(url: string, body?: object): Promise<T> {
    const { data } = await this._client.put<T>(this.constructUrl(url), body);
    return data;
  }

  async patch<T>(url: string, body?: object): Promise<T> {
    const { data } = await this._client.patch<T>(this.constructUrl(url), body);
    return data;
  }

  async delete(url: string): Promise<void> {
    await this._client.delete(this.constructUrl(url));
  }
}

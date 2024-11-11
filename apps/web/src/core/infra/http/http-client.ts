export interface HttpClient {
  get<T>(url: string, params?: object): Promise<T>;
  post<T>(url: string, body?: object): Promise<T>;
  put<T>(url: string, body?: object): Promise<T>;
  patch<T>(url: string, body?: object): Promise<T>;
  delete(url: string): Promise<void>;
}

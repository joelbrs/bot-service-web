export abstract class HttpHandler {
  constructor(private readonly _baseUrl?: string) {}

  constructUrl(url: string) {
    if (this._baseUrl) {
      if (url.length) {
        return `${this._baseUrl}/${url}`;
      }
      return this._baseUrl;
    }
    return `${url}`;
  }
}

import { queryStringify } from './query-stringify';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: string;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;
export class HTTPTransport {
  get: HTTPMethod = (url, options = { method: Methods.GET }) => {
    return this.request(url + queryStringify(options.data), options);
  };

  put: HTTPMethod = (url, options = { method: Methods.PUT }) => {
    return this.request(url, options);
  };

  post: HTTPMethod = (url, options = { method: Methods.POST }) => {
    return this.request(url, options);
  };

  delete: HTTPMethod = (url, options = { method: Methods.DELETE }) => {
    return this.request(url, options);
  };

  request: HTTPMethod = (url, options) => {
    const { method, data } = options!;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

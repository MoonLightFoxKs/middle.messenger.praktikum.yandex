import { HTTPTransport } from '../utils/HTTP-transport';

export class BaseAPI {
  http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  create?(data: unknown): Promise<unknown>;

  read?(identifier?: string): Promise<unknown>;

  update?(identifier: string, data: unknown): Promise<unknown>;

  delete?(identifier: string): Promise<unknown>;
}

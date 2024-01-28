import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import HTTPTransport from './HTTP-transport.ts';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport('/');
  });

  afterEach(() => {
    requests = [];
  });

  it('get should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('post should send POST request', () => {
    instance.post('/user', { test: 'lalala' });

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('.delete() should send DELETE request', () => {
    instance.delete('/user');

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
});

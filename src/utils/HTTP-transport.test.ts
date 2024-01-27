// import sinon, {
//   SinonFakeXMLHttpRequest,
//   SinonFakeXMLHttpRequestStatic,
// } from 'sinon';
// import { HTTPTransport } from './HTTP-transport.ts';
// import { expect } from 'chai';

// describe('HTTPTransport', () => {
//   let xhr: SinonFakeXMLHttpRequestStatic;
//   let instance: HTTPTransport;
//   let requests: SinonFakeXMLHttpRequest[] = [];

//   beforeEach(() => {
//     xhr = sinon.useFakeXMLHttpRequest();

//     // @ts-expect-error иначе ошибка
//     global.XMLHttpRequest = xhr;

//     xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
//       requests.push(request);
//     };

//     instance = new HTTPTransport('/auth');
//   });

//   afterEach(() => {
//     requests = [];
//   });

//   it('.get() should send GET request', () => {
//     instance.get('/user');

//     const [request] = requests;

//     expect(request.method).to.eq('Get');
//   });
// });

import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport } from './HTTP-transport.ts';
import sinon from 'sinon';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport('/auth');
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
    instance.post('/user', { test: '123' });

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('headers should be Content-type whith application/json', () => {
    instance.post('/user', { test: '123' });

    const [request] = requests;

    expect(JSON.stringify(request.requestHeaders['Content-Type'])).to.include(
      'application/json'
    );
  });

  it('should send body request', () => {
    const expectedData = 'test';

    instance.post('/user', expectedData);

    const [request] = requests;

    expect(request.requestBody).to.eq(`"${expectedData}"`);
  });
});

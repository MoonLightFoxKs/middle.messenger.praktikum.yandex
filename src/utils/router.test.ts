import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './router.ts';
import Block from './block.ts';

const Route = new Router('#app');

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Route.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  it('use() should return Router instance', () => {
    const result = Route.use('/', BlockMock);

    expect(result).to.eq(Route);
  });

  describe('back', () => {
    it('should render a page on history back action', () => {
      Route.use('/', BlockMock).start();

      Route.back();

      expect(getContentFake.callCount).to.eq(3);
    });

    it('should render a page on start', () => {
      Route.use('/', BlockMock).start();

      expect(getContentFake.callCount).to.eq(5);
    });
  });

  describe('forward', () => {
    it('should render a page on history forward action', () => {
      Route.use('/', BlockMock).start();

      Route.forward();

      expect(getContentFake.callCount).to.eq(9);
    });
  });
});

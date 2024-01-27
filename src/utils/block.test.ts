// import esmock from 'esmock';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import type BlockType from './block.ts';

// const eventBusMock = {
//   on: sinon.fake(),
//   emit: sinon.fake(),
// };

// describe('Block', async () => {
//   const { default: Block } = (await esmock('./block', {
//     './event-bus': {
//       EventBus: class {
//         emit = eventBusMock.emit;

//         on = eventBusMock.on;
//       },
//     },
//   })) as { default: typeof BlockType };

//   class ComponentMock extends Block {}

//   it('should fire init event on initialization', () => {
//     new ComponentMock({});

//     expect(eventBusMock.emit.calledWith('init')).to.eq(true);
//   });

//   it('should fire CDU event on props update', () => {
//     const components = new ComponentMock({});

//     components.setProps({ test: 'test' });

//     expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(
//       true
//     );
//   });
// });

import sinon from 'sinon';
import esmock from 'esmock';
import { expect } from 'chai';
import BlockType from './block.ts';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

describe('Block', async () => {
  const { default: Block } = (await esmock('./block.ts', {
    './event-bus.ts': {
      EventBus: class {
        emit = eventBusMock.emit;

        on = eventBusMock.on;
      },
    },
  })) as { default: typeof BlockType };

  class TestBlock extends Block<{ test?: number }> {
    getProps() {
      return this.props;
    }

    render() {
      return document.createDocumentFragment();
    }
  }

  describe('setProps', () => {
    it('should extend props object with passed object', () => {
      const initialProps = { test: 1 };
      const newProps = { test: 2 };
      const expectedProps = Object.assign(initialProps, newProps);

      const testBlock = new TestBlock({}, initialProps);
      testBlock.setProps(newProps);

      expect(JSON.stringify(testBlock.getProps())).to.eq(
        JSON.stringify(expectedProps)
      );
    });
  });

  it('should fire init event on initialization', () => {
    new TestBlock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire CDU event on props update', () => {
    const components = new TestBlock({});

    components.setProps({ test: 1 });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(
      true
    );
  });

  describe('hide', () => {
    it('hide should add class hidden to the element', () => {
      const testBlock = new TestBlock({ tagName: 'div' }, {});
      testBlock.hide();

      expect(testBlock.getContent()!.style.display).to.eq('none');
    });
  });

  describe('show', () => {
    it('should remove class hidden from the element', () => {
      const testBlock = new TestBlock({ tagName: 'div' }, {});
      testBlock.getContent()!.style.display = 'none';

      testBlock.show();

      expect(testBlock.getContent()!.style.display).to.eq('flex');
    });
  });

  describe('init', () => {
    it('should create element with passed tag', () => {
      const testBlock = new TestBlock({ tagName: 'section' }, {});

      expect(testBlock.getContent()!.tagName).to.eq('SECTION');
    });

    it('should add class with passed className', () => {
      const expectedClassName = 'test-class';

      const testBlock = new TestBlock(
        { tagName: 'div', className: expectedClassName },
        {}
      );

      expect(testBlock.getContent()!.className).to.eq(expectedClassName);
    });
  });
});

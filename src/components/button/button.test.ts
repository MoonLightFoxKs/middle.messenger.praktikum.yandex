import { expect } from 'chai';
import { ButtonType } from '../../constants.ts';
import { Button } from './index.ts';

describe('component Button', () => {
  it('should be rendered', () => {
    new Button({
      type: ButtonType.button,
      name: 'test',
    });
  });

  it('should return button in Div', () => {
    const button = new Button({
      type: ButtonType.button,
      name: 'test',
    });
    const element = button.element;

    expect(element).to.be.instanceof(window.HTMLDivElement);
  });
});

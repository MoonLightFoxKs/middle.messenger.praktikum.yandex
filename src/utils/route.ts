import Block from './block.ts';

type RouteProps = {
  rootQuery: string;
};

type Props = Record<string, any>;

type Events = Record<string, () => void>;

export type BlockInheritor = new (
  propsObj: Props | undefined,
  events: Events | undefined
) => InstanceType<typeof Block>;

export class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: RouteProps;

  constructor(pathname: string, view: typeof Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.getContent()?.remove();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({ tagName: 'div' });
    }

    const root = document.querySelector(this._props.rootQuery);

    if (!root) {
      throw new Error('Root not found');
    }

    root.innerHTML = '';
    root.appendChild(this._block.getContent()!);
  }
}

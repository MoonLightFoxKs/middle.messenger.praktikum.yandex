import Block from './block.ts';
import { Route } from './route.ts';
import AuthController from '../api/controllers/auth.ts';
import ChatsController from '../api/controllers/chat.ts';

export class Router {
  private static __instance: Router;

  private _currentRoute: Route | null;

  private _rootQuery?: string;

  private _routes: Route[];

  private _history: History;

  constructor(rootQuery?: string) {
    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery || '#app',
    });
    this._routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    console.log(route);

    if (!route) {
      route = this.getRoute('/404');
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route!;

    if (['/messenger', '/settings'].find((el) => el === pathname)) {
      AuthController.getUser()
        .then(() => {
          if (pathname === '/messenger') {
            ChatsController.getChats().then(() => route!.render());
          } else {
            route!.render();
          }
        })
        .catch((e) => {
          alert(e);
          route = this.getRoute('/');
          window.location.pathname = '/';
          this._currentRoute!.leave();
          this._currentRoute = route!;

          route!.render();
        });
    } else {
      route!.render();
    }
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}

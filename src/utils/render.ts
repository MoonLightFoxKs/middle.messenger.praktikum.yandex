import { AuthPage } from "../pages/auth";

const ROUTES = {
  auth: AuthPage,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();
  root.append(page.getContent()!);
  page.dispatchComponentDidMount();
}

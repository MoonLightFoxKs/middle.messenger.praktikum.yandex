import { Error404 } from "../pages/404";
import { Error500 } from "../pages/500";
import { AuthPage } from "../pages/auth";
import { ChatPage } from "../pages/chat";
import { ProfilePage } from "../pages/profile";

const ROUTES = {
  auth: AuthPage,
  error500: Error500,
  error404: Error404,
  profile: ProfilePage,
  chat: ChatPage,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();
  root.append(page.getContent()!);
  page.dispatchComponentDidMount();
}

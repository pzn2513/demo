// src/hooks.server.js
import { redirect } from "@sveltejs/kit";
// import kit from "@ghini/kit/dev";
// kit.xconsole();
const PROTECTED_ROUTES = ["/admin", "/dashboard", "/user"];
export const handle = async ({ event, resolve }) => {
  const { url, request } = event;
  if (PROTECTED_ROUTES.some((route) => url.pathname.startsWith(route))) {
    // 轻验证,不用去请求后端,给正常用户正常处理路径
    const session = event.cookies.get("auth_token");
    if (!session) {
      throw redirect(303, "/auth/signin");
    }
  }
  // 3. 继续处理请求
  const response = await resolve(event);
  return response;
};

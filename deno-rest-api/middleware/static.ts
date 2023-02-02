import { RouterContext, send } from "https://deno.land/x/oak@v11.1.0/mod.ts";

async function serveStatic(ctx: RouterContext, next: () => Promise<unknown>) {

const { pathname } = ctx.request.url

    try {
      await send(ctx, pathname, {
        root: `${Deno.cwd()}/static`,
      });
    } catch {
      await next()
    }
  }

export { serveStatic }



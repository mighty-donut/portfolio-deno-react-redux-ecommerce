import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { verifyToken } from "../utils/token.ts";
import { Customer } from "../data/types.ts";

const JWT_SECRET: string = Deno.env.get("JWT_SECRET");

async function authenticate(ctx: RouterContext, next: () => Promise<unknown>) {
  try {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");
    const cookieToken = await ctx.cookies.get("token");
    let token;

    if (authorization) {
      token = authorization.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = {
        message: "Вход не выполнен: 'Авторизация не пройдена.'",
      };
      return;
    }

    const decoded = await verifyToken(token, JWT_SECRET);

    const customers: Customer[] = JSON.parse(
      await Deno.readTextFile("./data/customers.json")
    );

    const [exists] = customers.filter((c) => c.customer_id === decoded.sub);

    if (!exists) {
      ctx.response.status = 401;
      ctx.response.body = {     
        message: "Владелец данного токена не найден.",
      };
      return;
    }

    ctx.state["customer_id"] = exists.customer_id;
    await next();
    delete ctx.state.customer_id;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
  }
}

export { authenticate };

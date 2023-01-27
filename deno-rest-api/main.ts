import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./router.ts";

const host = Deno.env.get("HOST");
const port: number = parseInt(Deno.env.get("PORT"));

const app = new Application();

app.use(
  oakCors({
    origin: /^.+localhost:(3000|3001)$/,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ host, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      host ?? "localhost"
    }:${port}`
  );
});

await app.listen({ port });

// https://codevoweb.com/authentication-with-bcrypt-jwt-and-cookies-in-deno/

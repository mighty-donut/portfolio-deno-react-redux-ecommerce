import { Router, RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

// middleware
import { authenticate } from "./middleware/authenticate.ts"
import { serveStatic } from "./middleware/static.ts";

import {SignUp, SignIn, SignOut} from "./controllers/auth.ts"

import { getProfile, updateProfile } from "./controllers/users.ts"


import {
  getAll,
  getOneById,
  getWithSearchParams,
} from "./controllers/products.ts";


const router = new Router();

// http://localhost:8000/
router.get("/", (ctx: RouterContext) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head>
      <title>api</title>
      </head>
      <body>
        <h1>Welcome to ecommerce api !</h1>
      </body>
    </html>
  `;
});

// serve static content
// example
// http://localhost:8000/images/category/bookshelfSpeakers.jpg
router.get("/images/:path+", serveStatic)

// auth
router.post("/api/v1/auth/signup", SignUp);
router.post("/api/v1/auth/signin", SignIn);
router.post("/api/v1/auth/signout", authenticate, SignOut);

// customer profile
router.get("/api/v1/customers/get", authenticate, getProfile);
router.put("/api/v1/customers/update", authenticate, updateProfile);

// products
router.get("/api/v1/products", getAll);
router.get("/api/v1/products/:id", getOneById);
router.get("/api/v1/search/product", getWithSearchParams);

export default router;

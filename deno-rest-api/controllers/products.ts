import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import products from "../data/products.ts";

import { Product } from "../data/types.ts";

async function getAll({ response }: { response: Response }) {
  try {
    response.body = products;
    return;
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      message: error.toString(),
    };
    return;
  }
}

async function getOneById({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) {
  const { id } = params;

  const [product]: Product | undefined = products.filter(
    (item: Product) => item.product_id === parseInt(id)
  );
  if (product) {
    response.status = 200;
    response.body = product;
    return;
  } else {
    response.status = 404;
    response.body = { message: `Product with id of ${id} not found.` };
    return;
  }
}

async function getWithSearchParams({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  const results: Product[] | undefined = products.filter((product: Product) =>
    Object.values(product).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  if (results) {
    response.status = 201;
    response.body = results;
    return;
  } else {
    response.status = 404;
    response.body = { message: `Product with request of ${search} not found.` };
    return;
  }
}

export { getAll, getOneById, getWithSearchParams };

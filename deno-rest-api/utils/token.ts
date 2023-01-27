import {
  create,
  verify,
  decode,
  getNumericDate,
} from "https://deno.land/x/djwt@v2.8/mod.ts";

import { Header, Payload } from "https://deno.land/x/djwt@v2.8/mod.ts";

async function generateKey(secret: string) {
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
}

async function generateToken(id: number, exp: number, secret: string) {
  const payload: Payload = {
    iss: "ecommerce.com",
    sub: id,
    exp: getNumericDate(exp),
    iat: getNumericDate(new Date()),
    nbf: getNumericDate(new Date()),
  };

  const header: Header = {
    alg: "HS256",
    typ: "JWT",
  };

  const key = await generateKey(secret);

  return create(header, payload, key);
}

async function verifyToken(token: string, secretKey: string) {
  try {
    const key = await generateKey(secretKey);
    return await verify(token, key);
  } catch (error) {
    return error.message;
  }
}

export { generateToken, verifyToken };

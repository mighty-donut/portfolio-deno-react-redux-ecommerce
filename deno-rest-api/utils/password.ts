import {
  compare,
  genSalt,
  hash,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(8);
  return hash(password, salt);
}

function comparePasswords(
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(candidatePassword, hashedPassword);
}

export { hashPassword, comparePasswords };

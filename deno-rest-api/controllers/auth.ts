import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { generateToken } from "../utils/token.ts";

import { hashPassword, comparePasswords } from "../utils/password.ts";

// import { omitFields } from "../utils/omitFields.ts";

import { Customer } from "../data/types.ts";

const JWT_SECRET: string = Deno.env.get("JWT_SECRET");
const ACCESS_TOKEN_EXP: number = parseInt(Deno.env.get("ACCESS_TOKEN_EXP"));
const REFRESH_TOKEN_EXP: number = parseInt(Deno.env.get("REFRESH_TOKEN_EXP"));

class User {
  
  customer_id: number;
  email: string;
  password: string;
  phone: string;
  lastName: string;
  firstName: string;
  middleName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    customer_id,
    email,
    password,
    phone,
    lastName,
    firstName,
    middleName,
    createdAt,
    updatedAt
  ) {
    (this.customer_id = customer_id),
      (this.email = email),
      (this.password = password),
      (this.phone = phone),
      (this.lastName = lastName),
      (this.firstName = firstName),
      (this.middleName = middleName),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt);
  }
}

async function SignUp({ request, response, cookies }: RouterContext) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Нет данных POST запроса !",
    };
    return;
  } else {
    
    const { lastName, firstName, middleName, phone, email, password }: 
    {lastName: string; firstName: string; middleName: string; phone: string; email: string; password: string } = await request.body().value;

    const customers: Customer[] = JSON.parse(
      await Deno.readTextFile("./data/customers.json")
    );

    const checkEmail: Customer | undefined = customers.find((c) => c.email === email);

    if (checkEmail) {
      response.status = 422;
      response.body = {
        message: `Клиент с email адресом ${email} уже существует !`,
      };
      return;
    }

    // find max ID number
    const customer_id: number = Math.max(
      ...customers.map((c: Customer) => parseInt(c.customer_id))
    );

    const hashedPassword = await hashPassword(password);

    const createdAt = new Date();
    const updatedAt = createdAt;

    // add new customer
    const newCustomers = [
      ...customers,
      new User(
        customer_id + 1,
        email,
        hashedPassword,
        phone,
        lastName,
        firstName,
        middleName,
        createdAt,
        updatedAt
      ),
    ];

    await Deno.writeTextFile("./data/customers.json", JSON.stringify(newCustomers));

    // new version of
    const exist: Customer[] = JSON.parse(
      await Deno.readTextFile("./data/customers.json")
    );

    const [registered] = exist.filter((c) => c.email === email);

    const access_token: string = await generateToken(
      registered.customer_id,
      ACCESS_TOKEN_EXP,
      JWT_SECRET
    );

    // !
    // const refresh_token: string = await generateToken(
    //   registered.id,
    //   REFRESH_TOKEN_EXP,
    //   JWT_SECRET
    // );

    // console.log(refresh_token);

    cookies.set("access_token", access_token, {
      expires: new Date(Date.now() + ACCESS_TOKEN_EXP),
      maxAge: ACCESS_TOKEN_EXP,
      httpOnly: true,
      secure: false,
    });

    response.status = 201;
    response.body = {
      message: `Новый клиент с email дресом ${email} успешно зарегистрирован.`,
      token: access_token,
    };
    return;
  }
}

async function SignIn({ request, response, cookies }: RouterContext) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Нет данных POST запроса !",
    };
    return;
  } else {
    try {

      const { email, password }: { email: string; password: string } = await request.body().value;

      const customers: Customer[] = JSON.parse(
        await Deno.readTextFile("./data/customers.json")
      );
      const [exist] = customers.filter((cust) => cust.email === email);

      const comparedResult = await comparePasswords(password, exist?.password);

      if (!exist || !comparedResult) {
        response.status = 401;
        response.body = {
          message: `Не верное имя пользователя или пароль !`,
        };
        return;
      } else {
        const access_token = await generateToken(
          exist.customer_id,
          ACCESS_TOKEN_EXP,
          JWT_SECRET
        );

        cookies.set("access_token", access_token, {
          expires: new Date(Date.now() + ACCESS_TOKEN_EXP),
          maxAge: ACCESS_TOKEN_EXP,
          httpOnly: true,
          secure: false,
        });

        response.status = 200;
        response.body = {
          message: `Вы успешно авторизованы.`,
          token: access_token,
        };

        return;
      }
    } catch (error) {
      response.status = 500;
      response.body = { status: "error", message: error.message };
      return;
    }
  }
}

// delete refresh_token
async function SignOut({ response, cookies }: RouterContext) {
  cookies.set("access_token", "", {
    httpOnly: true,
    secure: false,
    maxAge: -1,
  });

  response.status = 200;
  response.body = {
    message: "Выход успешно выполнен.",
  };
}

export { SignUp, SignIn, SignOut };

import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { comparePasswords } from "../utils/password.ts";
import { omitFields } from "../utils/omitFields.ts";

import { Customer } from "../data/types.ts";


// Код ответа на статус ошибки HTTP 401 Unauthorized

async function getProfile(ctx: RouterContext) {

  try {
    const customers: Customer[] = JSON.parse(
      await Deno.readTextFile("./data/customers.json")
    );
    const [exist] = customers.filter(
      (cust) => cust.customer_id === parseInt(ctx.state.customer_id)
    );

    if (!exist) {
      ctx.response.status = 401;
      ctx.response.body = {
        message: "Владелец данного токена не найден !",
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      customer: omitFields(exist, "customer_id", "password", "createdAt", "updatedAt"),
      message: "Данные пользователя успешно получены."
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: error.message,
    };
    return;
  }
}

// пилить
async function updateProfile(ctx: RouterContext) {

   if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "Нет данных PUT запроса !",
    };
    return;
  } else {
    
    const { lastName, firstName, middleName, phone, email, password }: 
    {lastName: string; firstName: string; middleName: string; phone: string; email: string; password: string } = await ctx.request.body().value;

    const customers: Customer[] = JSON.parse(
      await Deno.readTextFile("./data/customers.json")
    );

    const [exist] = customers.filter(
      (cust) => cust.customer_id === parseInt(ctx.state.customer_id)
    );

    // !
   // console.log("exist", exist)

    const comparedResult = await comparePasswords(password, exist?.password);

    // !
    console.log("compare pass", comparedResult)

    if (!comparedResult) {
      ctx.response.status = 401;
      ctx.response.body = {
        message: `Введён не верный пароль !`,
      };
      return;
    }
  
   // сохранить обновлённый !!!
    // фильтрация без текущего
    const withoutCurrent = customers.filter(
      (cust) => cust.customer_id !== parseInt(ctx.state.customer_id)
    );

    console.log("without", withoutCurrent)


    const newCustomers = [
      ...withoutCurrent, 
      { 
        customer_id: exist.customer_id, 
        email: email,
        password: exist.password,
        phone: phone,
        lastName: lastName, 
        firstName: firstName, 
        middleName: middleName,
        createdAt: exist.createdAt,
        updatedAt: new Date(),
      }];

   // await is super important !
    await Deno.writeTextFile("./data/customers.json", JSON.stringify(newCustomers));
   
      // new version of customers.json
      const refreshed: Customer[] = JSON.parse(
        await Deno.readTextFile("./data/customers.json")
      );
  
      const [extract] = refreshed.filter((c) => c.customer_id === parseInt(ctx.state.customer_id));
    // заного извлечь обновлённый !!!

    ctx.response.status = 200;
    ctx.response.body = {
      customer: omitFields(extract, "customer_id", "password", "createdAt", "updatedAt"),
      message: "Данные профиля успешно обновлены."
    };
      return;
    }

}

export { getProfile, updateProfile };

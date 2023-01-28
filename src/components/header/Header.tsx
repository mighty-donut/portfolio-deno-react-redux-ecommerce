import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { signOut } from "../../redux/slices/authSlice";

import { selectCartItems } from "../../redux/store";

type Item = {
  id: number;
  quantity: number;
};

export function Header() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const cartItems: Item[] = useAppSelector(selectCartItems);

  const cartTotalQty = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const [open, setOpen] = useState(false);

  // const [showCart, setShowCart] = useState(false);

  // function openCart() {
  //   setShowCart(!showCart);
  // }
  

  const active =
    "text-teal-300 hover:text-teal-400 transition duration-300 ease-in-out";
  const inactive =
    "text-white hover:text-teal-400 transition duration-300 ease-in-out";

  return (
    <div className="flex flex-col font-montserrat">
      <div>
        <div
          className="flex place-items-end gap-6 px-6 py-2 text-white text-lg font-bold
    bg-gradient-to-br from-gray-800 to-gray-400"
        >
          <NavLink
            to="/shops"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            Магазины
          </NavLink>

          <NavLink
            to="/payment"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            Оплата
          </NavLink>

          <NavLink
            to="/delivery"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            Доставка
          </NavLink>

          <NavLink
            to="/service"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            Сервис
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            Контакты
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? active : inactive)}
          >
            О компании
          </NavLink>

          <div className="flex-grow"></div>

          {token ? (
            <div className="flex flex-row ">
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? active : inactive)}
              >
                Личный кабинет
              </NavLink>

              <button
                className="flex flex-row ml-10 text-white hover:text-teal-500 transition duration-300 ease-in-out"
                onClick={() => dispatch(signOut(token))}
              >
                Выход
                <svg
                  className="ml-1 w-6 h-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="mr-5 inline-block text-xl font-bold leading-tight rounded text-white hover:text-teal-400 transition duration-150 ease-in-out flex items-center whitespace-nowrap"
            >
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className="flex justify-between gap-7 bg-gradient-to-br from-gray-800 to-gray-400">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "pl-5 mt-1 text-3xl font-bold text-teal-300 hover:text-teal-500 transition duration-300 ease-in-out"
                : "pl-5 mt-1 text-3xl font-bold text-white hover:text-teal-500 transition duration-300 ease-in-out"
            }
          >
            Hi-Fi Boutique
          </NavLink>

          <div className="relative text-gray-600">
            <input
              className="bg-white w-72 h-8 my-1 px-5 pr-12 rounded-full text-sm focus:outline-none"
              onFocus={() => setOpen(true)}
              placeholder="Поиск товаров..."
            />

            <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
              <svg
                className="h-6 w-6 text-gray-400 hover:text-gray-500 transition duration-300 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-row mr-5 pr-5 mt-1">
            {/* <div className="flex flex-row mr-4">
          <button className="mx-2 mt-2 text-white hover:text-gray-400">light</button>
          <button className="mx-2 mt-2 text-gray-600 hover:text-black">dark</button>
         </div> */}

            <button
              className="mx-1 text-gray-600 hover:text-cyan-400 transition duration-300 ease-in-out"
              title="Сравнение товаров"
            >
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </button>
            <button
              className="mx-1 text-gray-600 hover:text-pink-400 transition duration-300 ease-in-out"
              title="Открыть избранное"
            >
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <div className="flex relative">
              <Link
                className="font-medium text-gray-600 hover:text-teal-300 transition duration-300 ease-in-out"
                to="/cart"
                
                title="Перейти в корзину"
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>

            {cartTotalQty > 0 ? (
              <span className="absolute right-5 top-14 mt-1 font-montserrat font-bold text-gray-300 hover:text-gray-400 text-center text-lg cursor-none">
                {cartTotalQty}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

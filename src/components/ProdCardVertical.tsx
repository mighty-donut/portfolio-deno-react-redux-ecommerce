import { Link } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { addItem } from "../redux/slices/cartSlice";
import { Product } from "../utils/types";

export function ProdCardVertical({
  product_id,
  title,
  brand,
  model,
  color,
  retail_price,
  currency,
  thumbnail,
}: Product) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col place-content-between w-full bg-white border rounded shadow-sm hover:shadow-lg transition duration-300 ease-in-out">
      <Link to={`/products/${product_id}`}>
        <div className="h-44 block relative overflow-hidden rounded-t">
          {/* {new_state && <span className="relative overflow-hidden text-emerald-400 ml-44">Новинка</span>}   */}

          <img
            className="object-cover object-center w-full h-full block"
            alt={title}
            src={thumbnail}
          />
        </div>
      </Link>

      {/* tracking-widest - расстояние между буквами */}
      <div className="ml-2 my-1 text-xs font-medium tracking-wide">{title}</div>

      <div className="ml-2 font-medium">
        {brand} {model} {color}
      </div>

      <div className="flex flex-row place-content-between ml-2 my-1 gap-1">
        <div className="mt-1 text-xl font-montserrat font-bold">
          {retail_price} {currency}{" "}
        </div>

        <div className="mx-2">
          <button
            className="mx-1 text-gray-500 hover:text-cyan-500 transition duration-300 ease-in-out"
            title="Сравнить"
          >
            <svg
              className="w-6 h-6"
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
            className="mx-1 text-gray-500 hover:text-pink-500 transition duration-300 ease-in-out"
            title="В избранное"
          >
            <svg
              className="w-6 h-6"
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

          <button
            className="mx-1 w-8 h-8 rounded text-white bg-teal-300 hover:bg-teal-400 transition duration-300 ease-in-out"
            title="В корзину"
            onClick={() => dispatch(addItem(product_id))}
          >
            <svg
              className="w-6 h-6 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

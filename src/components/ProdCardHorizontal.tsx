import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { addItem } from "../redux/slices/cartSlice";
import { addFavorite } from "../redux/slices/favoritesSlice";

import { Product } from "../utils/types";

import { StarsRating } from "./StarsRating";

export function ProdCardHorizontal({ ...item }: Product) {
  const dispatch = useAppDispatch();

  // отображение состояния товара (Новый, Витрина, B-stock)
  const [conditionState, setConditionState] = useState(
    "text-gray-500 font-medium"
  );

  // отображение наличия товара на складе
  // className="text-gray-500 font-medium ml-1"
  const [stockState, setStockState] = useState("text-gray-500 font-medium");
  const stockRegex = /Предзаказ/;

  // new
  const [newState, setNewState] = useState(false);
  // promo
  const [promoState, setPromoState] = useState(false);
  // sale
  const [saleState, setSaleState] = useState(false);

  useEffect(() => {
    if (item.new_state === 1) {
      setNewState(true);
    }
    if (item.promo_state === 1) {
      setPromoState(true);
    }
    if (item.sale_state === 1) {
      setSaleState(true);
    }
    if (item.prod_condition === "Brand New") {
      setConditionState("font-medium text-emerald-500");
    }
    if (item.prod_condition === "B-stock") {
      setConditionState("font-medium text-red-500");
    }
    if (item.prod_condition === "Витрина") {
      setConditionState("font-medium text-red-500");
    }
    if (item.prod_condition === "Уценка") {
      setConditionState("font-medium text-red-500");
    }

    if (item.stock_state === "В наличии") {
      setStockState("font-medium text-emerald-500");
    }
    if (stockRegex.test(item.stock_state)) {
      setStockState("font-medium text-yellow-300");
    }
    if (item.stock_state === "Снят с производства") {
      setStockState("font-medium text-gray-500");
    }
  }, []);

  return (
    <>
      <div className="flex flex-row w-full rounded shadow-sm hover:shadow-lg transition duration-300 ease-in-out bg-white">
        <div className="">
          <a className="block relative overflow-hidden rounded-l">
            <img
              className="w-60 h-48 block object-cover object-center"
              alt={item.title}
              src={item.thumbnail}
            />
          </a>
        </div>

        {/* 1 */}
        <div className="flex flex-col grow justify-between ml-3 p-1 mt-1">
          <div className="flex flex-row justify-between">
            <Link to={`/products/${item.product_id}`}>
              <div className="text-xl font-medium">
                {item.title} {item.brand} {item.model} {item.color}
              </div>
            </Link>
            {newState && (
              <div className="text-xl font-medium text-emerald-300 mr-5">
                Новинка
              </div>
            )}
            {promoState && (
              <div className="text-xl font-medium text-purple-500 mr-5">
                Акция
              </div>
            )}
            {saleState && (
              <div className="text-xl font-medium text-red-500 mr-5">
                Распродажа
              </div>
            )}
          </div>

          {/* 2 */}
          <div className="flex flex-row justify-between mr-4">
            <div className="text-xs">Код: {item.sku}</div>
            <div className="">МЕСТО</div>
            <div className="">МЕСТО</div>
          </div>

          {/* 3 */}
          <div className="flex flex-row justify-between mr-4">
            <p className="text-gray-600 text-sm">
              Наличие:
              <span className={stockState}> {item.stock_state}</span>
            </p>

            <div className="">МЕСТО</div>
            <div className="">Доставка завтра</div>
          </div>

          {/* 4 */}
          <div className="flex flex-row justify-between mr-4">
            <p className="text-gray-600 text-sm" title="Означает:">
              Состояние:
              <span className={conditionState}> {item.prod_condition}</span>
            </p>
            <div className="">МЕСТО</div>
            <div className="">Самовывоз завтра</div>
          </div>

          {/* 5 rating    stars-beauty */}
          <div className="flex flex-row justify-between">
            <div className="text-3xl mt-1 font-montserrat font-bold">
              {item.retail_price} {item.currency}
            </div>

            <StarsRating value={item.rating} />

            <div className="flex flex-row mr-2 mb-1">
              <button
                className="mx-1 text-gray-500 hover:text-cyan-500 transition duration-300 ease-in-out"
                title="Сравнить"
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
                className="mx-1 text-gray-500 hover:text-pink-500 transition duration-300 ease-in-out"
                title="В избранное"
                onClick={() => dispatch(addFavorite({ ...item }))}
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

              <button
                className="mx-1 w-10 h-10 rounded text-white bg-teal-300 hover:bg-teal-400 transition duration-300 ease-in-out"
                title="В корзину"
                onClick={() => dispatch(addItem(item.product_id))}
              >
                <svg
                  className="w-8 h-8 ml-1"
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

          {/* w */}
        </div>
      </div>
    </>
  );
}

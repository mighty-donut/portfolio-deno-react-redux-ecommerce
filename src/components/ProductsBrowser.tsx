import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectProducts } from "./../redux/store";
import {
  fetchProducts,
  sortByPriceUp,
  sortByPriceDown,
} from "./../redux/slices/productsSlice";

import { ProdCardVertical } from "../components/ProdCardVertical";
import { ProdCardHorizontal } from "../components/ProdCardHorizontal";
import { BrandDropdown } from "../components/BrandDropdown";

export function ProductsBrowser() {

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);


  
  // cards layout switch --------------------------------------------------
  const [horizontalCardslayout, setHorizontalCardsLayout] = useState(true);
  const [verticalCardslayout, setVerticalCardsLayout] = useState(false);

  function changeLayoutHoriz() {
    if (verticalCardslayout) {
      setVerticalCardsLayout(false);
      setHorizontalCardsLayout(true);
    }
  }
  function changeLayoutVert() {
    if (horizontalCardslayout) {
      setHorizontalCardsLayout(false);
      setVerticalCardsLayout(true);
    }
  }
  // cards layout switch --------------------------------------------------

  return (
    <div className="py-3 ">
      {/* 1St Filter */}
      <div className="flex justify-between gap-4 px-7 py-2 mb-3 font-montserrat font-bold text-lg bg-gradient-to-br from-gray-400 to-gray-800">
        <div className="flex flex-row">
          <BrandDropdown />

          <button
            className="flex flex-row ml-32 text-white hover:text-gray-400 transition duration-300 ease-in-out text-xl"
            onClick={() => dispatch(sortByPriceDown())}
          >
            ₽
            <svg
              className="ml-1 w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          <button
            className="flex flex-row ml-5 text-white hover:text-gray-400 transition duration-300 ease-in-out text-xl"
            onClick={() => dispatch(sortByPriceUp())}
          >
            ₽
            <svg
              className="ml-1 w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-row gap-3">
          <button
            className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
            onClick={changeLayoutHoriz}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
              />
            </svg>
          </button>
          <button
            className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
            onClick={changeLayoutVert}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-row gap-6">
          <div className="text-emerald-300 hover:text-emerald-400 transition duration-300 ease-in-out">
            Новинки
          </div>
          <div className="text-purple-400 hover:text-purple-500 transition duration-300 ease-in-out">
            Акции
          </div>
          <div className="text-red-400 hover:text-red-500 transition duration-300 ease-in-out">
            Распродажа
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5">
        {/* hidden container horizontal */}
        <div
          className="grid-cols-1 col-start-1 col-end-5 justify-items-start gap-2 px-3"
          style={{ display: horizontalCardslayout ? "grid" : "none" }}
        >
          {products
            ? products.map((item) => (
                <ProdCardHorizontal key={item.product_id} {...item} />
              ))
            : null}
        </div>

        {/* hidden container vertical */}
        <div
          className="grid-cols-4 col-start-1 col-end-5 justify-items-start gap-2 px-3"
          style={{ display: verticalCardslayout ? "grid" : "none" }}
        >
          {products
            ? products.map((item) => (
                <ProdCardVertical key={item.product_id} {...item} />
              ))
            : null}
        </div>

        <div className="col-start-5 bg-white rounded border border-black mr-3 shadow-sm hover:shadow-lg transition duration-300 ease-in-out">
          Фильтры или экстра инфо ?
        </div>
      </div>
    </div>
  );
}

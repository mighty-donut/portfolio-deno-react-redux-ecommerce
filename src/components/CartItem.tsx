
import { Link } from "react-router-dom";
import {useAppDispatch, useAppSelector, selectProducts } from "../redux/store";

import {
  delItem,
  incQty,
  decQty,
  setQtyManualy,
} from "../redux/slices/cartSlice";

import { Item } from "../utils/types";

export function CartItem({ id, quantity }: Item) {
  
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);

  // отображение свойств Product в карточке
  const product = products?.find((item) => item.product_id === id);
  if (product == null) return null;

  // useEffect(() => {

  // if (product.prod_condition === "Brand New") {
  //   setConditionColor("text-green-400")
  // }
  // if (product.prod_condition === "Витрина") {
  //   setConditionColor("text-red-400")
  // }
  // if (product.prod_condition === "B-stock") {
  //   setConditionColor("text-red-400")
  // }
  // }, [])

  return (
    <div className="flex flex-row h-16 text-black shadow-sm bg-white rounded hover:shadow-lg transition duration-300 ease-in-out">
      <div className="block relative overflow-hidden rounded-l">
        <img
          className="w-24 h-16 block object-cover object-center"
          alt="product img"
          src={product.thumbnail}
        />
      </div>

      {/* <div className="">{title} {brand} {model} {color}</div> */}
      <div className="flex flex-col grow self-center mx-3">
        <Link to={`/products/${id}`}>
          <div className="font-medium">
            {product.title} {product.brand} {product.model} {product.color}
          </div>
        </Link>
        <div className="flex flex-row">
          <div className="text-xs">Код: {product.sku}</div>
          <div className="text-xs mx-3">
            Состояние: <span className=" ">{product.prod_condition}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row self-center items-center gap-4 ml-3">
        <button
          className="w-14 h-7 font-medium bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => dispatch(decQty(id))}
        >
          -
        </button>
        <div className=" font-medium">Кол-во</div>
        {/* min="1" если установить лимит, то 0 никак */}
        <input
          className="w-12 h-7 font-bold"
          type="text"
          value={quantity}
          onChange={(event) =>
            dispatch(
              setQtyManualy({ id, quantity: Number(event.target.value) })
            )
          }
        ></input>
        <button
          className="w-14 h-7 font-medium bg-gray-200 hover:bg-gray-300 rounded"
          onClick={() => dispatch(incQty(id))}
        >
          +
        </button>
      </div>

      {/* trash button & icon */}
      <button
        className="font-medium self-center px-7"
        title="Удалить"
        onClick={() => dispatch(delItem(id))}
      >
        {/* icon, default strokeWidth={1.5} */}
        <svg
          className="w-7 h-7 text-red-300 hover:text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

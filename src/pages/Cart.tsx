import { selectCartItems, useAppSelector } from "../redux/store";
import { CartItem } from "../components/CartItem";
import { Item } from "../utils/types";

export default function Cart() {
  const cartItems: Item[] = useAppSelector(selectCartItems);

  const cartTotalQty = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <>
      <div className="grid grid-cols-4 mx-3 mb-3 py-3 mt-3 z-50 rounded bg-gradient-to-br from-gray-300 to-gray-400">
        {/* hidden container horizontal */}
        <div className="grid grid-cols-1 col-start-1 col-end-4 gap-2 px-3">
          {/*  */}
          {cartItems.map((item) => (
            <CartItem key={item.id} id={item.id} quantity={item.quantity} />
          ))}
          {cartItems.length === 0 && (
            <div className="text-black">
              Корзина пуста.
              <p>
                Вы можете выбрать нужный Вам товар из каталога и добавить его в
                корзину.
              </p>
            </div>
          )}
        </div>

        <div className="col-start-4 mr-3 bg-white rounded">
          <div className="flex flex-col mx-7 my-5">
            <div className="flex flex-row">
              <div className="flex flex-col gap-1 text-lg">
                <div className="">Всего товаров</div>
                <div className="">Сумма</div>
                <div className="">Со скидкой</div>
                <div className="">Налог (20%)</div>
                <div className="">Сумма заказа</div>
                <div className="">Промокод:</div>
              </div>

              <div className="flex flex-col gap-1 text-lg ml-24">
                <div className="">{cartTotalQty}</div>
                <div className="">0</div>
                <div className="">0</div>
                <div className="">0</div>
                <div className="">0</div>
              </div>
            </div>

            <button className="self-center w-40 h-12 mt-3 bg-gray-300 rounded">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

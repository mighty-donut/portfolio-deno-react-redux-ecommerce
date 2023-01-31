// должны быть:

// 1. это защищённый маршрут (сделано)

// 2. регистрационные данные профиля (сделано)
// сохранить в LS или регистрация отваливается при обновлении страницы

// 3. список всех заказов

// 4. список отзывов на купленные товары
// (поставить оценку, написать ревью)

// 5. данные по доставке и оплате ? (посмотреть на thomann пример)

import { useEffect } from "react";

import { useNavigate, Outlet, NavLink } from "react-router-dom";

import { Header } from "./../components/header/Header";



export default function ProfileLayout() {

  const navigate = useNavigate();

  // отправка формы ревью
  // comment - должны быть плюсы и минусы товара с пояснениями
  // const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(
  //       createProductReview(productId, {
  //         rating,
  //         comment,
  //       })
  //     );
  //   };

  useEffect(() => {  
     navigate("/profile/customer")
  }, []);

  const active ="w-full h-12 py-2 cursor-pointer text-xl font-bold text-center text-white bg-gradient-to-br from-gray-700 to-gray-400 transition duration-300 ease-in-out border-b border-black";
  const inactive ="w-full h-12 py-2 cursor-pointer text-xl font-bold text-center text-white hover:bg-gradient-to-br from-gray-700 to-gray-400 transition duration-300 ease-in-out border-b border-black";

  return (
    <div className="w-full h-screen pt-3" style={{ backgroundImage: `url("background.jpg")` ,
    backgroundSize: 'cover',
    overflow: 'hidden', }}>
      <Header />

      <h2 className="mx-7 my-2 text-2xl text-white font-bold font-montserrat ">Личный кабинет</h2>

      <div className="grid grid-cols-5 font-montserrat mt-3">
        {/* hidden container horizontal */}
        <div className="col-start-1 col-end-2 bg-white shadow-sm hover:shadow-lg transition duration-300 ease-in-out border-black bg-gradient-to-br from-gray-800 to-gray-400">
          <div className="flex flex-col">
            <NavLink
              to={`/profile/customer`}
              className={({ isActive }) => (isActive ? active : inactive)}
              
            >
              Покупатель
            </NavLink>
            <NavLink
              to={`/profile/myorders`}
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Заказы
            </NavLink>
            <NavLink
              to={`/profile/myreviews`}
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Отзывы
            </NavLink>
            <NavLink
              to={`/profile/favorites`}
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Избранное
            </NavLink>
          </div>
        </div>

        {/* style={{ display: horizontalCardslayout ? "grid" : "none" }} */}
        <div className="grid-cols-1 col-start-2 col-end-6 justify-items-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

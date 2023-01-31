import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { Spinner } from "../../components/Spinner";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProfile, updateProfile } from "../../redux/slices/customerSlice";

// import type { Customer } from "../../utils/types"

export default function Customer() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.customer.customer)!;

  const statusGet = useAppSelector((state) => state.customer.statusGet);
  const statusUpdate = useAppSelector((state) => state.customer.statusUpdate);

  console.log("profile from store", profile);

  // { ...profile, password: "" }
  // {
  //   lastName: "",
  //   firstName: "",
  //   middleName: "",
  //   phone: "",
  //   email: "",
  //   password: ""  
  // }
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    email: "",
    password: ""  
  });

  useEffect(() => {
    if (token && profile === null) {
      dispatch(getProfile(token));
    }
    if (profile) {
      setForm({ ...profile, password: "" });
    }
  }, [profile]);



 

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const submitHandler = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(updateProfile({ token, form }));
  };

  return (
    <div className=" ">
      <div className="mx-3 bg-white rounded">

    { statusGet === "pending" ? <Spinner/> : null } 
    { statusUpdate === "pending" ? <Spinner/> : null } 

        {profile ? (
          <div className="">
            <form className="mx-3 p-5" onSubmit={submitHandler}>
              <div className="my-1">
                <label className="text-xs" htmlFor="lastName">
                  Фамилия
                </label>
                <input
                  className="w-56 px-2 ml-2"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="my-1">
                <label className="text-xs" htmlFor="firstName">
                  Имя
                </label>
                <input
                  className="w-56 px-2 ml-10"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="my-1">
                <label className="text-xs" htmlFor="middleName">
                  Отчество
                </label>
                <input
                  className="w-56 px-2 ml-2"
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                />
              </div>

              <div className="my-1">
                <label className="text-xs" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-56 px-2 ml-8"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="my-1">
                <label className="text-xs" htmlFor="phone">
                  Телефон
                </label>
                <input
                  className="w-56 px-2 ml-4"
                  type="tel"
                  id="phone"
                  name="tel"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="my-1">
                <label className="text-xs" htmlFor="password">
                  Пароль
                </label>
                <input
                  className="w-56 px-2 ml-4"
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <p className="text-xs text-red-400">
                  для обновления данных профиля необходимо ввести текщий пароль
                </p>
              </div>

              <button
                className="w-36 h-16 m-3 rounded text-white bg-gray-500 to-gray-400 hover:bg-gray-600"
                type="submit"
                onSubmit={submitHandler}
              >
                Обновить
                <br />
                данные
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./../redux/store";
import { signIn } from "./../redux/slices/authSlice";

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // apiMessage ---------------------------
  const apiMessage = useAppSelector((state) => state.auth.apiMessageSignIn);
  const error = useAppSelector((state) => state.auth.errorSignIn);

  const [redirectTimer, setRedirectTimer] = useState(3);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => setRedirectTimer(redirectTimer - 1), 1000);
      if (redirectTimer === 0) {
        navigate("/home");
        return () => clearTimeout(timer);
      }
    }
  }, [token, redirectTimer]);

  const [formData, setFormData] = useState({ email: "", password: "" });

  // if html space is reserved, no empty string !
  const [errorMessage, setErrorMessage] = useState({
    emailEm: 'Поле "Email" обязательно для заполнения !',
    passwordEm: 'Поле "Пароль" обязательно для заполнения !',
  });

  // message is hidden by default "text-transparent text-xs"
  // show message  className="text-xs text-red-500"
  const msgDefault = "ml-2 text-transparent text-xs";
  const msgError = "ml-2 text-red-500 text-xs";

  const [showField, setShowField] = useState({
    emailMessage: msgDefault,
    passwordMessage: msgDefault,
  });

  // form validation state ---------------------------
  const iconDefault = "text-transparent h-12 w-12 ml-3 mt-8";
  const iconValid = "text-teal-400 h-12 w-12 ml-3 mt-8";
  const [showIcon, setShowIcon] = useState({
    emailIcon: iconDefault,
    passwordIcon: iconDefault,
  });

  // пилить !
  // submit button style
  const active =
    "w-28 h-12 mr-6 py-2 bg-teal-300 text-white text-xl font-medium leading-snug rounded hover:bg-teal-400 transition duration-300 ease-in-out";
  const inactive =
    "w-28 h-12 mr-6 py-2 bg-gray-300 text-white text-xl font-medium leading-snug rounded";

  const [buttonStyle, setButtonStyle] = useState(inactive);

  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

  useEffect(() => {
    if (
      showIcon.emailIcon === iconValid &&
      showIcon.passwordIcon === iconValid
    ) {
      setDisableSubmit(false);
      setButtonStyle(active);
    } else {
      setDisableSubmit(true);
      setButtonStyle(inactive);
    }
    console.log("form not valid", disableSubmit);
  }, [showIcon]);
  // form validation state ---------------------------

  const validateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (event.target.value === "") {
      setErrorMessage({
        ...errorMessage,
        emailEm: 'Поле "Email" обязательно для заполнения !',
      });
      setShowField({
        ...showField,
        emailMessage: msgError,
      });
      setShowIcon({
        ...showIcon,
        emailIcon: iconDefault,
      });
      return;
    }
    if (!emailRegex.test(String(event.target.value).toLowerCase())) {
      setErrorMessage({
        ...errorMessage,
        emailEm: "Не корректный ввод Email адреса !",
      });
      setShowField({
        ...showField,
        emailMessage: msgError,
      });
      setShowIcon({
        ...showIcon,
        emailIcon: iconDefault,
      });
      return;
    } else {
      setShowField({
        ...showField,
        emailMessage: msgDefault,
      });
      setShowIcon({
        ...showIcon,
        emailIcon: iconValid,
      });
      return;
    }
  };

  const validatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    // https://stackoverflow.com/questions/5231683/javascript-regular-expression-for-english-numeric-characters-only
    // starts with number - false
    // non-alphanumeric char - false
    // empty string - false
    // only latin - true
    const regex = /^[a-z][a-z0-9]*$/i;

    if (event.target.value === "") {
      setErrorMessage({
        ...errorMessage,
        passwordEm: 'Поле "Пароль" обязательно для заполнения !',
      });
      setShowField({
        ...showField,
        passwordMessage: msgError,
      });
      setShowIcon({
        ...showIcon,
        passwordIcon: iconDefault,
      });
      return;
    }
    if (!regex.test(event.target.value)) {
      setErrorMessage({
        ...errorMessage,
        passwordEm: "Допускается только латинский алфавит !",
      });
      setShowField({
        ...showField,
        passwordMessage: msgError,
      });
      setShowIcon({
        ...showIcon,
        passwordIcon: iconDefault,
      });
      return;
    } else {
      setShowField({
        ...showField,
        passwordMessage: msgDefault,
      });
      setShowIcon({
        ...showIcon,
        passwordIcon: iconValid,
      });
      return;
    }
  };

  const submitHandler = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(signIn(formData));
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-col items-center w-6/12 h-[360px] mt-28 mb-32 bg-white text-base rounded-lg shadow-lg">
        {/*  */}
        {error && (
          <span className="text-xl text-teal-400 font-bold">{error}</span>
        )}

        {/* не верный пароль (красным), форму не убирать ! */}
        {apiMessage === "Не верное имя пользователя или пароль !" ? (
          <span className="mt-5 text-xl text-red-400 font-bold">
            {apiMessage}
          </span>
        ) : null}

        {token ? (
          <div className="flex flex-col p-20">
            <span className="text-xl text-teal-400 font-bold">
              {apiMessage}
            </span>
            <span className="text-center mt-10">
              Назад на главную {redirectTimer}
            </span>
          </div>
        ) : (
          <form className="mt-4 ml-10" onSubmit={submitHandler}>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <label
                  className="p-1 bottom-8 bg-white text-black"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="h-12 px-2 w-80 border-2 rounded focus:outline-none focus:border-neutral-400"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={validateEmail}
                />
                <span className={showField.emailMessage}>
                  {errorMessage.emailEm}
                </span>
              </div>
              <div className="">
                <svg
                  className={showIcon.emailIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col mx-auto">
                <label
                  className="p-1 bottom-8 bg-white text-black"
                  htmlFor="password"
                >
                  Пароль
                </label>
                <input
                  className="h-12 px-2 w-80 border-2 rounded focus:outline-none focus:border-neutral-400"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={validatePassword}
                />
                <span className={showField.passwordMessage}>
                  {errorMessage.passwordEm}
                </span>
              </div>
              <div className="">
                <svg
                  className={showIcon.passwordIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col justify-between items-center my-4">
              <a
                href="#!"
                className="mr-6 text-gray-400 hover:text-gray-500 focus:text-gray-500 active:text-gray-600 duration-200 transition ease-in-out"
              >
                Забыли пароль ?
              </a>

              {/* stripe */}
              <hr className="w-full my-4 border border-solid border-t-0 border-gray-300 opacity-25" />

              <button
                type="submit"
                className={buttonStyle}
                disabled={disableSubmit}
              >
                Войти
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

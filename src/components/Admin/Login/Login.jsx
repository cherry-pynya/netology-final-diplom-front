import { useState, useContext } from "react";
import AdminContext from "../../../contex/Admin/AdminContext";

export default function Login() {
  const { auth } = useContext(AdminContext);
  const [form, setForm] = useState({
      login: '',
      password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((values) => ({ ...values, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const {login, password} = form;
    if (login !== '' && password !== '') {
        auth(form);
    }
  };

  return (
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>
      <div className="login__wrapper">
        <form
          className="login__form"
          action="login_submit"
          method="post"
          acceptCharset="utf-8"
        >
          <label className="login__label" htmlFor="login">
            E-mail
            <input
              className="login__input"
              type="text"
              placeholder="admin"
              name="login"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          <label className="login__label" htmlFor="password">
            Пароль
            <input
              className="login__input"
              type="password"
              placeholder=""
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          <div className="text-center">
            <input value="Авторизоваться" type="submit" className="login__button" onClick={submit}/>
          </div>
        </form>
      </div>
    </section>
  );
}

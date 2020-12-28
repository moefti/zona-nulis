import React, { useContext } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { rootContext } from "../../App";

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm();
  const { dispatch } = useContext(rootContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/users/login", data);
      if (res.data.status === "success") {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        return history.push("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="signup login">
      <h2> Masuk dengan Akun Mu</h2>
      <div className="link">
        <p>
          <Link
            to="/masuk"
            className={
              window.location.pathname === "/masuk" ? "link__disable" : ""
            }
          >
            Masuk
          </Link>
        </p>
        <p>|</p>
        <p>
          <Link to="/daftar">Daftar</Link>
        </p>
      </div>
      <form className="form form__login" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          className="input__type"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          ref={register({
            required: "email required",
            // eslint-disable-next-line no-useless-escape
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="errors-form">{errors.email.message}</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="errors-form">Invalid Email</p>
        )}
        <label htmlFor="password">password</label>
        <input
          className="input__type"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        {errors.password && (
          <p className="errors-form">{errors.password.message}</p>
        )}
        <button type="submit" disabled={formState.isSubmitting ? true : false}>
          Masuk
        </button>
      </form>
      <Link to="/">
        <span o>← Kembali</span>
      </Link>
    </div>
  );
};

export default withRouter(Login);

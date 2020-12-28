import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import "../../components/FormInput/FormInput";

function later(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

const Signup = () => {
  const history = useHistory();
  const { register, handleSubmit, formState, errors, setError } = useForm();
  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfrim) {
      setError("password", {
        type: "passwordMatch",
        message: "password and password Confrim do no match.",
      });
      setError("passwordConfrim", {
        type: "passwordMatch",
        message: "password and password Confrim do no match.",
      });
    } else {
      try {
        await axios.post("/users/signup", data);
        await later(1000);
        history.push("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="signup">
      <h2> Yuk, gabung dengan daftar akun baru</h2>
      <div className="link">
        <p>
          <Link to="/masuk">Masuk</Link>
        </p>
        <p>|</p>
        <p>
          <Link
            to="/daftar"
            className={
              window.location.pathname === "/daftar" ? "link__disable" : ""
            }
          >
            Daftar
          </Link>
        </p>
      </div>
      <form className="form form__signup" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          className="input__type"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          ref={register({ required: "Username Required" })}
        />
        {errors.username && (
          <p className="errors-form">{errors.username.message}</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="input__type"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          ref={register({
            required: "Email Required",
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
        <label htmlFor="password">Password</label>
        <input
          className="input__type"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          ref={register({ required: true })}
        />
        {errors.password && (
          <p className="errors-form">{errors.password.message}</p>
        )}
        <label htmlFor="passwordConfrim">Password Confrim</label>
        <input
          className="input__type"
          type="password"
          name="passwordConfrim"
          id="passwordConfrim"
          placeholder="Password Confrim"
          ref={register({ required: true })}
        />
        {errors.passwordConfrim && (
          <p className="errors-form">{errors.passwordConfrim.message}</p>
        )}
        <label htmlFor="check" className="check__box">
          <input type="checkbox" name="check" id="check" />
          <span>
            Saya menyetujui Syarat dan Ketentuan dan Kebijakan Privasi yang
            berlaku
          </span>
        </label>
        <button type="submit" disabled={formState.isSubmitting ? true : false}>
          Daftar
        </button>
      </form>
      <Link to="/">
        <span>← Kembali</span>
      </Link>
    </div>
  );
};

export default withRouter(Signup);

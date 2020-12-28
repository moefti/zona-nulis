import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { rootContext } from "../../App";
import Modal from "../Modal/Modal";

import "./Header.css";

export default function Header() {
  const { Consumer } = rootContext;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const clickEl = useRef(null);
  const handleClik = () => {
    clickEl.current.classList.toggle("open");
  };

  const handleClickLogout = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (dispatch) => {
    history.push("/");
    setOpen(false);
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <>
      {
        <Consumer>
          {({ dispatch }) => {
            return (
              <Modal
                open={open}
                onClose={handleClose}
                onSubmit={() => handleSubmit(dispatch)}
              />
            );
          }}
        </Consumer>
      }
      <div className="header">
        <div className="header-1">
          <div className="header__container">
            <div className="header__container--logo">
              <img src="/Logo.png" alt="Logo" />
              <Link to="/">
                <h2>Zona Nulis</h2>
              </Link>
            </div>
            <div className="header__container--navigation">
              {
                <Consumer>
                  {({ state }) => {
                    return state.isAuth === true ? (
                      <ul className="nav__links">
                        <Link to="/blog">
                          <li className="nav__item">{state.user.username}</li>
                        </Link>
                        <li
                          className="nav__item is-active"
                          onClick={handleClickLogout}
                        >
                          Keluar
                        </li>
                      </ul>
                    ) : (
                      <ul className="nav__links">
                        <Link to="/masuk">
                          <li className="nav__item">Masuk</li>
                        </Link>
                        <Link to="/daftar">
                          <li className="nav__item is-active">Daftar</li>
                        </Link>
                      </ul>
                    );
                  }}
                </Consumer>
              }
            </div>
            <div className="header__container--menu">
              <img src="/align-justify.png" alt="menu" onClick={handleClik} />
            </div>
          </div>
        </div>
        <div className="header__auth" ref={clickEl}>
          <ul className="auth__links">
            {
              <Consumer>
                {({ state, dispatch }) => {
                  return state.isAuth === true ? (
                    <>
                      <Link to="/blog">
                        <li className="nav__item">{state.user.username}</li>
                      </Link>
                      <Link
                        to="/"
                        onClick={() => {
                          dispatch({
                            type: "LOGOUT",
                          });
                        }}
                      >
                        <li className="nav__item is-active">Keluar</li>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/masuk">
                        <li className="nav__item">Masuk</li>
                      </Link>
                      <Link to="/daftar">
                        <li className="nav__item is-active">Daftar</li>
                      </Link>
                    </>
                  );
                }}
              </Consumer>
            }
          </ul>
        </div>
      </div>
    </>
  );
}

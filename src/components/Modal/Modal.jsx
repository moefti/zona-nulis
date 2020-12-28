import React, { useRef } from "react";
import "./Modal.css";

export default function Modal(props) {
  const modal = useRef(null);

  return (
    <div
      className={`${props.open ? "modal" : "modal-inactive"}`}
      useRef={modal}
    >
      <div className="modal__content">
        <div className="modal__content--header">
          <h4 className="modal__header--title">Keluar Akun</h4>
        </div>
        <div className="modal__content--body">
          <p>Apa kamu yakin ingin keluar akun?</p>
        </div>
        <div className="modal__content--footer">
          <button className="btn btn__modal--secondary" onClick={props.onClose}>
            Tidak
          </button>
          <button className="btn btn__modal--primary" onClick={props.onSubmit}>
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

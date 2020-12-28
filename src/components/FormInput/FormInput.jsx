import React from "react";
import { useForm } from "react-hook-form";
import "./FormInput.css";

export default function FormInput(props) {
  const { register } = useForm();
  return (
    <>
      <label htmlFor={props.label}>{props.name}</label>
      <input
        className="input__type"
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        ref={register}
      />
    </>
  );
}

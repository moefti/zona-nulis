import React from "react";
import { Link } from "react-router-dom";
import "./CardLess.css";

export default function CardLess(props) {
  return (
    <>
      <Link
        to={{
          pathname: `/${props.author}/${props.slug}`,
          state: {
            id: props.id,
          },
        }}
      >
        <div className="less__card">
          <div className="less__card--small">
            {props.loading ? (
              props.height
            ) : (
              <img
                src={`https://zona-nulis-api.herokuapp.com/img/posts/imageCover/${props.img}`}
                alt="img"
              />
            )}
          </div>
          <div className="less__card--text">
            <h4>{props.title}</h4>
            <span>{props.date}</span>
          </div>
        </div>
      </Link>
    </>
  );
}

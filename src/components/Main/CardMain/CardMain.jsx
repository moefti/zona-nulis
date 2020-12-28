import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CardMain.css";

export default function CardMain(props) {
  return (
    <Link
      to={{
        pathname: `/${props.author}/${props.slug}`,
        state: {
          id: props.id,
        },
      }}
    >
      <motion.div
        className="main__card"
        whileTap={{
          scale: 1.1,
        }}
      >
        <div className="main__card--img">
          {props.loading ? (
            props.height
          ) : (
            <img
              src={`https://zona-nulis-api.herokuapp.com/img/posts/imageCover/${props.img}`}
              alt="img"
            />
          )}
        </div>
        <div className="main__card--author">
          <div className="author__avatar">
            <div className="author__avatar--img">
              <img src="/users/siti.png" alt="users" />
            </div>
            <div className="author__avatar--text">
              <span>{props.author}</span>
            </div>
          </div>
          <div className="author__details">
            <span></span>
          </div>
        </div>
        <div className="main__card--title">
          <h4>{props.title}</h4>
          <span>{props.date}</span>
        </div>
      </motion.div>
    </Link>
  );
}

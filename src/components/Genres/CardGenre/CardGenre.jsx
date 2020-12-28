import React from 'react';
import './CardGenre.css';

export default function CardGenre(props) {
  return (
    <div className="card">
      <img src={`/genres/${props.name}.jpg`} alt="genres" />
      <a href="#fsad">{props.genre}</a>
    </div>
  );
}

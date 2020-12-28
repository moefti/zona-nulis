import React from 'react';
import CardGenre from './CardGenre/CardGenre';

import './Genres.css';

export default function Genres() {
  return (
    <div className="container">
      <CardGenre name="meet" genre="Social" />
      <CardGenre name="lampu" genre="Furniture" />
      <CardGenre name="lidah-buaya" genre="Nature" />
      <CardGenre name="sepatu" genre="Fashion" />
      <CardGenre name="success" genre="Technologies" />
      <CardGenre name="music" genre="Art" />
    </div>
  );
}

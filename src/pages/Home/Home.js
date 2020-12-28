import React from "react";
import Header from "../../components/Header/Header";
import Genres from "../../components/Genres/Genres";
import Main from "../../components/Main/Main";

export default function Home() {
  return (
    <div>
      <Header />
      <Genres />
      <Main />
    </div>
  );
}

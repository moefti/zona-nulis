import React from "react";

export default function Pagination({
  postPerPage,
  totalPosts,
  currentPage,
  navigatePage,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      {pageNumber.map((number) => (
        <span key={number}>
          <a
            href="/"
            onClick={(e) => navigatePage(e, number)}
            className={`pages ${number === currentPage ? "page-active" : ""}`}
          >
            {number}
          </a>
        </span>
      ))}
    </>
  );
}
